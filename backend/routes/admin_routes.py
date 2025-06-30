from flask import Blueprint, jsonify
from flask_login import login_required
from models import User, Booking, Room
from models import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/dashboard', methods=['GET'])
@login_required
def dashboard():
    users = User.query.all()
    bookings = Booking.query.all()
    rooms = Room.query.all()

    user_data = [{'id': u.id, 'email': u.email} for u in users]
    booking_data = [
        {
            'user': b.user.email,
            'room_id': b.room_id,
            'paid': b.paid
        } for b in bookings
    ]
    room_data = [{'id': r.id, 'name': r.name, 'available': r.available} for r in rooms]

    return jsonify({
        'users': user_data,
        'bookings': booking_data,
        'rooms': room_data
    })
