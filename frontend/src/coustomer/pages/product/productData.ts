
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
  books: {
    title: "Books",
    subtitle: "Explore bestselling books, new releases, and timeless classics.",
  },

  grocery: {
    title: "Grocery",
    subtitle: "Daily essentials and pantry picks for your home.",
  },

  beauty: {
    title: "Beauty",
    subtitle: "Discover skincare, makeup, haircare, and personal care essentials.",
  },

  sports: {
    title: "Sports",
    subtitle: "Gear up with equipment, apparel, and essentials for every game.",
  },

  homeappliances: {
    title: "Home Appliances",
    subtitle: "Smart and reliable appliances to make everyday living easier.",
  },

  toys: {
    title: "Toys",
    subtitle: "Fun, creative, and exciting toys for kids of all ages.",
  },
};

export const getProductSection = (categoryId?: string): ProductSection => {
  const normalized = (categoryId || "fashion").toLowerCase();
  return catalog[normalized] || catalog.fashion;
};
