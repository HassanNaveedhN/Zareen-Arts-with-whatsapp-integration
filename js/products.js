const products = [
  {
    id: 1,
    category: "cakes",
    name: "Caramel Three Milk Cake",
    price: 2500,
    sizePrices: {
      "2 Pound": 2500,
    
    },
    image: "images/Caramel three milk.jpg",
    description: "Soft vanilla sponge with creamy frosting.",
    custom: true
  },

  {
    id: 2,
    category: "cakes",
    name: "Red Velvet Cake",
    price: 2000,
    sizePrices: {
      "2 Pound": 2000,
      
    },
    image: "images/Red Velvet .png",
    description: "Rich red velvet layers with cream cheese frosting.",
    custom: true
  },

  {
    id: 3,
    category: "cakes",
    name: "Chocolate Fudge Cake",
    price: 2400,
    sizePrices: {
      
      "2 Pound": 2400,
    },
    image: "images/Chocolate fudge cake.jfif",
    description: "Deep chocolate cake with smooth fudge frosting.",
    custom: true
  },

  {
    id: 4,
    category: "cakes",
    name: "Black Forest Cake",
    price: 2000,
    sizePrices: {
      
      "2 Pound": 2000,
      "3 Pound": 3000,
      "4 Pound": 4000
    },
    image: "images/Forest.jfif",
    description: "Classic black forest cake with rich chocolate and cherries.",
    custom: true
  },

  {
    id: 15,
    category: "cakes",
    name: "Choco Lava Cake",
    price: 2600,
    sizePrices: {
      "2 Pound":2600,
  
    },
    image: "images/Chocolate Lava Cake.jfif",
    description: "Rich chocolate cake with a molten chocolate center.",
    custom: true
  },

  {
    id: 16,
    category: "cakes",
    name: "Pineapple Loaded Cake",
    price: 2200,
    sizePrices: {
    
      "2 Pound": 2200,
      
    },
    image: "images/pineapple.jfif",
    description: "Soft cake loaded with pineapple and cream.",
    custom: true
  },

  {
    id: 17,
    category: "cakes",
    name: "Mango Cream Cake",
    price: 2000,
    sizePrices: {
      
      "2 Pound": 2000,
    },
    image: "images/Mango Cake.jfif",
    description: "Fresh mango cake with creamy layers.",
    custom: true
  },

  {
    id: 18,
    category: "cakes",
    name: "Hummingbird Cake",
    price: 2800,
    sizePrices: {
      "2 Pound": 2800,
  
    },
    image: "images/Hummingbird Cake.jfif",
    description: "Moist and flavorful hummingbird cake.",
    custom: true
  },

  {
    id: 19,
    category: "cakes",
    name: "New York Cheesecake",
    price: 3500,
    sizePrices: {
      
      "2 Pound": 3500,
          },
    image: "images/cheesecake.jfif",
    description: "Creamy New York style cheesecake.",
    custom: true
  },

  {
    id: 20,
    category: "cakes",
    name: "Tiramisu Cake",
    price: 2500,
    sizePrices: {
      
      "2 Pound": 2500,
      
    },
    image: "images/Tiramisu.jfif",
    description: "Soft tiramisu cake with coffee and cream.",
    custom: true
  },


  {
    id: 22,
    category: "cakes",
    name: "Lotus Three Milk Cake",
    price: 2500,
    sizePrices: {
     
      "2 Pound": 2700,
     
    },
    image: "images/lotus cake.jfif",
    description: "Three milk cake topped with Lotus spread.",
    custom: true
  },

  {
    id: 23,
    category: "cakes",
    name: "Three Milk Cake",
    price: 2500,
    sizePrices: {
     
      "2 Pound": 2500,
    },
    image: "images/three milk.jfif",
    description: "Soft three milk cake with creamy topping.",
    custom: true
  },

  {
    id: 24,
    category: "cakes",
    name: "Classic Pound Cake",
    price: 2200,
    sizePrices: {
      "2 Pound": 2000,
    },
    image: "images/classic cake.jfif",
    description: "Classic soft and buttery pound cake.",
    custom: true
  },

  {
    id: 25,
    category: "cakes",
    name: "Angel Fruit Cake",
    price: 2000,
    sizePrices: {
     
      "2 Pound": 2000,
     
    },
    image: "images/fruit Cake.jfif",
    description: "Light fruit cake with creamy topping.",
    custom: true
  },

  {
    id: 26,
    category: "cakes",
    name: "Marble Cake",
    price: 2000,
    sizePrices: {
      "2 Pound": 2000,
      
    },
    image: "images/marbel cake.jfif",
    description: "Classic marble cake with vanilla and chocolate.",
    custom: true
  },

  {
    id: 27,
    category: "cakes",
    name: "Custom Birthday Cake",
    price: 1500,
    sizePrices: {
      "1 Pound": 1500,
      "2 Pound": 3000,
      "3 Pound": 4500,
      "4 Pound": 6000
    },
    image: "images/custom 2.jfif",
    description: "Your theme, colors, message and design.",
    custom: true
  },

  {
    id: 5,
    category: "resin",
    name: "Resin Flower Tray",
    price: 2800,
     sizePrices: {
      "Small": 2800,
      "Medium": 3400,
      "Large": 4000,
    },
    image: "images/resin tray.jfif",
    description: "Hand-poured resin tray with preserved flowers.",
    custom: true
  },

  {
    id: 6,
    category: "resin",
    name: "Resin Mirror Art",
    price: 3500,
    sizePrices: {
      "Small": 3500,
      "Medium": 4200,
      "Large": 5000
      
    },
    image: "images/resin mirror.jfif",
    description: "Decorative mirror with custom resin details.",
    custom: true
  },

  {
    id: 7,
    category: "resin",
    name: "Resin Key Chain",
    price: 700,
    sizePrices: {
      "Small": 700,
      
    },
    image: "images/key chain resin.jfif",
    description: "Ocean-inspired handmade resin artwork.",
    custom: true
  },

  {
    id: 8,
    category: "resin",
    name: "Wedding Resin Keepsake",
    price: 1500,
    sizePrices: {
      "Small": 1500,
      "Medium": 2000,
      "Large": 2500
     
    },
    image: "images/wedding resin.jpeg",
    description: "Preserve flowers and memories in resin.",
    custom: true
  },

  {
    id: 9,
    category: "resin",
    name: "Resin Necklace",
    price: 800,
    sizePrices: {
      "Small": 800,
      "Large": 1000
      
    },
    image: "images/necklace.jfif",
    description: "Custom resin necklace.",
    custom: true
  },

  {
    id: 10,
    category: "resin",
    name: "Floral Resin Jhumka",
    price: 1200,
    sizePrices: {
      "Small": 1200,
      "Medium": 1800,
      "Large": 2400,

    },
    image: "images/jhumka.jfif",
    description: "Floral custom jhumka for daily use in resin.",
    custom: true
  },

  {
    id: 11,
    category: "resin",
    name: "Resin Pendant Set",
    price: 1200,
    sizePrices: {
      "Small": 1200,
      "Medium": 1800
      
    },
    image: "images/Tops.jfif",
    description: "Beautiful handmade resin pendant set.",
    custom: true
  },

  {
    id: 12,
    category: "resin",
    name: "Resin Bracelet",
    price: 800,
    sizePrices: {
      "small": 800,
      "medium": 1200,
      "large": 1600,
      "extra large": 2000
    },
    image: "images/breslet.jfif",
    description: "Beautiful handmade resin bracelet.",
    custom: true
  },

  {
    id: 13,
    category: "resin",
    name: "Resin Rings",
    price: 800,
    sizePrices: {
      "small": 3500,
      
    },
    image: "images/rings.jfif",
    description: "Preserve flowers and memories in resin.",
    custom: true
  },

  {
    id: 14,
    category: "resin",
    name: "Resin Calligraphy",
    price: 3000,
    sizePrices: {
      "small": 3000,
      "medium": 4000,
      "large": 5000
    },
    image: "images/calligraphy.jfif",
    description: "Wall Hangings for Home Decor embedded in resin.",
    custom: true
  },
  {
    id: 28,
    category: "resin",
    name: "Resin Bangles",
    price: 400,
    sizePrices: {
      "small": 400,
      "medium": 500
      
    },
    image: "images/bangles.jfif",
    description: "Customize and  Preserve flowers and memories in resin.",
    custom: true
  },
  {
    id: 29,
    category: "resin",
    name: "Resin Wall Hanging",
    price: 3500,
    sizePrices: {
      "small": 3500,
      "medium": 5000,
      "large": 7000
    },
    image: "images/Wall art.jfif",
    description: "Preserve flowers and memories in resin.",
    custom: true
  },
  
];