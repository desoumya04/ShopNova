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
