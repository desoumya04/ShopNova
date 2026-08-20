/**
 * Maps each category name (as stored in DB) to a list of allowed product names.
 * This is the single source of truth for category-scoped product names.
 * Add / remove entries here to update both AddProduct and EditProduct forms.
 */
export const CATEGORY_PRODUCT_NAMES: Record<string, string[]> = {
  Electronics: [
    "Smartphone", "Laptop", "Tablet", "Smart TV", "Desktop Computer",
    "Monitor", "Keyboard", "Mouse", "Headphones", "Earbuds", "Speaker",
    "Smartwatch", "Camera", "Printer", "Router", "External Hard Drive",
    "Pen Drive", "Gaming Console", "Projector", "Electric Fan",
  ],
  Fashion: [
    "T-Shirt", "Shirt", "Jeans", "Trousers", "Jacket", "Coat", "Dress",
    "Saree", "Kurta", "Lehenga", "Skirt", "Shorts", "Hoodie", "Sweater",
    "Sneakers", "Sandals", "Formal Shoes", "Boots", "Handbag", "Backpack",
    "Belt", "Sunglasses", "Cap", "Scarf", "Watch",
  ],
  Books: [
    "Fiction Novel", "Non-Fiction Book", "Textbook", "Self-Help Book",
    "Biography", "Children's Book", "Comic Book", "Graphic Novel", "Cookbook",
    "Travel Guide", "History Book", "Science Book", "Programming Book",
    "Business Book", "Poetry Collection",
  ],
  Grocery: [
    "Rice", "Wheat Flour", "Sugar", "Salt", "Cooking Oil", "Dal / Lentils",
    "Spices", "Tea", "Coffee", "Biscuits", "Chips / Snacks", "Noodles",
    "Pasta", "Jam", "Honey", "Milk Powder", "Ghee", "Packaged Water",
    "Fruit Juice", "Cereal",
  ],
  Beauty: [
    "Face Cream", "Sunscreen", "Foundation", "Lipstick", "Mascara",
    "Eyeshadow", "Eyeliner", "Blush", "Face Wash", "Shampoo", "Conditioner",
    "Hair Oil", "Body Lotion", "Perfume", "Nail Polish", "Serum", "Toner",
    "Moisturizer", "Face Mask", "Deodorant",
  ],
  Sports: [
    "Cricket Bat", "Cricket Ball", "Football", "Basketball", "Volleyball",
    "Tennis Racket", "Badminton Racket", "Yoga Mat", "Dumbbells",
    "Resistance Bands", "Treadmill", "Cycling Helmet", "Cycling Gloves",
    "Swimming Goggles", "Running Shoes", "Sports Jersey", "Skipping Rope",
    "Boxing Gloves", "Gym Bag", "Water Bottle",
  ],
  Toys: [
    "Action Figure", "Doll", "Board Game", "Puzzle", "Building Blocks",
    "Remote Control Car", "Soft Toy / Stuffed Animal", "Toy Train Set",
    "Play Kitchen Set", "Drawing & Painting Kit", "Science Kit",
    "Musical Toy", "Fidget Spinner", "Kite", "Frisbee", "Tricycle",
    "Scooter", "Water Gun", "Crayon Set", "Clay / Playdough",
  ],
  "Home Appliances": [
    "Washing Machine", "Refrigerator", "Microwave Oven", "Air Conditioner",
    "Ceiling Fan", "Room Heater", "Water Purifier", "Vacuum Cleaner",
    "Dishwasher", "Mixer Grinder", "Blender", "Juicer", "Electric Kettle",
    "Toaster", "Iron", "Air Purifier", "Induction Cooktop", "Gas Stove",
    "Water Dispenser", "Geyser / Water Heater",
  ],
};
