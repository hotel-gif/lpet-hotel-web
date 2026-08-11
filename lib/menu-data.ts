// =============================================================================
// Carta del restaurante — La Palma y El Tucán Hotel
// -----------------------------------------------------------------------------
// FUENTE ÚNICA DEL MENÚ. El equipo edita aquí (nombres, descripciones y precios).
// Cada texto es bilingüe { es, en }; los precios son un solo string que respeta
// la coma decimal del original ($17, $7,5). No hay contenido en los JSON de i18n:
// allí solo viven las etiquetas de página (bienvenida, notas de pie, toggle...).
//
// Estilos de sección:
//   "cards" -> tarjeta con nombre (serif) + descripción + precio (con descripción).
//   "list"  -> fila compacta con líder punteado y precio a la derecha (tipo lista).
// =============================================================================

import type { Locale } from "@/lib/i18n";

/** Texto bilingüe. Se resuelve con `text[locale]` al renderizar. */
export type Loc = Record<Locale, string>;

export type MenuItem = {
  name: Loc;
  /** Descripción del plato. Opcional (algunos ítems no la traen). */
  desc?: Loc;
  /** Precio como texto, respetando la coma decimal ($17, $7,5). Opcional. */
  price?: string;
  /** Línea de complemento (ej. "Proteína vegana +$3,5"). Opcional. */
  addon?: Loc;
};

export type MenuSection = {
  /** Ancla usada por el nav de chips (#id). */
  id: string;
  /** Título de la sección (chip + encabezado). */
  title: Loc;
  layout: "cards" | "list";
  /** Nota bajo el título de la sección (ej. "Acompañados de chips & dip"). */
  note?: Loc;
  items: MenuItem[];
};

export const MENU: MenuSection[] = [
  {
    id: "desayunos",
    title: { es: "Desayunos", en: "Breakfasts" },
    layout: "cards",
    note: {
      es: "*Incluido con el alojamiento: café, té o chocolate y jugo de fruta natural, bowl de fruta, canasta de panes + 1 plato a elección.",
      en: "*Included with the accommodation: Coffee, hot chocolate or tea, natural fruit juice, fruit bowl, breadbasket + 1 dish of choice.",
    },
    items: [
      {
        name: { es: "Granola", en: "Granola" },
        desc: {
          es: "con yogurt, leche o leche vegetal.",
          en: "with yogurt, milk or plant-based milk.",
        },
      },
      {
        name: { es: "Huevos al gusto", en: "Eggs to taste" },
        desc: {
          es: "con jamón, queso, maíz o tomate y cebolla, acompañados de arepas.",
          en: "with ham, cheese, corn or tomato and onion, with arepas.",
        },
      },
      {
        name: { es: "Waffles de Choclo", en: "Sweetcorn waffles" },
        desc: {
          es: "con queso crema, miel y mermelada artesanal.",
          en: "with cream cheese, honey and homemade jam.",
        },
      },
      {
        name: { es: "Waffles de avena y arándanos", en: "Oat and blueberry waffles" },
        desc: {
          es: "con queso crema, miel y mermelada artesanal.",
          en: "with cream cheese, honey and homemade jam.",
        },
      },
    ],
  },
  {
    id: "smoothies",
    title: { es: "Smoothies", en: "Smoothies" },
    layout: "cards",
    items: [
      {
        name: { es: "Protein & Chocolate", en: "Protein & Chocolate" },
        desc: {
          es: "Leche de avena o vegetal, mantequilla de maní, proteína vegana sabor chocolate",
          en: "Oat or plant-based milk, banana, peanut butter, chocolate-flavored vegan protein",
        },
        price: "$17",
        addon: { es: "Proteína vegana +$3,5", en: "Vegan protein +$3.5" },
      },
      {
        name: { es: "Strawberry banana", en: "Strawberry banana" },
        desc: {
          es: "Leche de avena o vegetal, fresa, banano y miel",
          en: "Oat or plant-based milk, strawberry, banana, honey",
        },
        price: "$16",
      },
      {
        name: { es: "Very Berry", en: "Very Berry" },
        desc: {
          es: "Leche vegetal, arándano, fresa y mora",
          en: "Plant-based milk, blueberry, strawberry and blackberry",
        },
        price: "$16",
      },
    ],
  },
  {
    id: "sopas-ensaladas-tostadas",
    title: { es: "Sopas, Ensaladas & Tostadas", en: "Soups, Salads & Toasts" },
    layout: "cards",
    items: [
      {
        name: { es: "Sopa Rústica de Tomate", en: "Tomato Rustic soup" },
        desc: {
          es: "Tomate San Marzano rostizado en horno de leña con costra de parmesano",
          en: "Roasted San Marzano tomato with wood-fired oven and parmesan crust",
        },
        price: "$21",
      },
      {
        name: { es: "Sopa de Ahuyama", en: "Pumpkin soup" },
        desc: {
          es: "Sopa fresca de ahuyama con aceite de oliva virgen y semillas de girasol",
          en: "Fresh pumpkin soup with extra virgin olive oil and sunflower seeds",
        },
        price: "$21",
      },
      {
        name: { es: "Ensalada fresca de la Huerta", en: "Fresh Garden salad" },
        desc: {
          es: "Mix de verdes de cosecha de la huerta, con queso parmesano y balsámico",
          en: "Harvest greens mix with parmesan cheese and balsamic dressing",
        },
        price: "$15",
      },
      {
        name: { es: "Ensalada Capresse", en: "Capresse salad" },
        desc: {
          es: "Rodajas de tomate fresco y mozzarella de búfala, acompañados de pesto rústico de albahaca de la huerta y aceite de oliva virgen",
          en: "Fresh tomato slices and buffalo mozzarella, accompanied by rustic garden basil pesto and extra virgin olive oil",
        },
        price: "$18",
      },
      {
        name: { es: "Ensalada tradicional", en: "Traditional salad" },
        price: "$15",
      },
      {
        name: { es: "Bruschetta", en: "Bruschetta" },
        desc: {
          es: "Rebanadas de pan tostado rebozadas con ajo y aceite de oliva, acompañadas de tomate cherry de la huerta",
          en: "Toasted bread slices coated with garlic and olive oil, accompanied by garden cherry tomatoes",
        },
        price: "$18",
      },
      {
        name: { es: "Tostada de Aguacate", en: "Avocado toast" },
        desc: {
          es: "Tostada de pan de masa madre con aguacates de nuestros árboles, aceite de oliva virgen y orégano seco",
          en: "Sourdough bread toast with avocados from our trees, extra virgin olive oil and dried oregano",
        },
        price: "$18",
      },
    ],
  },
  {
    id: "platos-fuertes",
    title: { es: "Platos Fuertes", en: "Main Dishes" },
    layout: "cards",
    items: [
      {
        name: { es: "Fettuccine al Ragù di Funghi", en: "Fettuccine al Ragù di Funghi" },
        desc: {
          es: "Ragú de Setas Biodiversal, vegetales de la huerta y tomates San Marzano",
          en: "Biodiversal mushrooms stew, garden vegetables, and San Marzano tomatoes",
        },
        price: "$40",
      },
      {
        name: { es: "Fettuccine al Ragú di Manzo", en: "Fettuccine al Ragú di Manzo" },
        desc: {
          es: "Ragú de res, vegetales de la huerta y tomates San Marzano",
          en: "Beef stew with garden vegetables and San Marzano tomatoes",
        },
        price: "$40",
      },
      {
        name: { es: "Orecchiette al Pesto Bianco", en: "Orecchiette al Pesto Bianco" },
        desc: {
          es: "Pesto de ricotta fresca con nuez de nogal, orégano fresco de la huerta y ralladura de limón",
          en: "Fresh ricotta pesto with walnut, garden fresh oregano, and lemon zest",
        },
        price: "$35",
      },
      {
        name: { es: "Fusilli al Pesto Genovese", en: "Fusilli al Pesto Genovese" },
        desc: {
          es: "Pesto de albahaca genovesa de la huerta con almendra y parmesano",
          en: "Genovese basil pesto with almonds and parmesan cheese",
        },
        price: "$35",
      },
      {
        name: { es: "Fusilli Cavolo Nero", en: "Fusilli Cavolo Nero" },
        desc: {
          es: "Pesto de kale toscano de la huerta y ricotta fresca",
          en: "Tuscan kale pesto with fresh ricotta cheese",
        },
        price: "$35",
      },
      {
        name: { es: "Milanesa de Pollo", en: "Chicken Milanese" },
        desc: {
          es: "Pechuga de pollo apanada en queso parmesano y miga de pan con salsa fresca de tomates de la huerta, acompañada de pasta al olio o ensalada fresca",
          en: "Breaded chicken breast with parmesan cheese and bread crumbs, served with fresh tomato sauce from the garden and a side of olive oil pasta or fresh salad",
        },
        price: "$50",
      },
      {
        name: { es: "Trucha a la plancha", en: "Grilled trout" },
        desc: {
          es: "Acompañada de patacón con ensalada, o pasta al olio",
          en: "Accompanied by patacón with salad, or olive oil pasta",
        },
        price: "$50",
      },
    ],
  },
  {
    id: "sandwiches",
    title: { es: "Sándwiches", en: "Sandwiches" },
    layout: "cards",
    note: {
      es: "Acompañados de chips & dip",
      en: "All sandwiches are served with chips & dip",
    },
    items: [
      {
        name: { es: "Sándwich de Hongos", en: "Mushroom Sandwich" },
        desc: {
          es: "Champiñones París y portobello al horno, tomate cherry, queso mozzarella y mix de lechugas en pan ciabatta",
          en: "Baked Paris and portobello mushrooms, cherry tomatoes, mozzarella cheese, and lettuce mix on ciabatta bread",
        },
        price: "$50",
      },
      {
        name: { es: "Sándwich de Pollo", en: "Chicken Sandwich" },
        desc: {
          es: "Pollo en tiras, aguacate, tomate cherry, alioli, queso mozzarella y mix de lechugas en pan ciabatta",
          en: "Chicken strips, avocado, cherry tomatoes, aioli, mozzarella cheese, and lettuce mix on ciabatta bread",
        },
        price: "$45",
      },
      {
        name: { es: "Sándwich Roast beef", en: "Roast Beef Sandwich" },
        desc: {
          es: "Finas láminas de roast beef, tomate cherry, queso mozzarella y mix de lechugas en nuestro pan ciabatta",
          en: "Thin slices of roast beef, cherry tomatoes, mozzarella cheese, and lettuce mix on our ciabatta bread",
        },
        price: "$50",
      },
    ],
  },
  {
    id: "postres",
    title: { es: "Postres", en: "Desserts" },
    layout: "list",
    items: [
      { name: { es: "Torta de Zanahoria", en: "Carrot Cake" }, price: "$13" },
      { name: { es: "Torta de Banano con chocolate", en: "Banana Chocolate Cake" }, price: "$13" },
      { name: { es: "Brownie", en: "Brownie" }, price: "$12" },
      {
        name: { es: "Crumble de avena y almendra", en: "Oat and almond crumble with blueberries" },
        price: "$13",
      },
      { name: { es: "Bola de helado", en: "Scoop of ice cream" }, price: "$7,5" },
    ],
  },
  {
    id: "bebidas",
    title: { es: "Bebidas", en: "Drinks" },
    layout: "list",
    items: [
      { name: { es: "Jugos naturales", en: "Fresh juices" }, price: "$9,5" },
      { name: { es: "Limonada natural", en: "Fresh lemonade" }, price: "$8" },
      { name: { es: "Ginger Ale", en: "Ginger Ale" }, price: "$8" },
      { name: { es: "Agua natural", en: "Natural water" }, price: "$6,5" },
      { name: { es: "Bretaña (agua con gas)", en: "Bretaña (sparkling water)" }, price: "$6,1" },
      {
        name: { es: "Cerveza Club Colombia dorada", en: "Club Colombia Beer (golden)" },
        price: "$10",
      },
      {
        name: { es: "Suero de hidratación", en: "Hydration drink" },
        price: "$13,6",
      },
      { name: { es: "Cerveza Coronita", en: "Coronita Beer" }, price: "$10" },
    ],
  },
  {
    id: "extras",
    title: { es: "Extras", en: "Additions" },
    layout: "list",
    items: [
      {
        name: { es: "Porción de fruta de la temporada", en: "Seasonal fruit serving" },
        price: "$12",
      },
      { name: { es: "Canasta de panes", en: "Breadbasket" }, price: "$15" },
      { name: { es: "Porción de arepa", en: "Portion of arepa" }, price: "$7" },
      { name: { es: "Porción de aguacate", en: "Portion of avocado" }, price: "$6" },
      {
        name: { es: "Porción de chips de plátanos de la casa", en: "Home-made plantain chips" },
        price: "$12",
      },
      { name: { es: "Porción de granola", en: "Portion of granola" }, price: "$15" },
      { name: { es: "Porción de huevos", en: "Portion of eggs" }, price: "$20" },
      {
        name: { es: "Porción de waffles de choclo", en: "Portion of sweetcorn waffles" },
        price: "$20",
      },
      {
        name: { es: "Waffles de avena y arándanos", en: "Oat and blueberry waffles" },
        price: "$20",
      },
    ],
  },
];
