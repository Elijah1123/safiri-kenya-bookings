import React, { useState } from 'react';
import { toast } from 'sonner';
import { Calendar, Users, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import SearchFilters from '@/components/SearchFilters';
import RoomCard from '@/components/RoomCard';
import BookingModal from '@/components/BookingModal';

const Index = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Search state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomType, setRoomType] = useState('all');

  // Booking state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // Sample room data with proper images
  const rooms = [
    {
      id: '1',
      name: 'Deluxe Ocean View Suite',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: 15000,
      originalPrice: 18000,
      guests: 2,
      amenities: ['Ocean View', 'King Bed', 'WiFi', 'Mini Bar', 'Balcony'],
      available: true,
      type: 'deluxe'
    },
    {
      id: '2',
      name: 'Standard City Room',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      price: 8500,
      guests: 2,
      amenities: ['City View', 'Queen Bed', 'WiFi', 'Air Conditioning'],
      available: true,
      type: 'standard'
    },
    {
      id: '3',
      name: 'Presidential Suite',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: 35000,
      originalPrice: 40000,
      guests: 4,
      amenities: ['Panoramic View', 'Living Area', 'Jacuzzi', 'Butler Service', 'Private Terrace'],
      available: true,
      type: 'presidential'
    },
    {
      id: '4',
      name: 'Family Suite',
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: 22000,
      guests: 4,
      amenities: ['Two Bedrooms', 'Living Area', 'Kitchenette', 'WiFi', 'Kids Area'],
      available: false,
      type: 'suite'
    },
    {
      id: '5',
      name: 'Business Deluxe',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80',
      price: 12000,
      guests: 2,
      amenities: ['Desk Area', 'High-Speed WiFi', 'Meeting Room Access', 'Coffee Machine'],
      available: true,
      type: 'deluxe'
    },
    {
      id: '6',
      name: 'Honeymoon Suite',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: 28000,
      guests: 2,
      amenities: ['Romantic Setup', 'Jacuzzi', 'Champagne', 'Rose Petals', 'Private Dining'],
      available: true,
      type: 'suite'
    }
  ];

  const handleAuthenticate = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    toast.success('Successfully signed in!');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    toast.success('Successfully signed out!');
  };

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    
    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    toast.success('Searching for available rooms...');
  };

  const handleBookRoom = (roomId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      toast.error('Please sign in to book a room');
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates first');
      return;
    }

    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setSelectedRoom(room);
      setShowBookingModal(true);
    }
  };

  const handleConfirmBooking = (paymentMethod: string) => {
    if (paymentMethod === 'mpesa') {
      // Simulate M-Pesa payment process
      toast.loading('Initiating M-Pesa payment...', { id: 'mpesa-payment' });
      
      setTimeout(() => {
        toast.success('M-Pesa payment request sent to your phone! Please complete the transaction.', { 
          id: 'mpesa-payment',
          duration: 5000 
        });
        
        // Simulate payment completion after a few seconds
        setTimeout(() => {
          toast.success('Payment confirmed! Your booking is complete.', { duration: 5000 });
          setShowBookingModal(false);
          setSelectedRoom(null);
        }, 3000);
      }, 2000);
    } else {
      toast.success(`Booking confirmed! Payment via ${paymentMethod} initiated.`);
      setShowBookingModal(false);
      setSelectedRoom(null);
    }
  };

  const filteredRooms = rooms.filter(room => {
    if (roomType !== 'all' && room.type !== roomType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSignIn={() => setShowAuthModal(true)}
        isAuthenticated={isAuthenticated}
        onSignOut={handleSignOut}
        userEmail={userEmail}
      />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">
            Discover Your Perfect Stay
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Experience luxury and comfort in the heart of Kenya. Book your dream room today.
          </p>
        </div>
        
        {/* Search Filters */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 z-20">
          <SearchFilters
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            roomType={roomType}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
            onGuestsChange={setGuests}
            onRoomTypeChange={setRoomType}
            onSearch={handleSearch}
          />
        </div>
      </section>

      {/* Rooms Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Luxury Rooms
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated selection of rooms, each designed to provide
            the ultimate comfort and luxury experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name}
              image={room.image}
              price={room.price}
              originalPrice={room.originalPrice}
              guests={room.guests}
              amenities={room.amenities}
              available={room.available}
              onBook={handleBookRoom}
            />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No rooms match your search criteria. Please try different filters.
            </p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose LuxuryStay?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and secure booking process with instant confirmation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-green-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2">M-Pesa Payment</h3>
              <p className="text-gray-600">
                Pay conveniently with M-Pesa or international cards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticate={handleAuthenticate}
      />

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        room={selectedRoom}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default Index;
