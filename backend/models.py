from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import json

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    bookings = db.relationship('Booking', backref='user', lazy=True, cascade="all, delete")

    def __repr__(self):
        return f'<User {self.email}>'


class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String, nullable=True)
    price = db.Column(db.Integer, nullable=False)
    original_price = db.Column(db.Integer, nullable=True)
    guests = db.Column(db.Integer, nullable=False)
    amenities = db.Column(db.Text, nullable=True)  # JSON string
    type = db.Column(db.String(50), nullable=False)  # e.g., deluxe, suite, standard
    available = db.Column(db.Boolean, default=True)

    bookings = db.relationship('Booking', backref='room', lazy=True, cascade="all, delete")

    def amenities_list(self):
        return json.loads(self.amenities or "[]")

    def __repr__(self):
        return f'<Room {self.name}>'


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)
    
    check_in = db.Column(db.String(50), nullable=False)
    check_out = db.Column(db.String(50), nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    paid = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Booking user_id={self.user_id} room_id={self.room_id}>'    
