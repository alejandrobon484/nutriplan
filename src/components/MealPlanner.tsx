'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Snowflake, Sun, CloudRain, User, Calendar, Target, Heart, Apple, Menu, X, Moon, Home as HomeIcon, Info, Phone, ShoppingCart } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useShoppingList } from '../hooks/useShoppingList';
import ShoppingList from './ShoppingList';

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
  otoño: WeekMeals;
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

// Componente de Gráfico Circular de Calorías (Mobile Optimized)
const CalorieChart = ({ calories, size = 'normal' }: { calories: number, size?: 'small' | 'normal' }) => {
  const percentage = 75;
  const radius = size === 'small' ? 40 : 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const svgSize = size === 'small' ? 96 : 128;
  const centerPosition = svgSize / 2;
  const strokeWidth = size === 'small' ? 6 : 8;

  return (
    <div className={`relative mx-auto ${size === 'small' ? 'w-24 h-24' : 'w-28 h-28 sm:w-32 sm:h-32'}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${svgSize} ${svgSize}`}>
        <circle
          cx={centerPosition}
          cy={centerPosition}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={centerPosition}
          cy={centerPosition}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-amber-300 dark:text-amber-300 transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold text-slate-800 dark:text-white ${size === 'small' ? 'text-xl' : 'text-xl sm:text-2xl'}`}>
          {calories}
        </span>
        <span className={`text-slate-600 dark:text-slate-300 ${size === 'small' ? 'text-[10px]' : 'text-xs'}`}>
          kcal/día
        </span>
      </div>
    </div>
  );
};

const seasonalMeals: SeasonalMeals = {
    primavera: {
      lunes: {
        desayuno: 'Yogur natural con fresas frescas, granola y miel',
        comida: 'Ensalada de espárragos con salmón a la plancha y quinoa',
        cena: 'Crema de guisantes con menta y tostadas integrales'
      },
      martes: {
        desayuno: 'Tostadas de aguacate con huevo pochado y tomate cherry',
        comida: 'Pollo al horno con judías verdes y patatas baby',
        cena: 'Revuelto de espárragos trigueros con champiñones'
      },
      miercoles: {
        desayuno: 'Smoothie de espinacas, plátano, kiwi y leche de almendras',
        comida: 'Pasta integral con pesto de albahaca y tomates cherry',
        cena: 'Lubina al vapor con alcachofas salteadas'
      },
      jueves: {
        desayuno: 'Porridge de avena con manzana rallada y canela',
        comida: 'Arroz integral con verduras de temporada al wok',
        cena: 'Tortilla de espárragos con ensalada verde'
      },
      viernes: {
        desayuno: 'Pan integral con queso fresco y rodajas de pepino',
        comida: 'Merluza con salsa verde y zanahorias baby',
        cena: 'Crema de calabacín con semillas de calabaza tostadas'
      },
      sabado: {
        desayuno: 'Batido de frutos rojos con yogur griego y chía',
        comida: 'Paella de verduras con alcachofas y guisantes',
        cena: 'Ensalada completa con atún, huevo y espárragos'
      },
      domingo: {
        desayuno: 'Gofres integrales con fresas y yogur natural',
        comida: 'Ternera guisada con guisantes y zanahorias',
        cena: 'Sopa de verduras con fideos integrales'
      }
    },
    verano: {
      lunes: {
        desayuno: 'Melón con jamón serrano y tostadas integrales',
        comida: 'Gazpacho andaluz con ensalada de tomate y burrata',
        cena: 'Brochetas de pollo con pimientos y calabacín a la parrilla'
      },
      martes: {
        desayuno: 'Sandía con queso feta y menta fresca',
        comida: 'Ensalada mediterránea con atún, aceitunas y pepino',
        cena: 'Calabacín relleno de quinoa y verduras al horno'
      },
      miercoles: {
        desayuno: 'Smoothie bowl de mango con coco rallado y granola',
        comida: 'Pulpo a la gallega con patatas y pimentón',
        cena: 'Ensalada de tomate rosa con mozzarella y albahaca'
      },
      jueves: {
        desayuno: 'Yogur con melocotón fresco y frutos secos',
        comida: 'Dorada al horno con berenjenas y tomates',
        cena: 'Salmorejo cordobés con huevo duro y jamón'
      },
      viernes: {
        desayuno: 'Tostadas con tomate rallado, aceite de oliva y aguacate',
        comida: 'Fideuá de verduras y gambas',
        cena: 'Pisto manchego con huevo pochado'
      },
      sabado: {
        desayuno: 'Batido de frutas tropicales con semillas de lino',
        comida: 'Lubina a la sal con ensalada de pepino y menta',
        cena: 'Crema fría de pepino con yogur griego'
      },
      domingo: {
        desayuno: 'Pan integral con hummus y verduras crudas',
        comida: 'Arroz negro con calamares y alioli',
        cena: 'Ensalada caprese con rúcula y piñones tostados'
      }
    },
    otoño: {
      lunes: {
        desayuno: 'Porridge de avena con manzana asada y nueces',
        comida: 'Crema de calabaza con jengibre y semillas de girasol',
        cena: 'Pollo asado con setas y castañas'
      },
      martes: {
        desayuno: 'Tostadas de pan integral con mermelada de higo y queso',
        comida: 'Lentejas estofadas con verduras y chorizo',
        cena: 'Berenjena gratinada con queso y tomate'
      },
      miercoles: {
        desayuno: 'Yogur con granada, nueces y miel de castaño',
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
        cena: 'Ensalada templada de espinacas con pasas y piñones'
      },
      sabado: {
        desayuno: 'Gachas de avena con higos secos y almendras',
        comida: 'Arroz con setas, alcachofas y trufa',
        cena: 'Crema de calabacín y puerro con crutones'
      },
      domingo: {
        desayuno: 'Tortitas de manzana con sirope de arce',
        comida: 'Cordero al horno con batata y romero',
        cena: 'Ensalada de col lombarda, manzana y nueces'
      }
    },
    invierno: {
      lunes: {
        desayuno: 'Porridge de avena con plátano y cacao',
        comida: 'Cocido madrileño completo',
        cena: 'Crema de coliflor con queso azul y nueces'
      },
      martes: {
        desayuno: 'Tostadas con mantequilla de cacahuete y rodajas de plátano',
        comida: 'Fabada asturiana con compango',
        cena: 'Brócoli gratinado con bechamel ligera'
      },
      miercoles: {
        desayuno: 'Batido caliente de chocolate con leche de avena',
        comida: 'Potaje de garbanzos con espinacas y bacalao',
        cena: 'Sopa de fideos con pollo desmenuzado'
      },
      jueves: {
        desayuno: 'Pan integral con queso y membrillo',
        comida: 'Estofado de ternera con zanahorias y guisantes',
        cena: 'Puré de calabaza y patata con huevo duro'
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

const MealPlanner = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [season, setSeason] = useState<Season>('primavera');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    edad: '',
    sexo: '',
    altura: '',
    peso: '',
    pesoObjetivo: ''
  });
  
  // Hook de lista de compras (AHORA puede acceder a seasonalMeals)
  const shoppingListHook = useShoppingList(seasonalMeals, season);

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

  

type Season = 'primavera' | 'verano' | 'otoño' | 'invierno';

  const seasonIcons: Record<Season, React.ReactElement> = {
    primavera: <Leaf className="w-6 h-6 sm:w-8 sm:h-8" />,
    verano: <Sun className="w-6 h-6 sm:w-8 sm:h-8" />,
    otoño: <CloudRain className="w-6 h-6 sm:w-8 sm:h-8" />,
    invierno: <Snowflake className="w-6 h-6 sm:w-8 sm:h-8" />
  };

  const seasonColors: Record<Season, string> = {
    primavera: 'bg-teal-50 dark:bg-sky-950 border-teal-300 dark:border-sky-700 text-teal-800 dark:text-cyan-700',
    verano: 'bg-cyan-50 dark:bg-sky-950 border-cyan-300 dark:border-sky-700 text-cyan-800 dark:text-cyan-800',
    otoño: 'bg-red-100 dark:bg-sky-950 border-red-200 dark:border-sky-700 text-red-600 dark:text-cyan-800',
    invierno: 'bg-zinc-200 dark:bg-sky-950 border-zinc-300 dark:border-sky-700 text-sky-800 dark:text-cyan-700'
  };

  const seasonActiveColors: Record<Season, string> = {
    primavera: 'bg-teal-500 dark:bg-teal-600 border-teal-500 dark:border-teal-600 text-white',
    verano: 'bg-cyan-500 dark:bg-cyan-600 border-cyan-500 dark:border-cyan-600 text-white',
    otoño: 'bg-red-500 dark:bg-orange-600 border-red-500 dark:border-orange-600 text-white',
    invierno: 'bg-zinc-400 dark:bg-zinc-600 border-zinc-400 dark:border-sky-600 text-white'
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
  };

type Day = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

  const dias: Day[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  // Componente Toggle de Tema (Touch-friendly)
  const ThemeToggle = () => {
    if (!mounted) return null;

    return (
      <button
        onClick={toggleTheme}
        className="relative p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 active:scale-95"
        aria-label="Cambiar tema"
      >
        <div className="relative w-5 h-5 sm:w-6 sm:h-6">
          <Sun className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-amber-500 transition-all duration-300 ${
            theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
          }`} />
          <Moon className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-slate-300 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
          }`} />
        </div>
      </button>
    );
  };

  const NavigationBar = () => {
    const isActive = (path: string) => pathname === path;

    return (
      <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="bg-teal-100 dark:bg-teal-900 p-1.5 sm:p-2 rounded-lg">
                <Apple className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-teal-600 dark:text-teal-400" />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-light text-slate-800 dark:text-slate-100">
                Nutri<span className="font-semibold text-teal-600 dark:text-teal-400">Plan</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                href="/about"
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive('/about')
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                Sobre Nosotros
              </Link>
              <Link
                href="/"
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  profile 
                    ? 'bg-teal-600 dark:bg-teal-500 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600 shadow-sm'
                    : isActive('/')
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                Mi Plan
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive('/contact')
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                Contacto
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-1">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-4 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors active:scale-[0.98] ${
                  isActive('/about')
                    ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Sobre Nosotros
              </Link>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-4 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors active:scale-[0.98] ${
                  profile
                    ? 'bg-teal-600 dark:bg-teal-500 text-white hover:bg-teal-700 dark:hover:bg-teal-600'
                    : isActive('/')
                    ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Mi Plan
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-4 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors active:scale-[0.98] ${
                  isActive('/contact')
                    ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Contacto
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
  };

  // Navegación Inferior Móvil (Bottom Navigation)
  const BottomNavigation = () => {
    if (!profile) return null;

    const isActive = (path: string) => pathname === path;

    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 safe-area-pb">
        <div className="grid grid-cols-3 h-16">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 transition-colors active:bg-slate-100 dark:active:bg-slate-800 ${
              isActive('/')
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs font-medium">Inicio</span>
          </Link>
          <Link
            href="/about"
            className={`flex flex-col items-center justify-center gap-1 transition-colors active:bg-slate-100 dark:active:bg-slate-800 ${
              isActive('/about')
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Info className="w-5 h-5" />
            <span className="text-xs font-medium">Info</span>
          </Link>
          <Link
            href="/contact"
            className={`flex flex-col items-center justify-center gap-1 transition-colors active:bg-slate-100 dark:active:bg-slate-800 ${
              isActive('/contact')
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Phone className="w-5 h-5" />
            <span className="text-xs font-medium">Contacto</span>
          </Link>
        </div>
      </nav>
    );
  };

  const Footer = () => (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 mt-6 sm:mt-8 md:mt-12 border-t border-slate-200 dark:border-slate-800 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-600 dark:bg-teal-500 p-2 rounded-lg">
                <Apple className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-light text-slate-800 dark:text-slate-100">
                Nutri<span className="font-semibold text-teal-600 dark:text-teal-400">Plan</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Tu plan nutricional personalizado basado en las estaciones del año.
            </p>
          </div>

          <div>
            <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-xs sm:text-sm">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-xs sm:text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors active:scale-95">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-xs sm:text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors active:scale-95">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs sm:text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors active:scale-95">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-xs sm:text-sm">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs sm:text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Aviso Legal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-3 sm:mb-4 uppercase tracking-wide text-xs sm:text-sm">Contacto</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 mt-0.5 font-medium">Email:</span>
                <span className="break-all">info@nutriplan.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 mt-0.5 font-medium">Lugar:</span>
                <span>Barcelona, España</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-300 dark:border-slate-700 pt-4 sm:pt-6 md:pt-8">
          <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-400 text-center">
            © 2024 NutriPlan. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );

  if (!profile) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
        <NavigationBar />
        <div className="flex-grow min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-6 sm:py-8 md:py-16 px-4 sm:px-6 pb-20 md:pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 sm:mb-10 md:mb-16">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="bg-teal-100 dark:bg-teal-900 p-3 sm:p-4 rounded-full">
                  <Apple className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-800 dark:text-slate-100 mb-2 sm:mb-3 md:mb-4 px-2">
                Plan Nutricional <span className="font-semibold text-teal-600 dark:text-teal-400">Personalizado</span>
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
                Descubre tu plan de alimentación ideal adaptado a tus objetivos y a las estaciones del año
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sm:p-8 md:p-12 max-w-3xl mx-auto">
              <div className="flex items-center mb-5 sm:mb-6 md:mb-8 pb-4 sm:pb-6 border-b border-slate-100 dark:border-slate-700">
                <User className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-teal-600 dark:text-teal-400 mr-3 flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-slate-800 dark:text-slate-100">Tu Perfil</h2>
              </div>
              
              <div className="space-y-5 sm:space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 uppercase tracking-wide">Edad</label>
                    <input
                      type="number"
                      value={formData.edad}
                      onChange={(e) => handleInputChange('edad', e.target.value)}
                      min="15"
                      max="100"
                      className="w-full px-4 sm:px-5 py-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 focus:outline-none transition-all text-base sm:text-lg"
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 uppercase tracking-wide">Sexo</label>
                    <select
                      value={formData.sexo}
                      onChange={(e) => handleInputChange('sexo', e.target.value)}
                      className="w-full px-4 sm:px-5 py-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 focus:outline-none transition-all text-base sm:text-lg"
                    >
                      <option value="">Seleccionar</option>
                      <option value="hombre">Hombre</option>
                      <option value="mujer">Mujer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 uppercase tracking-wide">Altura (cm)</label>
                    <input
                      type="number"
                      value={formData.altura}
                      onChange={(e) => handleInputChange('altura', e.target.value)}
                      min="120"
                      max="250"
                      className="w-full px-4 sm:px-5 py-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 focus:outline-none transition-all text-base sm:text-lg"
                      placeholder="170"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 uppercase tracking-wide">Peso Actual (kg)</label>
                    <input
                      type="number"
                      value={formData.peso}
                      onChange={(e) => handleInputChange('peso', e.target.value)}
                      min="30"
                      max="300"
                      step="0.1"
                      className="w-full px-4 sm:px-5 py-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 focus:outline-none transition-all text-base sm:text-lg"
                      placeholder="75.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 uppercase tracking-wide">Peso Objetivo (kg)</label>
                  <input
                    type="number"
                    value={formData.pesoObjetivo}
                    onChange={(e) => handleInputChange('pesoObjetivo', e.target.value)}
                    min="30"
                    max="300"
                    step="0.1"
                    className="w-full px-4 sm:px-5 py-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 focus:outline-none transition-all text-base sm:text-lg"
                    placeholder="70"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-teal-600 dark:bg-teal-500 text-white font-medium py-4 sm:py-5 rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-all duration-300 shadow-lg shadow-teal-200 dark:shadow-teal-900/50 text-base sm:text-lg mt-4 active:scale-[0.98]"
                >
                  Crear Mi Plan Personalizado
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col pb-16 md:pb-0">
      <NavigationBar />
      <div className="flex-grow min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-4 sm:py-6 md:py-12 px-3 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
         
		 {/* Card de Perfil con Gráfico Circular - Mobile Optimized */}
          <div className="bg-gradient-to-br from-teal-400 to-teal-600 dark:from-teal-600 dark:to-teal-800 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-12 text-white">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              
			  {/* Header + Gráfico en móvil */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <h1 className="text-lg sm:text-2xl md:text-4xl font-light mb-2">
                    Tu Plan <span className="font-semibold">Nutricional</span>
                  </h1>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base md:text-lg">
                      {profile.peso} kg → <span className="font-semibold">{profile.pesoObjetivo} kg</span>
                    </span>
                  </div>
                </div>
                
                
				{/* Gráfico más pequeño en móvil */}
                <div className="flex-shrink-0">
                  <CalorieChart calories={profile.calorias} size="small" />
                </div>
              </div>

              <button
                onClick={() => setProfile(null)}
                className="w-full sm:w-auto px-5 py-3 sm:px-6 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm rounded-xl text-white font-medium transition-all text-sm sm:text-base border border-white/30 active:scale-[0.98]"
              >
                Modificar Perfil
              </button>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <button
              onClick={shoppingListHook.generateShoppingList}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 dark:bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-700 dark:hover:bg-teal-600 transition-all duration-300 shadow-lg shadow-teal-200 dark:shadow-teal-900/50 active:scale-[0.98]"
            >
              <ShoppingCart className="w-5 h-5" />
              Generar Lista de la Compra
            </button>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 text-center sm:text-left">
              Crea automáticamente tu lista de compras basada en el plan semanal
            </p>
          </div>

          <div className="mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-slate-800 dark:text-slate-100 text-center mb-4 sm:mb-6 md:mb-8 px-2">
              Selecciona tu <span className="font-semibold text-teal-600 dark:text-teal-400">Estación</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
              {(['primavera', 'verano', 'otoño', 'invierno'] as Season[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`p-3 sm:p-4 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border-2 transition-all duration-300 active:scale-95 ${
                    season === s
                      ? seasonActiveColors[s] + ' shadow-lg'
                      : seasonColors[s] + ' hover:shadow-md active:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3">
                    <div>
                      {seasonIcons[s]}
                    </div>
                    <span className="font-medium capitalize text-xs sm:text-sm md:text-lg">{s}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {dias.map((dia) => (
              <div key={dia} className="bg-teal-50 dark:bg-teal-950/30 rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-teal-100 dark:border-teal-900/50 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-teal-500 dark:bg-teal-600 px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white flex-shrink-0" />
                    <h3 className="text-base sm:text-lg md:text-2xl font-medium text-white capitalize">
                      {dia.charAt(0).toUpperCase() + dia.slice(1)}
                    </h3>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 md:p-8 bg-white dark:bg-slate-800 grid grid-cols-1 gap-3 sm:gap-4 md:gap-8">
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px] sm:text-xs md:text-sm">Desayuno</h4>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{seasonalMeals[season][dia].desayuno}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px] sm:text-xs md:text-sm">Comida</h4>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{seasonalMeals[season][dia].comida}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide text-[11px] sm:text-xs md:text-sm">Cena</h4>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{seasonalMeals[season][dia].cena}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
	  
	  {/* Componente de Lista de Compras */}
 


	  
	  
      <BottomNavigation />
      <Footer />
    </div>
  );
};

export default MealPlanner;
