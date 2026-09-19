
import HomecategoryCard from "./homecategoryCard";

const dummyCategories = [
  {
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg",
    name: "Books",
    categoryId: "BOOKS"
  },
  {
    image: "https://images.pexels.com/photos/1682821/pexels-photo-1682821.jpeg", 
    name: "Electronics",
    categoryId: "ELECTRONICS"
  },
  {
    image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg", 
    name: "Fashion",
    categoryId: "FASHION"
  },
  {
    image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg", 
    name: "Grocery",
    categoryId: "GROCERY"
  },
  {
    image: "https://images.pexels.com/photos/3373715/pexels-photo-3373715.jpeg", 
    name: "Beauty",
    categoryId: "BEAUTY"
  },
  {
    image: "https://images.pexels.com/photos/1010973/pexels-photo-1010973.jpeg", 
    name: "Sports",
    categoryId: "SPORTS"
  },
  {
    image: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", 
    name: "Home Appliances",
    categoryId: "HOMEAPPLIANCES"
  },
  {
    image: "https://images.pexels.com/photos/255514/pexels-photo-255514.jpeg", 
    name: "Toys",
    categoryId: "TOYS"
  },
];

const homecategory = () => {
  return (
    <div className="flex justify-center gap-7 flex-wrap">
      {dummyCategories.map((item, index) => (
        <HomecategoryCard
          key={index}
          item={item}
        />
      ))}
    </div>
  );
};

export default homecategory;
