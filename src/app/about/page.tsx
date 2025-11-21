import Link from 'next/link';
import { Apple } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-6 sm:py-8 md:py-16 px-4 sm:px-6 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-800 dark:text-slate-100 mb-4">
            Sobre <span className="font-semibold text-teal-600 dark:text-teal-400">Nosotros</span>
          </h1>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sm:p-8 md:p-12 mb-8">
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
            En NutriPlan creemos que una alimentación saludable debe estar en armonía con las estaciones del año. 
            Nuestro enfoque se basa en aprovechar los alimentos de temporada para crear planes nutricionales 
            personalizados que se adaptan a tus objetivos.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
            Cada estación nos ofrece productos frescos y nutritivos que no solo benefician tu salud, sino también 
            el medio ambiente. Con nuestros planes personalizados, obtendrás recetas variadas y equilibradas 
            diseñadas específicamente para ti.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Nuestro sistema calcula tus necesidades calóricas basándose en tu perfil y objetivos, asegurando 
            que cada comida te acerque a tu meta de forma saludable y sostenible.
          </p>
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
