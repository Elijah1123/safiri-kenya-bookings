from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db, Room, Booking
from utils.mpesa import lipa_na_mpesa

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    return jsonify([{ 'id': r.id, 'name': r.name, 'available': r.available } for r in rooms])

@booking_bp.route('/book', methods=['POST'])
@login_required
def book_room():
    data = request.json
    room_id = data.get('room_id')
    phone = data.get('phone')
    amount = data.get('amount')

    room = Room.query.get(room_id)
    if not room or not room.available:
        return jsonify({'error': 'Room is not available'}), 400

    room.available = False
    booking = Booking(user_id=current_user.id, room_id=room.id)
    db.session.add(booking)
    db.session.commit()

    mpesa_response = lipa_na_mpesa(phone, amount)

    return jsonify({
        'message': 'Room booked successfully.',
        'booking_id': booking.id,
        'room_id': room.id,
        'mpesa_response': mpesa_response
    }), 200

