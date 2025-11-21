'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Apple, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Crear el enlace mailto con los datos del formulario
    const subject = encodeURIComponent(`Suscripción NutriPlan - ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    );
    const mailtoLink = `mailto:alejandrobon484@gmail.com?subject=${subject}&body=${body}`;

    // Abrir cliente de correo
    window.location.href = mailtoLink;

    // Simular éxito después de un momento
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Limpiar formulario
      setEmail('');
      setName('');
      setMessage('');
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-6 sm:py-8 md:py-16 px-4 sm:px-6 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-800 dark:text-slate-100 mb-4">
            <span className="font-semibold text-teal-600 dark:text-teal-400">Contacto</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nutrición? ¿Quieres recibir tips y recetas? ¡Escríbenos!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Información de Contacto */}
          <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 sm:mb-6">
              Información de Contacto
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">Email</h3>
                  <a 
                    href="mailto:alejandrobon484@gmail.com"
                    className="text-sm sm:text-base text-teal-600 dark:text-teal-400 hover:underline break-all"
                  >
                    alejandrobon484@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">Ubicación</h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    Barcelona, España
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Estamos aquí para ayudarte en tu viaje hacia una alimentación más saludable y equilibrada.
                </p>
              </div>
            </div>
          </div>

          {/* Formulario de Suscripción */}
          <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Suscríbete a NutriPlan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 sm:mb-6">
              Recibe recetas saludables, tips nutricionales y consejos personalizados directamente en tu email.
            </p>

            {success && (
              <div className="mb-4 p-4 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-teal-800 dark:text-teal-200">
                    ¡Tu cliente de correo se abrirá en un momento!
                  </p>
                  <p className="text-xs text-teal-600 dark:text-teal-300 mt-1">
                    Si no se abre automáticamente, envía un email a alejandrobon484@gmail.com
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 focus:outline-none transition-all text-sm sm:text-base"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 focus:outline-none transition-all text-sm sm:text-base"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Mensaje (opcional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 focus:outline-none transition-all text-sm sm:text-base resize-none"
                  placeholder="¿Tienes alguna pregunta o comentario?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-teal-600 dark:bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition-all duration-300 shadow-lg shadow-teal-200 dark:shadow-teal-900/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Suscribirme
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
              Al suscribirte, aceptas recibir emails de NutriPlan
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 dark:bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-all duration-300 shadow-lg shadow-teal-200 dark:shadow-teal-900/50 text-sm sm:text-base"
          >
            <Apple className="w-5 h-5" />
            Crear Mi Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
