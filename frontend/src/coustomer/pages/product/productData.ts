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





const catalog: Record<string, ProductSection> = {
  electronics: {
    title: "Electronics",
    subtitle: "Top picks across laptops, mobiles, audio, and entertainment."
  },
  fashion: {
    title: "Fashion",
    subtitle: "Fresh styles for everyday wear and special occasions." 
  },
  grocery: {
    title: "Grocery",
    subtitle: "Daily essentials and pantry picks for your home." 
  },
  laptop: {
    title: "Laptops",
    subtitle: "Portable and powerful machines for work and study.",
  },
  mobile: {
    title: "Mobiles",
    subtitle: "Phones with modern features and long battery life.",
  },
  tv: {
    title: "TV",
    subtitle: "Big-screen entertainment for your living room.",   
  },
  headphone: {
    title: "Headphones",
    subtitle: "Wireless and wired audio for music, calls, and gaming.", 
  },
  camera: {
    title: "Camera",
    subtitle: "Creator tools for photos, video, and content work.",
  },
};

export const getProductSection = (categoryId?: string): ProductSection => {
  const normalized = (categoryId || "fashion").toLowerCase();
  return catalog[normalized] || catalog.fashion;
};
