import Link from 'next/link';
import { Mail, Clock, MapPin, Phone, Apple } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-6 sm:py-8 md:py-16 px-4 sm:px-6 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-800 dark:text-slate-100 mb-4">
            <span className="font-semibold text-teal-600 dark:text-teal-400">Contacto</span>
          </h1>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sm:p-8 md:p-12 mb-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Email</h3>
                <a 
                  href="mailto:info@nutriplan.com"
                  className="text-sm sm:text-base md:text-lg text-teal-600 dark:text-teal-400 hover:underline"
                >
                  info@nutriplan.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Horario</h3>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300">
                  Lunes a Viernes: 9:00 - 18:00
                </p>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
                  Sábados y Domingos: Cerrado
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Ubicación</h3>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300">
                  Barcelona, España
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Teléfono</h3>
                <a 
                  href="tel:+34900000000"
                  className="text-sm sm:text-base md:text-lg text-teal-600 dark:text-teal-400 hover:underline"
                >
                  +34 900 000 000
                </a>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-700">
              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                ¿Tienes alguna pregunta sobre nuestros planes nutricionales? No dudes en contactarnos. 
                Estaremos encantados de ayudarte a comenzar tu viaje hacia una alimentación más saludable.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 dark:bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-all duration-300 shadow-lg shadow-teal-200 dark:shadow-teal-900/50"
          >
            <Apple className="w-5 h-5" />
            Crear Mi Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
