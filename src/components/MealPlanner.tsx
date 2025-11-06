'use client'

import React, { useState } from 'react';
import { Leaf, Snowflake, Sun, CloudRain, User, Calendar, Target, Heart, Apple, Menu, X } from 'lucide-react';

interface Meal {
  desayuno: string;
  comida: string;
  cena: string;
}

interface WeekMeals {
  lunes: Meal;
  martes: Meal;
  miercoles: Meal;
  jueves: Meal;
  viernes: Meal;
  sabado: Meal;
  domingo: Meal;
}

interface SeasonalMeals {
  primavera: WeekMeals;
  verano: WeekMeals;
  otono: WeekMeals;
  invierno: WeekMeals;
}

interface Profile {
  edad: number;
  sexo: string;
  altura: number;
  peso: number;
  pesoObjetivo: number;
  calorias: number;
}

interface FormData {
  edad: string;
  sexo: string;
  altura: string;
  peso: string;
  pesoObjetivo: string;
}

const MealPlanner = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [season, setSeason] = useState<Season>('primavera');
  const [currentView, setCurrentView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    edad: '',
    sexo: '',
    altura: '',
    peso: '',
    pesoObjetivo: ''
  });

  const calculateCalories = (age: number, sex: string, height: number, weight: number, goalWeight: number): number => {
    let bmr: number;
    if (sex === 'hombre') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    if (goalWeight < weight) {
      return Math.round(bmr * 1.2 - 300);
    } else if (goalWeight > weight) {
      return Math.round(bmr * 1.2 + 300);
    }
    return Math.round(bmr * 1.2);
  };

  const seasonalMeals: SeasonalMeals = {
    primavera: {
      lunes: {
        desayuno: 'Yogur natural con fresas frescas, granola y miel',
        comida: 'Ensalada de esparragos con salmon a la plancha y quinoa',
        cena: 'Crema de guisantes con menta y tostadas integrales'
      },
      martes: {
        desayuno: 'Tostadas de aguacate con huevo pochado y tomate cherry',
        comida: 'Pollo al horno con judias verdes y patatas baby',
        cena: 'Revuelto de esparragos trigueros con champinones'
      },
      miercoles: {
        desayuno: 'Smoothie de espinacas, platano, kiwi y leche de almendras',
        comida: 'Pasta integral con pesto de albahaca y tomates cherry',
        cena: 'Lubina al vapor con alcachofas salteadas'
      },
      jueves: {
        desayuno: 'Porridge de avena con manzana rallada y canela',
        comida: 'Arroz integral con verduras de temporada al wok',
        cena: 'Tortilla de esparragos con ensalada verde'
      },
      viernes: {
        desayuno: 'Pan integral con queso fresco y rodajas de pepino',
        comida: 'Merluza con salsa verde y zanahorias baby',
        cena: 'Crema de calabacin con semillas de calabaza tostadas'
      },
      sabado: {
        desayuno: 'Batido de frutos rojos con yogur griego y chia',
        comida: 'Paella de verduras con alcachofas y guisantes',
        cena: 'Ensalada completa con atun, huevo y esparragos'
      },
      domingo: {
        desayuno: 'Gofres integrales con fresas y yogur natural',
        comida: 'Ternera guisada con guisantes y zanahorias',
        cena: 'Sopa de verduras con fideos integrales'
      }
    },
    verano: {
      lunes: {
        desayuno: 'Melon con jamon serrano y tostadas integrales',
        comida: 'Gazpacho andaluz con ensalada de tomate y burrata',
        cena: 'Brochetas de pollo con pimientos y calabacin a la parrilla'
      },
      martes: {
        desayuno: 'Sandia con queso feta y menta fresca',
        comida: 'Ensalada mediterranea con atun, aceitunas y pepino',
        cena: 'Calabacin relleno de quinoa y verduras al horno'
      },
      miercoles: {
        desayuno: 'Smoothie bowl de mango con coco rallado y granola',
        comida: 'Pulpo a la gallega con patatas y pimenton',
        cena: 'Ensalada de tomate rosa con mozzarella y albahaca'
      },
      jueves: {
        desayuno: 'Yogur con melocoton fresco y frutos secos',
        comida: 'Dorada al horno con berenjenas y tomates',
        cena: 'Salmorejo cordobes con huevo duro y jamon'
      },
      viernes: {
        desayuno: 'Tostadas con tomate rallado, aceite de oliva y aguacate',
        comida: 'Fideua de verduras y gambas',
        cena: 'Pisto manchego con huevo pochado'
      },
      sabado: {
        desayuno: 'Batido de frutas tropicales con semillas de lino',
        comida: 'Lubina a la sal con ensalada de pepino y menta',
        cena: 'Crema fria de pepino con yogur griego'
      },
      domingo: {
        desayuno: 'Pan integral con hummus y verduras crudas',
        comida: 'Arroz negro con calamares y alioli',
        cena: 'Ensalada caprese con rucula y pinones tostados'
      }
    },
    otono: {
      lunes: {
        desayuno: 'Porridge de avena con manzana asada y nueces',
        comida: 'Crema de calabaza con jengibre y semillas de girasol',
        cena: 'Pollo asado con setas y castanas'
      },
      martes: {
        desayuno: 'Tostadas de pan integral con mermelada de higo y queso',
        comida: 'Lentejas estofadas con verduras y chorizo',
        cena: 'Berenjena gratinada con queso y tomate'
      },
      miercoles: {
        desayuno: 'Yogur con granada, nueces y miel de castano',
        comida: 'Risotto de setas con parmesano',
        cena: 'Crema de boniato con canela y pipas de calabaza'
      },
      jueves: {
        desayuno: 'Smoothie de pera, espinacas y jengibre',
        comida: 'Bacalao con pisto de berenjenas y pimientos',
        cena: 'Sopa de cebolla gratinada'
      },
      viernes: {
        desayuno: 'Pan con aguacate, granada y semillas',
        comida: 'Codornices guisadas con uvas y patatas',
        cena: 'Ensalada templada de espinacas con pasas y pinones'
      },
      sabado: {
        desayuno: 'Gachas de avena con higos secos y almendras',
        comida: 'Arroz con setas, alcachofas y trufa',
        cena: 'Crema de calabacin y puerro con crutones'
      },
      domingo: {
        desayuno: 'Tortitas de manzana con sirope de arce',
        comida: 'Cordero al horno con batata y romero',
        cena: 'Ensalada de col lombarda, manzana y nueces'
      }
    },
    invierno: {
      lunes: {
        desayuno: 'Porridge de avena con platano y cacao',
        comida: 'Cocido madrileno completo',
        cena: 'Crema de coliflor con queso azul y nueces'
      },
      martes: {
        desayuno: 'Tostadas con mantequilla de cacahuete y rodajas de platano',
        comida: 'Fabada asturiana con compango',
        cena: 'Brocoli gratinado con bechamel ligera'
      },
      miercoles: {
        desayuno: 'Batido caliente de chocolate con leche de avena',
        comida: 'Potaje de garbanzos con espinacas y bacalao',
        cena: 'Sopa de fideos con pollo desmenuzado'
      },
      jueves: {
        desayuno: 'Pan integral con queso y membrillo',
        comida: 'Estofado de ternera con zanahorias y guisantes',
        cena: 'Pure de calabaza y patata con huevo duro'
      },
      viernes: {
        desayuno: 'Yogur griego con frutos secos y miel',
        comida: 'Alubias blancas con chorizo y morcilla',
        cena: 'Crema de puerros con costrones de pan'
      },
      sabado: {
        desayuno: 'Gofres con compota de manzana y canela',
        comida: 'Cordero guisado con patatas y romero',
        cena: 'Ensalada templada de escarola con anchoas'
      },
      domingo: {
        desayuno: 'Porridge con pera cocida y jengibre',
        comida: 'Arroz caldoso con costillas y verduras',
        cena: 'Sopa de cebolla con picatostes integrales'
      }
    }
  };

type Season = 'primavera' | 'verano' | 'otono' | 'invierno';

  const seasonIcons: Record<Season, React.ReactElement> = {
    primavera: <Leaf className="w-8 h-8" />,
    verano: <Sun className="w-8 h-8" />,
    otono: <CloudRain className="w-8 h-8" />,
    invierno: <Snowflake className="w-8 h-8" />
  };

  const seasonColors: Record<Season, string> = {
    primavera: 'bg-emerald-50 border-emerald-300 text-emerald-800',
    verano: 'bg-amber-50 border-amber-300 text-amber-800',
    otono: 'bg-orange-50 border-orange-300 text-orange-800',
    invierno: 'bg-sky-50 border-sky-300 text-sky-800'
  };

  const seasonActiveColors: Record<Season, string> = {
    primavera: 'bg-emerald-500 border-emerald-500 text-white',
    verano: 'bg-amber-500 border-amber-500 text-white',
    otono: 'bg-orange-500 border-orange-500 text-white',
    invierno: 'bg-sky-500 border-sky-500 text-white'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.edad || !formData.sexo || !formData.altura || !formData.peso || !formData.pesoObjetivo) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const edad = parseInt(formData.edad);
    const altura = parseInt(formData.altura);
    const peso = parseFloat(formData.peso);
    const pesoObjetivo = parseFloat(formData.pesoObjetivo);
    const calorias = calculateCalories(edad, formData.sexo, altura, peso, pesoObjetivo);
    
    const data: Profile = {
      edad,
      sexo: formData.sexo,
      altura,
      peso,
      pesoObjetivo,
      calorias
    };
    
    setProfile(data);
    setCurrentView('plan');
  };

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

type Day = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

  const dias: Day[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  const NavigationBar = () => (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-emerald-100 p-1.5 sm:p-2 rounded-lg">
              <Apple className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-600" />
            </div>
            <span className="text-xl sm:text-2xl font-light text-slate-800">
              Nutri<span className="font-semibold text-emerald-600">Plan</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentView('about')}
              className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                currentView === 'about' 
                  ? 'text-emerald-600' 
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              Sobre Nosotros
            </button>
            <button
              onClick={() => profile ? setCurrentView('plan') : setCurrentView('home')}
              className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                profile 
                  ? 'bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              Mi Plan
            </button>
            <button
              onClick={() => setCurrentView('contact')}
              className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                currentView === 'contact' 
                  ? 'text-emerald-600' 
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-2">
            <button
              onClick={() => handleNavClick('about')}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${
                currentView === 'about'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Sobre Nosotros
            </button>
            <button
              onClick={() => profile ? handleNavClick('plan') : handleNavClick('home')}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${
                profile
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : currentView === 'plan'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Mi Plan
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${
                currentView === 'contact'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Contacto
            </button>
          </div>
        )}
      </div>
    </nav>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 py-8 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-light text-slate-800 mb-4">
            Sobre <span className="font-semibold text-emerald-600">Nosotros</span>
          </h1>
        </div>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-12">
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            En NutriPlan creemos que una alimentacion saludable debe estar en armonia con las estaciones del ano. 
            Nuestro enfoque se basa en aprovechar los alimentos de temporada para crear planes nutricionales 
            personalizados que se adaptan a tus objetivos.
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            Cada estacion nos ofrece productos frescos y nutritivos que no solo benefician tu salud, sino tambien 
            el medio ambiente. Con nuestros planes personalizados, obtendras recetas variadas y equilibradas 
            disenadas especificamente para ti.
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Nuestro sistema calcula tus necesidades caloricas basandose en tu perfil y objetivos, asegurando 
            que cada comida te acerque a tu meta de forma saludable y sostenible.
          </p>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 py-8 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-light text-slate-800 mb-4">
            <span className="font-semibold text-emerald-600">Contacto</span>
          </h1>
        </div>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-12">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">Email</h3>
              <p className="text-base sm:text-lg text-slate-600">info@nutriplan.com</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">Horario</h3>
              <p className="text-base sm:text-lg text-slate-600">Lunes a Viernes: 9:00 - 18:00</p>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Tienes alguna pregunta sobre nuestros planes nutricionales? No dudes en contactarnos. 
                Estaremos encantados de ayudarte a comenzar tu viaje hacia una alimentacion mas saludable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-slate-100 text-slate-700 mt-8 sm:mt-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-light text-slate-800">
                Nutri<span className="font-semibold text-emerald-600">Plan</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tu plan nutricional personalizado basado en las estaciones del ano.
            </p>
          </div>

          <div>
            <h3 className="text-slate-800 font-semibold mb-4 uppercase tracking-wide text-sm">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavClick('home')} className="text-sm hover:text-emerald-600 transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="text-sm hover:text-emerald-600 transition-colors">
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="text-sm hover:text-emerald-600 transition-colors">
                  Contacto
                </button>
              </li>
              <li>
                <button 
                  onClick={() => profile ? handleNavClick('plan') : handleNavClick('home')} 
                  className="text-sm hover:text-emerald-600 transition-colors"
                >
                  Mi Plan
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 font-semibold mb-4 uppercase tracking-wide text-sm">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-emerald-600 transition-colors">
                  Politica de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-emerald-600 transition-colors">
                  Terminos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-emerald-600 transition-colors">
                  Politica de Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-emerald-600 transition-colors">
                  Aviso Legal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 font-semibold mb-4 uppercase tracking-wide text-sm">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1 font-medium">Email:</span>
                <span>info@nutriplan.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1 font-medium">Lugar:</span>
                <span>Barcelona, Espana</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-300 pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-slate-600 text-center">
            2024 NutriPlan. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );

  if (!profile) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavigationBar />
        {currentView === 'home' && (
          <div className="flex-grow min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 py-8 sm:py-16 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 sm:mb-16">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="bg-emerald-100 p-3 sm:p-4 rounded-full">
                    <Apple className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600" />
                  </div>
                </div>
                <h1 className="text-3xl sm:text-5xl font-light text-slate-800 mb-3 sm:mb-4 px-4">
                  Plan Nutricional <span className="font-semibold text-emerald-600">Personalizado</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
                  Descubre tu plan de alimentacion ideal adaptado a tus objetivos y a las estaciones del ano
                </p>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-12 max-w-3xl mx-auto">
                <div className="flex items-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-100">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mr-3 sm:mr-4 flex-shrink-0" />
                  <h2 className="text-2xl sm:text-3xl font-light text-slate-800">Tu Perfil</h2>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 uppercase tracking-wide">Edad</label>
                      <input
                        type="number"
                        value={formData.edad}
                        onChange={(e) => handleInputChange('edad', e.target.value)}
                        min="15"
                        max="100"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all text-base sm:text-lg"
                        placeholder="30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 uppercase tracking-wide">Sexo</label>
                      <select
                        value={formData.sexo}
                        onChange={(e) => handleInputChange('sexo', e.target.value)}
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all text-base sm:text-lg"
                      >
                        <option value="">Seleccionar</option>
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 uppercase tracking-wide">Altura (cm)</label>
                      <input
                        type="number"
                        value={formData.altura}
                        onChange={(e) => handleInputChange('altura', e.target.value)}
                        min="120"
                        max="250"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all text-base sm:text-lg"
                        placeholder="170"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 uppercase tracking-wide">Peso Actual (kg)</label>
                      <input
                        type="number"
                        value={formData.peso}
                        onChange={(e) => handleInputChange('peso', e.target.value)}
                        min="30"
                        max="300"
                        step="0.1"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all text-base sm:text-lg"
                        placeholder="75.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 uppercase tracking-wide">Peso Objetivo (kg)</label>
                    <input
                      type="number"
                      value={formData.pesoObjetivo}
                      onChange={(e) => handleInputChange('pesoObjetivo', e.target.value)}
                      min="30"
                      max="300"
                      step="0.1"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all text-base sm:text-lg"
                      placeholder="70"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-emerald-600 text-white font-medium py-4 sm:py-5 rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-200 text-base sm:text-lg mt-4"
                  >
                    Crear Mi Plan Personalizado
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationBar />
      <div className="flex-grow min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 py-6 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-8 mb-6 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              <div>
                <h1 className="text-2xl sm:text-4xl font-light text-slate-800 mb-2 sm:mb-3">
                  Tu Plan <span className="font-semibold text-emerald-600">Nutricional</span>
                </h1>
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    <span className="text-base sm:text-lg">
                      <span className="font-semibold text-emerald-600">{profile.calorias}</span> kcal/dia
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    <span className="text-base sm:text-lg">
                      {profile.peso} kg - <span className="font-semibold text-emerald-600">{profile.pesoObjetivo} kg</span>
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setProfile(null)}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-medium transition-colors text-sm sm:text-base"
              >
                Modificar Perfil
              </button>
            </div>
          </div>

          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light text-slate-800 text-center mb-6 sm:mb-8">
              Selecciona tu <span className="font-semibold text-emerald-600">Estacion</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {(['primavera', 'verano', 'otono', 'invierno'] as Season[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`p-4 sm:p-8 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                    season === s
                      ? seasonActiveColors[s] + ' shadow-lg'
                      : seasonColors[s] + ' hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="[&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8">
                      {seasonIcons[s]}
                    </div>
                    <span className="font-medium capitalize text-sm sm:text-lg">{s}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {dias.map((dia) => (
              <div key={dia} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 sm:px-8 py-3 sm:py-5 border-b border-slate-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    <h3 className="text-xl sm:text-2xl font-light text-slate-800 capitalize">
                      <span className="font-semibold">{dia.charAt(0).toUpperCase() + dia.slice(1)}</span>
                    </h3>
                  </div>
                </div>
                
                <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <h4 className="font-semibold text-slate-700 uppercase tracking-wide text-xs sm:text-sm">Desayuno</h4>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{seasonalMeals[season][dia].desayuno}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <h4 className="font-semibold text-slate-700 uppercase tracking-wide text-xs sm:text-sm">Comida</h4>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{seasonalMeals[season][dia].comida}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <h4 className="font-semibold text-slate-700 uppercase tracking-wide text-xs sm:text-sm">Cena</h4>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{seasonalMeals[season][dia].cena}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MealPlanner;