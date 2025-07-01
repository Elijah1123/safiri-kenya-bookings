import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    id: string;
    name: string;
    price: number;
    image: string;
    guests: number;
  } | null;
  checkIn: string;
  checkOut: string;
  guests: string;
  onConfirmBooking: (paymentMethod: string) => void;
}

const BookingModal = ({
  isOpen,
  onClose,
  room,
  checkIn,
  checkOut,
  guests,
  onConfirmBooking
}: BookingModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!room) return null;

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const nights = calculateNights();
  const subtotal = room.price * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('254')) return digits;
    if (digits.startsWith('0') && digits.length === 10) return '254' + digits.substring(1);
    if (digits.startsWith('7') && digits.length === 9) return '254' + digits;
    return digits;
  };

  const validatePhoneNumber = (phone: string) => {
    const kenyanMobileRegex = /^254[17]\d{8}$/;
    return kenyanMobileRegex.test(phone);
  };

  const handleBooking = async () => {
    if (paymentMethod === 'mpesa') {
      if (!phoneNumber) {
        toast.error('Please enter your M-Pesa phone number');
        return;
      }
      const formattedPhone = formatPhoneNumber(phoneNumber);
      if (!validatePhoneNumber(formattedPhone)) {
        toast.error('Invalid phone number format. Use 0712345678 or 254712345678');
        return;
      }
    }

    setIsProcessing(true);
    try {
      const response = await fetch('https://safiri-kenya-bookings-1.onrender.com/api/bookings', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: room.id,
          phone: formatPhoneNumber(phoneNumber),
          amount: total,
          check_in: checkIn,
          check_out: checkOut,
          guests: guests
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Booking failed. Please try again.');
        setIsProcessing(false);
        return;
      }

      toast.success('🎉 Booking confirmed!');
      onConfirmBooking(paymentMethod);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while booking.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-800">
            Complete Your Booking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Room Info */}
          <div className="flex space-x-4">
            <img
              src={room.image}
              alt={room.name}
              className="w-20 h-20 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{room.name}</h3>
              <div className="flex items-center mt-1 text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">Up to {room.guests} guests</span>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm">Check-in</span>
              </div>
              <span className="font-medium">{checkIn || 'Not selected'}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm">Check-out</span>
              </div>
              <span className="font-medium">{checkOut || 'Not selected'}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm">Guests</span>
              </div>
              <span className="font-medium">{guests} guest(s)</span>
            </div>
          </div>

          {/* Price Details */}
          <div className="space-y-3">
            <h4 className="font-semibold">Price Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>KSH {room.price.toLocaleString()} × {nights} night(s)</span>
                <span>KSH {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>KSH {serviceFee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-blue-800">KSH {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-4">
            <h4 className="font-semibold">Payment Method</h4>

            <div className="space-y-3">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('mpesa')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MP</span>
                    </div>
                    <div>
                      <span className="font-medium">M-Pesa</span>
                      <p className="text-xs text-gray-600">Pay with your mobile money</p>
                    </div>
                  </div>
                  <Badge variant={paymentMethod === 'mpesa' ? 'default' : 'secondary'}>
                    Recommended
                  </Badge>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                  <div>
                    <span className="font-medium">Credit/Debit Card</span>
                    <p className="text-xs text-gray-600">Visa, Mastercard accepted</p>
                  </div>
                </div>
              </div>
            </div>

            {paymentMethod === 'mpesa' && (
              <div>
                <Label htmlFor="phone">M-Pesa Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0712345678 or 254712345678"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your Safaricom number to receive payment prompt
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              disabled={
                isProcessing ||
                (paymentMethod === 'mpesa' && phoneNumber.trim() === '')
              }
            >
              {isProcessing ? 'Processing...' : `Pay KSH ${total.toLocaleString()}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
