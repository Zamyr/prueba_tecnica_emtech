import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  showNavigation?: boolean;
  currentUser?: {
    name: string;
    email: string;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ 
  className, 
  showNavigation = true, 
  currentUser 
}) => {
  return (
    <header className={cn('bg-white shadow-sm border-b', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              EduTech Academy
            </span>
          </Link>

          {/* Navigation */}
          {showNavigation && (
            <nav className="hidden md:flex space-x-8" role="navigation">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              >
                Características
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              >
                Testimonios
              </a>
              <a 
                href="#about" 
                className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              >
                Acerca de
              </a>
            </nav>
          )}

          {/* User Info / CTA */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="text-sm text-gray-600">
                Hola, <span className="font-medium">{currentUser.name}</span>
              </div>
            ) : (
              <Link
                href="/registro"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Comenzar assessment de habilidades"
              >
                Comenzar Assessment
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
export type { HeaderProps };
