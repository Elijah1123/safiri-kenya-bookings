from app import create_app  # Import the app factory
from models import db, User, Room, Booking
from werkzeug.security import generate_password_hash

# Initialize the Flask app using the factory
app = create_app()

def seed_data():
    with app.app_context():
        # Drop and recreate all tables (be cautious in production!)
        db.drop_all()
        db.create_all()

        # Create sample users
        user1 = User(email="john@example.com", password=generate_password_hash("password123"))
        user2 = User(email="jane@example.com", password=generate_password_hash("securepass"))

        db.session.add_all([user1, user2])
        db.session.commit()

        # Create sample rooms with all required fields
        rooms = [
            Room(
                name="Deluxe Ocean View Suite",
                image="ocean_view.jpg",
                price=150.00,
                original_price=200.00,
                guests=2,
                amenities="Wi-Fi, TV, Breakfast",
                type="Suite",
                available=True
            ),
            Room(
                name="Standard City Room",
                image="city_room.jpg",
                price=80.00,
                original_price=100.00,
                guests=2,
                amenities="Wi-Fi, Air Conditioning",
                type="Standard",
                available=True
            ),
            Room(
                name="Presidential Suite",
                image="presidential.jpg",
                price=500.00,
                original_price=650.00,
                guests=4,
                amenities="Private Pool, Wi-Fi, Jacuzzi",
                type="Luxury",
                available=True
            ),
            Room(
                name="Family Suite",
                image="family_suite.jpg",
                price=180.00,
                original_price=220.00,
                guests=4,
                amenities="Wi-Fi, Kitchenette",
                type="Family",
                available=False
            ),
            Room(
                name="Business Deluxe",
                image="business.jpg",
                price=120.00,
                original_price=140.00,
                guests=1,
                amenities="Wi-Fi, Desk, Coffee Maker",
                type="Business",
                available=True
            ),
            Room(
                name="Honeymoon Suite",
                image="honeymoon.jpg",
                price=300.00,
                original_price=350.00,
                guests=2,
                amenities="Hot Tub, Wine, Roses",
                type="Romantic",
                available=True
            )
        ]

        db.session.add_all(rooms)
        db.session.commit()

        # Create sample bookings
        booking1 = Booking(user_id=user1.id, room_id=rooms[0].id, paid=True, check_in=30/6/2025, check_out=5/7/2025, guests=2)
        booking2 = Booking(user_id=user2.id, room_id=rooms[3].id, paid=False, check_in=30/6/2025, check_out=5/7/2025, guests=2)

        db.session.add_all([booking1, booking2])
        db.session.commit()

        print("✅ Database seeded successfully!")

if __name__ == "__main__":
    seed_data()
