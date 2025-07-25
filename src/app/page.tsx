import Link from 'next/link';
import { BookOpen, Users, Award, TrendingUp, Star, ArrowRight, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                EduTech Academy
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Características
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
                Testimonios
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                Acerca de
              </a>
            </nav>
            <Link
              href="/registro"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Comenzar Assessment
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Evalúa tus{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Habilidades
              </span>
              <br />
              en Desarrollo Web
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Descubre tu nivel actual en programación web y recibe recomendaciones personalizadas 
              de cursos para acelerar tu carrera como desarrollador.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/registro"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Comenzar Assessment Gratis
              </Link>
              <button className="inline-flex items-center px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg">
                <BookOpen className="h-5 w-5 mr-2" />
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-700">Preguntas Técnicas</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-700">Cursos Disponibles</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-700">Estudiantes Activos</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-700">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestro Assessment?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una evaluación completa y personalizada que te ayudará a identificar 
              exactamente dónde estás y hacia dónde ir en tu carrera.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Evaluación Precisa
              </h3>
              <p className="text-gray-600">
                Assessment diseñado por expertos que evalúa tus conocimientos reales 
                en HTML, CSS, JavaScript y conceptos fundamentales del desarrollo web.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Recomendaciones Personalizadas
              </h3>
              <p className="text-gray-600">
                Recibe un plan de estudio personalizado basado en tus resultados, 
                con cursos específicos para mejorar tus habilidades más débiles.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Reporte Detallado
              </h3>
              <p className="text-gray-600">
                Obtén un reporte completo con análisis de tu rendimiento, 
                áreas de mejora y próximos pasos para tu desarrollo profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un proceso simple de 4 pasos para evaluar tus habilidades y obtener 
              recomendaciones personalizadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Regístrate",
                description: "Crea tu perfil con información básica sobre tu experiencia",
                icon: Users
              },
              {
                step: "2", 
                title: "Evalúate",
                description: "Responde 10 preguntas técnicas sobre desarrollo web",
                icon: BookOpen
              },
              {
                step: "3",
                title: "Analiza",
                description: "Revisa tus resultados y áreas de fortaleza/mejora",
                icon: TrendingUp
              },
              {
                step: "4",
                title: "Aprende",
                description: "Sigue las recomendaciones de cursos personalizadas",
                icon: Award
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <item.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros estudiantes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Miles de desarrolladores han usado nuestro assessment para impulsar sus carreras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Frontend Developer",
                comment: "El assessment me ayudó a identificar exactamente qué habilidades necesitaba mejorar. Ahora trabajo en una startup tecnológica.",
                rating: 5
              },
              {
                name: "Carlos Rodríguez", 
                role: "Full Stack Developer",
                comment: "Las recomendaciones fueron precisas. Seguí el plan de estudios y en 6 meses conseguí mi primer trabajo como desarrollador.",
                rating: 5
              },
              {
                name: "Ana Martínez",
                role: "Junior Developer",
                comment: "Excelente plataforma para evaluar conocimientos. Los reportes son muy detallados y útiles para orientar el aprendizaje.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para evaluar tus habilidades?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comienza tu assessment gratuito ahora y descubre tu potencial como desarrollador web.
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Comenzar Assessment
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">EduTech Academy</span>
              </div>
              <p className="text-gray-400 mb-4">
                Plataforma líder en evaluación de habilidades de desarrollo web. 
                Ayudamos a desarrolladores a identificar sus fortalezas y áreas de mejora 
                para acelerar su crecimiento profesional.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm">📧</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm">🐦</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm">💼</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Assessment Gratuito</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cursos Premium</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog de Tecnología</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guías de Estudio</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EduTech Academy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
