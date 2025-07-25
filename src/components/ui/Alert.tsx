import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert: React.FC<AlertProps> = ({ 
  variant = 'info', 
  title, 
  children, 
  className,
  dismissible = false,
  onDismiss
}) => {
  const variants = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: XCircle,
      iconColor: 'text-red-600'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600'
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: Info,
      iconColor: 'text-blue-600'
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'relative border rounded-lg p-4',
        config.container,
        className
      )}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn('h-5 w-5', config.iconColor)} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>
        {dismissible && onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  variant === 'success' && 'text-green-500 hover:bg-green-100 focus:ring-green-600',
                  variant === 'error' && 'text-red-500 hover:bg-red-100 focus:ring-red-600',
                  variant === 'warning' && 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600',
                  variant === 'info' && 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600'
                )}
                onClick={onDismiss}
                aria-label="Cerrar alerta"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componentes de conveniencia
const SuccessAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert variant="success" {...props} />
);

const ErrorAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert variant="error" {...props} />
);

const WarningAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert variant="warning" {...props} />
);

const InfoAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert variant="info" {...props} />
);

export { Alert, SuccessAlert, ErrorAlert, WarningAlert, InfoAlert };
export type { AlertProps };
