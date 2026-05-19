import React from "react";
import HomecategoryCard from "./homecategoryCard";

const homecategory = () => {
  return (
    <div className="flex justify-center gap-7 flex-wrap">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1].map((item) => (
        <HomecategoryCard
          item={{
            image: "https://rukminim2.flixcart.com/image/720/720/krf91u80/table-lamp/8/q/m/classic-designer-foziqtl-0033202193-foziq-original-imag58yure9ph2rh.jpeg?q=90",
            name: "lamp",
          }}
        />
      ))}
    </div>
  );
};

export default homecategory;
