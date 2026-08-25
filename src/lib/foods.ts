export interface FoodCategory {
  name: string;
  emoji: string;
  items: string[];
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  {
    name: "Proteínas",
    emoji: "🍗",
    items: [
      "Frango",
      "Peixe",
      "Carne magra",
      "Ovos",
      "Atum",
      "Sardinha",
      "Iogurte grego",
      "Queijo branco",
      "Cottage",
      "Feijão",
      "Lentilha",
      "Grão-de-bico",
      "Tofu",
    ],
  },
  {
    name: "Carboidratos",
    emoji: "🌾",
    items: [
      "Arroz",
      "Arroz integral",
      "Batata",
      "Batata-doce",
      "Mandioca",
      "Aveia",
      "Quinoa",
      "Pão integral",
    ],
  },
  {
    name: "Frutas",
    emoji: "🍎",
    items: ["Banana", "Maçã", "Mamão", "Morango", "Melão", "Abacaxi", "Laranja"],
  },
  {
    name: "Vegetais",
    emoji: "🥬",
    items: [
      "Brócolis",
      "Cenoura",
      "Alface",
      "Tomate",
      "Pepino",
      "Abobrinha",
      "Couve",
      "Espinafre",
    ],
  },
  {
    name: "Gorduras",
    emoji: "🥑",
    items: ["Abacate", "Castanhas", "Amendoim", "Azeite", "Chia", "Linhaça"],
  },
];

export const CATEGORY_OF: Record<string, string> = FOOD_CATEGORIES.reduce(
  (acc, cat) => {
    for (const item of cat.items) acc[item] = cat.name;
    return acc;
  },
  {} as Record<string, string>,
);

export function categoryOf(food: string): string {
  return CATEGORY_OF[food] ?? "Outros";
}

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
