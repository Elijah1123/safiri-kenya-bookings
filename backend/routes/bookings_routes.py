from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db, Room, Booking
from utils.mpesa import lipa_na_mpesa

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    return jsonify([{ 'id': r.id, 'name': r.name, 'available': r.available } for r in rooms])

@booking_bp.route('/bookings', methods=['POST'])
@login_required
def book_room():
    data = request.get_json()
    print(data)
    guests = data.get('guests')
    room_id = data.get('room_id')
    phone = data.get('phone')
    amount = data.get('amount')
    check_out = '30/6/2025'
    check_in = '5/7/2025'
    

    room = Room.query.get(int(room_id))
    if not room or not room.available:
        return jsonify({'error': 'Room is not available'}), 400

    room.available = False
    booking = Booking(user_id=current_user.id, room_id=room.id, check_in=check_in, check_out=check_out, guests=guests )
    db.session.add(booking)
    db.session.commit()

    # mpesa_response = lipa_na_mpesa(phone, amount)

    return jsonify({
        'message': 'Room booked successfully.',
        'booking_id': booking.id,
        'room_id': room.id,
        # 'mpesa_response': mpesa_response
    }), 200

