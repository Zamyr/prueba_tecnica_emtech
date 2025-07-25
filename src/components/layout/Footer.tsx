import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-gray-900 text-white py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">EduTech Academy</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Plataforma líder en evaluación de habilidades de desarrollo web. 
              Ayudamos a desarrolladores a identificar sus fortalezas y áreas de mejora 
              para acelerar su crecimiento profesional.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:info@edutech-academy.com" 
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Enviar email"
              >
                <span className="text-sm">📧</span>
              </a>
              <a 
                href="https://twitter.com/edutech-academy" 
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Seguir en Twitter"
              >
                <span className="text-sm">🐦</span>
              </a>
              <a 
                href="https://linkedin.com/company/edutech-academy" 
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Conectar en LinkedIn"
              >
                <span className="text-sm">💼</span>
              </a>
            </div>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link 
                  href="/registro" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Assessment Gratuito
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Cursos Premium
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Blog de Tecnología
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Guías de Estudio
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a 
                  href="mailto:soporte@edutech-academy.com" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Términos de Uso
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} EduTech Academy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
export type { FooterProps };
