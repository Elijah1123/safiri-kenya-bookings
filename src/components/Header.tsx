
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Search } from 'lucide-react';

interface HeaderProps {
  onSignIn: () => void;
  isAuthenticated: boolean;
  onSignOut: () => void;
  userEmail?: string;
}

const Header = ({ onSignIn, isAuthenticated, onSignOut, userEmail }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-2 rounded-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-blue-800">LuxuryStay</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Welcome, {userEmail}</span>
                <Button onClick={onSignOut} variant="outline">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button onClick={onSignIn} className="bg-blue-800 hover:bg-blue-900">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
