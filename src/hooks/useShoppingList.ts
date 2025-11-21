import { useState, useEffect } from 'react';

// Tipos
export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  checked: boolean;
}

export interface ShoppingCategory {
  name: string;
  icon: string;
  items: ShoppingItem[];
}

// Base de datos de ingredientes con categorías
const ingredientCategories: Record<string, { category: string; quantity: string }> = {
  // Frutas y Verduras
  'espárragos': { category: 'Frutas y Verduras', quantity: '500g' },
  'fresas': { category: 'Frutas y Verduras', quantity: '250g' },
  'tomate': { category: 'Frutas y Verduras', quantity: '1kg' },
  'aguacate': { category: 'Frutas y Verduras', quantity: '2 unidades' },
  'guisantes': { category: 'Frutas y Verduras', quantity: '300g' },
  'pepino': { category: 'Frutas y Verduras', quantity: '2 unidades' },
  'espinacas': { category: 'Frutas y Verduras', quantity: '200g' },
  'plátano': { category: 'Frutas y Verduras', quantity: '6 unidades' },
  'kiwi': { category: 'Frutas y Verduras', quantity: '4 unidades' },
  'alcachofas': { category: 'Frutas y Verduras', quantity: '6 unidades' },
  'zanahorias': { category: 'Frutas y Verduras', quantity: '500g' },
  'calabacín': { category: 'Frutas y Verduras', quantity: '2 unidades' },
  'champiñones': { category: 'Frutas y Verduras', quantity: '250g' },
  'melón': { category: 'Frutas y Verduras', quantity: '1 unidad' },
  'sandía': { category: 'Frutas y Verduras', quantity: '1 unidad' },
  'pimientos': { category: 'Frutas y Verduras', quantity: '3 unidades' },
  'berenjenas': { category: 'Frutas y Verduras', quantity: '2 unidades' },
  'mango': { category: 'Frutas y Verduras', quantity: '2 unidades' },
  'melocotón': { category: 'Frutas y Verduras', quantity: '4 unidades' },
  'calabaza': { category: 'Frutas y Verduras', quantity: '1kg' },
  'setas': { category: 'Frutas y Verduras', quantity: '300g' },
  'manzana': { category: 'Frutas y Verduras', quantity: '6 unidades' },
  'pera': { category: 'Frutas y Verduras', quantity: '4 unidades' },
  'granada': { category: 'Frutas y Verduras', quantity: '2 unidades' },
  'higos': { category: 'Frutas y Verduras', quantity: '6 unidades' },
  'uvas': { category: 'Frutas y Verduras', quantity: '500g' },
  'brócoli': { category: 'Frutas y Verduras', quantity: '1 unidad' },
  'coliflor': { category: 'Frutas y Verduras', quantity: '1 unidad' },
  'col': { category: 'Frutas y Verduras', quantity: '1 unidad' },
  'puerros': { category: 'Frutas y Verduras', quantity: '3 unidades' },
  'cebolla': { category: 'Frutas y Verduras', quantity: '500g' },
  'ajo': { category: 'Frutas y Verduras', quantity: '1 cabeza' },
  'judías': { category: 'Frutas y Verduras', quantity: '400g' },
  'rúcula': { category: 'Frutas y Verduras', quantity: '100g' },
  'lechuga': { category: 'Frutas y Verduras', quantity: '1 unidad' },
  'escarola': { category: 'Frutas y Verduras', quantity: '1 unidad' },
  'boniato': { category: 'Frutas y Verduras', quantity: '500g' },
  'batata': { category: 'Frutas y Verduras', quantity: '500g' },

  // Proteínas
  'salmón': { category: 'Pescado y Marisco', quantity: '300g' },
  'pollo': { category: 'Carne y Aves', quantity: '500g' },
  'ternera': { category: 'Carne y Aves', quantity: '500g' },
  'merluza': { category: 'Pescado y Marisco', quantity: '400g' },
  'atún': { category: 'Pescado y Marisco', quantity: '2 latas' },
  'lubina': { category: 'Pescado y Marisco', quantity: '400g' },
  'dorada': { category: 'Pescado y Marisco', quantity: '400g' },
  'pulpo': { category: 'Pescado y Marisco', quantity: '500g' },
  'gambas': { category: 'Pescado y Marisco', quantity: '300g' },
  'calamares': { category: 'Pescado y Marisco', quantity: '400g' },
  'bacalao': { category: 'Pescado y Marisco', quantity: '400g' },
  'codornices': { category: 'Carne y Aves', quantity: '4 unidades' },
  'cordero': { category: 'Carne y Aves', quantity: '600g' },
  'chorizo': { category: 'Embutidos', quantity: '200g' },
  'morcilla': { category: 'Embutidos', quantity: '150g' },
  'jamón': { category: 'Embutidos', quantity: '150g' },

  // Lácteos
  'yogur': { category: 'Lácteos y Huevos', quantity: '1 pack' },
  'leche': { category: 'Lácteos y Huevos', quantity: '1L' },
  'queso': { category: 'Lácteos y Huevos', quantity: '200g' },
  'huevo': { category: 'Lácteos y Huevos', quantity: '12 unidades' },
  'mozzarella': { category: 'Lácteos y Huevos', quantity: '250g' },
  'burrata': { category: 'Lácteos y Huevos', quantity: '125g' },
  'feta': { category: 'Lácteos y Huevos', quantity: '200g' },
  'parmesano': { category: 'Lácteos y Huevos', quantity: '150g' },

  // Cereales y Legumbres
  'pan': { category: 'Pan y Cereales', quantity: '2 barras' },
  'arroz': { category: 'Legumbres y Cereales', quantity: '500g' },
  'pasta': { category: 'Legumbres y Cereales', quantity: '500g' },
  'quinoa': { category: 'Legumbres y Cereales', quantity: '250g' },
  'avena': { category: 'Legumbres y Cereales', quantity: '500g' },
  'lentejas': { category: 'Legumbres y Cereales', quantity: '500g' },
  'garbanzos': { category: 'Legumbres y Cereales', quantity: '500g' },
  'alubias': { category: 'Legumbres y Cereales', quantity: '500g' },
  'fideos': { category: 'Legumbres y Cereales', quantity: '250g' },

  // Otros
  'aceitunas': { category: 'Despensa', quantity: '1 bote' },
  'aceite': { category: 'Despensa', quantity: '1 botella' },
  'miel': { category: 'Despensa', quantity: '1 bote' },
  'granola': { category: 'Despensa', quantity: '1 paquete' },
  'nueces': { category: 'Frutos Secos', quantity: '200g' },
  'almendras': { category: 'Frutos Secos', quantity: '200g' },
  'piñones': { category: 'Frutos Secos', quantity: '100g' },
  'pasas': { category: 'Frutos Secos', quantity: '150g' },
  'castañas': { category: 'Frutos Secos', quantity: '300g' },
};

// Hook principal
export const useShoppingList = (weekMeals: any, season: string) => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar lista desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nutriplan-shopping-list');
    if (saved) {
      try {
        setShoppingList(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading shopping list', e);
      }
    }
  }, []);

  // Guardar en localStorage cuando cambia
  useEffect(() => {
    if (shoppingList.length > 0) {
      localStorage.setItem('nutriplan-shopping-list', JSON.stringify(shoppingList));
    }
  }, [shoppingList]);

  // Generar lista de compras desde el plan semanal
       const generateShoppingList = () => {
       const items: ShoppingItem[] = [];
       const addedIngredients = new Set<string>();
	   

    if (!weekMeals || !season) return;

    const meals = weekMeals[season];
    const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

    days.forEach(day => {
      const dayMeals = meals[day];
      ['desayuno', 'comida', 'cena'].forEach(mealType => {
        const meal = dayMeals[mealType].toLowerCase();
        
        // Buscar ingredientes conocidos en la comida
        Object.keys(ingredientCategories).forEach(ingredient => {
          if (meal.includes(ingredient) && !addedIngredients.has(ingredient)) {
            addedIngredients.add(ingredient);
            const info = ingredientCategories[ingredient];
            items.push({
              id: `${ingredient}-${Date.now()}-${Math.random()}`,
              name: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
              category: info.category,
              quantity: info.quantity,
              checked: false
            });
          }
        });
      });
    });

  
    setShoppingList(items);
    setIsOpen(true);
    };

  // Agrupar por categorías
  const getCategorizedList = (): ShoppingCategory[] => {
    const categories: Record<string, ShoppingCategory> = {};

    shoppingList.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = {
          name: item.category,
          icon: getCategoryIcon(item.category),
          items: []
        };
      }
      categories[item.category].items.push(item);
    });

    // Ordenar categorías
    const categoryOrder = [
      'Frutas y Verduras',
      'Carne y Aves',
      'Pescado y Marisco',
      'Lácteos y Huevos',
      'Legumbres y Cereales',
      'Pan y Cereales',
      'Embutidos',
      'Frutos Secos',
      'Despensa'
    ];

    return categoryOrder
      .filter(cat => categories[cat])
      .map(cat => categories[cat]);
  };

  // Icono por categoría
  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'Frutas y Verduras': '🥬',
      'Carne y Aves': '🍗',
      'Pescado y Marisco': '🐟',
      'Lácteos y Huevos': '🥚',
      'Legumbres y Cereales': '🌾',
      'Pan y Cereales': '🥖',
      'Embutidos': '🥓',
      'Frutos Secos': '🥜',
      'Despensa': '🏺'
    };
    return icons[category] || '📦';
  };

  // Marcar/desmarcar item
  const toggleItem = (id: string) => {
    setShoppingList(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  // Marcar todos
  const toggleAll = (checked: boolean) => {
    setShoppingList(prev => prev.map(item => ({ ...item, checked })));
  };

  // Limpiar marcados
  const clearChecked = () => {
    setShoppingList(prev => prev.filter(item => !item.checked));
  };

  // Limpiar toda la lista
  const clearAll = () => {
    setShoppingList([]);
    localStorage.removeItem('nutriplan-shopping-list');
  };

  // Estadísticas
  const stats = {
    total: shoppingList.length,
    checked: shoppingList.filter(i => i.checked).length,
    unchecked: shoppingList.filter(i => !i.checked).length,
    progress: shoppingList.length > 0 
      ? Math.round((shoppingList.filter(i => i.checked).length / shoppingList.length) * 100)
      : 0
  };

  return {
    shoppingList,
    categorizedList: getCategorizedList(),
    isOpen,
    setIsOpen,
    generateShoppingList,
    toggleItem,
    toggleAll,
    clearChecked,
    clearAll,
    stats
  };
};
