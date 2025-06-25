
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, Calendar, Users } from 'lucide-react';

interface SearchFiltersProps {
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onGuestsChange: (guests: string) => void;
  onRoomTypeChange: (type: string) => void;
  onSearch: () => void;
}

const SearchFilters = ({
  checkIn,
  checkOut,
  guests,
  roomType,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onRoomTypeChange,
  onSearch
}: SearchFiltersProps) => {
  return (
    <Card className="p-6 bg-white shadow-xl border-0 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div>
          <Label htmlFor="checkin" className="text-sm font-medium text-gray-700">Check-in</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => onCheckInChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="checkout" className="text-sm font-medium text-gray-700">Check-out</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => onCheckOutChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="guests" className="text-sm font-medium text-gray-700">Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Select value={guests} onValueChange={onGuestsChange}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="roomtype" className="text-sm font-medium text-gray-700">Room Type</Label>
          <Select value={roomType} onValueChange={onRoomTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Any Room" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rooms</SelectItem>
              <SelectItem value="standard">Standard Room</SelectItem>
              <SelectItem value="deluxe">Deluxe Room</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="presidential">Presidential Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={onSearch} 
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </Card>
  );
};

export default SearchFilters;
