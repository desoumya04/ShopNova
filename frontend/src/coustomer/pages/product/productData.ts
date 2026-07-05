export type ProductSeller = {
  businessDetails: {
    businessName: string;
    businessDescription: string;
  };
};

export type ProductItem = {
  productId: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  mrp: number;
  images: string[];
  seller: ProductSeller;
};

export type ProductSection = {
  title: string;
  subtitle: string;
  items: ProductItem[];
};

const createItem = (item: ProductItem): ProductItem => item;

const fashionImages = [
  "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/v/w/q/free-fandy-vivan-fab-unstitched-original-imahgzzh6vyqbzsw.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/z/e/i/free-satin-fendy-vivan-fab-unstitched-original-imahh5zrhh34dsxk.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/k/y/u/free-fandy-vivan-fab-unstitched-original-imahgzzhcsgycwqv.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/j/g/e/free-fandy-vivan-fab-unstitched-original-imahgzzh6nca7p72.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/2940/2940/xif0q/sari/u/g/e/free-satin-fendy-vivan-fab-unstitched-original-imahh5zrzg5wbe4e.jpeg?q=90",
];

const electronicsImages = [
  "https://rukminim2.flixcart.com/image/416/416/xif0q/laptop/x/n/m/-original-imah57q7th9q4w8b.jpeg?q=70",
  "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/f/e/q/-original-imahkur3wtwueumh.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/416/416/xif0q/television/h/h/2/-original-imahjf6yhzphyzcu.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/0/q/k/zeb-thunder-zebronics-original-imagxaq2wzqdzdzr.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/416/416/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=90",
];

const groceryImages = [
  "https://rukminim2.flixcart.com/image/416/416/xif0q/grocery/a/v/h/4-olive-oil-1-litre-1-cooking-oil-fortune-original-imagx3z6gffh4fgy.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/416/416/xif0q/grocery/r/g/w/2-basmati-rice-5-kg-1-rolled-gold-original-imagx7h7j7zvfk8a.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/416/416/xif0q/grocery/u/v/h/-original-imagzf4xqgqhzpnr.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/416/416/xif0q/grocery/x/y/1/tea-1-kg-1-tetley-original-imagzq5f4j7x4wzp.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/416/416/xif0q/grocery/j/m/u/-original-imagz6dz9f8t9vrr.jpeg?q=90",
];

const seller = (businessName: string, businessDescription: string): ProductSeller => ({
  businessDetails: {
    businessName,
    businessDescription,
  },
});

const fashionItems = [
  createItem({
    productId: "fashion-001",
    categoryId: "Fashion",
    title: "Pink Floral Patterned Saree",
    description: "Lightweight festive wear with a soft drape and rich border finish.",
    price: 1099,
    mrp: 1999,
    images: fashionImages,
    seller: seller("Pablo Fashions", "Occasion wear and statement sarees"),
  }),
  createItem({
    productId: "fashion-002",
    categoryId: "Fashion",
    title: "Cotton Kurti Set",
    description: "Daily wear kurti set with breathable fabric and relaxed fit.",
    price: 899,
    mrp: 1499,
    images: [fashionImages[0], fashionImages[2], fashionImages[4], fashionImages[1], fashionImages[3]],
    seller: seller("Urban Loom", "Everyday fashion essentials"),
  }),
  createItem({
    productId: "fashion-003",
    categoryId: "Fashion",
    title: "Printed Casual Shirt",
    description: "Smart casual shirt for office and weekend styling.",
    price: 799,
    mrp: 1299,
    images: [fashionImages[1], fashionImages[3], fashionImages[4], fashionImages[0], fashionImages[2]],
    seller: seller("Style Deck", "Modern clothing for men and women"),
  }),
];

const electronicsItems = [
  createItem({
    productId: "electronics-001",
    categoryId: "Laptop",
    title: "SlimBook Pro 14",
    description: "Portable laptop for work, classes, and streaming.",
    price: 54999,
    mrp: 68999,
    images: electronicsImages,
    seller: seller("Nova Tech", "Premium laptops and accessories"),
  }),
  createItem({
    productId: "electronics-002",
    categoryId: "Mobile",
    title: "Edge X5 5G Smartphone",
    description: "Fast 5G phone with a vibrant display and long battery backup.",
    price: 18999,
    mrp: 23999,
    images: [electronicsImages[1], electronicsImages[0], electronicsImages[2], electronicsImages[3], electronicsImages[4]],
    seller: seller("Pixel Cart", "Smartphones and mobile accessories"),
  }),
  createItem({
    productId: "electronics-003",
    categoryId: "TV",
    title: "Quantum 55 Inch 4K TV",
    description: "Big-screen entertainment with cinematic contrast and clear sound.",
    price: 42999,
    mrp: 55999,
    images: [electronicsImages[2], electronicsImages[0], electronicsImages[1], electronicsImages[3], electronicsImages[4]],
    seller: seller("Vision House", "Large display and home entertainment"),
  }),
  createItem({
    productId: "electronics-004",
    categoryId: "headphone",
    title: "Thunder Wireless Headset",
    description: "Comfortable over-ear headset with deep bass and mic support.",
    price: 1499,
    mrp: 2499,
    images: [electronicsImages[3], electronicsImages[0], electronicsImages[1], electronicsImages[2], electronicsImages[4]],
    seller: seller("Beat Vault", "Audio gear for music and work"),
  }),
  createItem({
    productId: "electronics-005",
    categoryId: "Camera",
    title: "EOS R100 Creator Kit",
    description: "Starter DSLR kit for photos, reels, and content creation.",
    price: 46999,
    mrp: 58999,
    images: [electronicsImages[4], electronicsImages[0], electronicsImages[1], electronicsImages[2], electronicsImages[3]],
    seller: seller("Frame Studio", "Cameras and creator tools"),
  }),
];

const groceryItems = [
  createItem({
    productId: "grocery-001",
    categoryId: "Grocery",
    title: "Fortune Olive Oil",
    description: "Healthy cooking oil for everyday meals and salads.",
    price: 499,
    mrp: 699,
    images: groceryImages,
    seller: seller("Daily Basket", "Pantry and kitchen staples"),
  }),
  createItem({
    productId: "grocery-002",
    categoryId: "Grocery",
    title: "Basmati Rice 5 Kg",
    description: "Fragrant rice pack for family meals and special occasions.",
    price: 699,
    mrp: 899,
    images: [groceryImages[1], groceryImages[0], groceryImages[2], groceryImages[3], groceryImages[4]],
    seller: seller("Pantry Pro", "Grocery essentials delivered fresh"),
  }),
  createItem({
    productId: "grocery-003",
    categoryId: "Grocery",
    title: "Dry Fruit Mix",
    description: "Snack pack with almonds, cashews, and raisins.",
    price: 399,
    mrp: 599,
    images: [groceryImages[2], groceryImages[1], groceryImages[0], groceryImages[3], groceryImages[4]],
    seller: seller("Green Mart", "Healthy food and snacks"),
  }),
];

const catalog: Record<string, ProductSection> = {
  electronics: {
    title: "Electronics",
    subtitle: "Top picks across laptops, mobiles, audio, and entertainment.",
    items: electronicsItems,
  },
  fashion: {
    title: "Fashion",
    subtitle: "Fresh styles for everyday wear and special occasions.",
    items: fashionItems,
  },
  grocery: {
    title: "Grocery",
    subtitle: "Daily essentials and pantry picks for your home.",
    items: groceryItems,
  },
  laptop: {
    title: "Laptops",
    subtitle: "Portable and powerful machines for work and study.",
    items: [electronicsItems[0]],
  },
  mobile: {
    title: "Mobiles",
    subtitle: "Phones with modern features and long battery life.",
    items: [electronicsItems[1]],
  },
  tv: {
    title: "TV",
    subtitle: "Big-screen entertainment for your living room.",
    items: [electronicsItems[2]],
  },
  headphone: {
    title: "Headphones",
    subtitle: "Wireless and wired audio for music, calls, and gaming.",
    items: [electronicsItems[3]],
  },
  camera: {
    title: "Camera",
    subtitle: "Creator tools for photos, video, and content work.",
    items: [electronicsItems[4]],
  },
};

export const getProductSection = (categoryId?: string): ProductSection => {
  const normalized = (categoryId || "fashion").toLowerCase();
  return catalog[normalized] || catalog.fashion;
};
