import { useEffect, useState } from "react";
import Product from "../components/product";

export default function Home() {
  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((json) => setProductsInfo(json));
  }, []);

  const categoriesNames = [
    ...new Set(productsInfo.map((p) => p.category)),
  ];

  return (
    <div className="p-5">
      {categoriesNames.map((categoryName) => (
        <div key={categoryName} className="mb-10">
          <h2 className="text-2xl font-bold capitalize mb-4">
            {categoryName}
          </h2>

          <div className="flex gap-4 flex-wrap overflow-x-scroll snap-x scrollbar-hide">
            {productsInfo
              .filter((p) => p.category === categoryName)
              .map((productInfo) => (
                <Product
                  key={productInfo._id}
                  className="px-20"
                  {...productInfo}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
