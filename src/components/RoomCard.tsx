
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';

interface RoomCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  guests: number;
  amenities: string[];
  available: boolean;
  onBook: (roomId: string) => void;
}

const RoomCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  guests,
  amenities,
  available,
  onBook
}: RoomCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        {!available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive" className="text-white">Not Available</Badge>
          </div>
        )}
        {originalPrice && originalPrice > price && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            Save KSH {(originalPrice - price).toLocaleString()}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <div className="flex items-center mt-2 text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm">Up to {guests} guests</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{amenities.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-blue-800">
                KSH {price.toLocaleString()}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">
                  KSH {originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-sm text-gray-600">/night</span>
            </div>
            
            <Button
              onClick={() => onBook(id)}
              disabled={!available}
              className="bg-gradient-to-r from-blue-800 to-blue-700 hover:from-blue-900 hover:to-blue-800"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
