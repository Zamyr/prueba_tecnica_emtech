import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

interface LoadingDotsProps {
  className?: string;
}

interface LoadingPageProps {
  title?: string;
  description?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Cargando..."
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

const LoadingDots: React.FC<LoadingDotsProps> = ({ className }) => {
  return (
    <div className={cn('flex space-x-1', className)} role="status" aria-label="Cargando...">
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

const LoadingPage: React.FC<LoadingPageProps> = ({ 
  title = 'Cargando...', 
  description = 'Por favor espera mientras procesamos tu solicitud' 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 max-w-md">{description}</p>
      </div>
    </div>
  );
};

const LoadingButton: React.FC<{ loading: boolean; children: React.ReactNode; className?: string }> = ({ 
  loading, 
  children, 
  className 
}) => {
  return (
    <div className={cn('flex items-center', className)}>
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </div>
  );
};

export { LoadingSpinner, LoadingDots, LoadingPage, LoadingButton };
export type { LoadingSpinnerProps, LoadingDotsProps, LoadingPageProps };
