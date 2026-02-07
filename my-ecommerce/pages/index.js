import { useState } from "react";
import Product from "../components/product";
import { initMongoose } from "@/lib/mongoose";
import ProductModel from "@/models/Product";

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");

  let filteredProducts = products;

  if (phrase) {
    filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(phrase.toLowerCase())
    );
  }

  const categoriesNames = [
    ...new Set(filteredProducts.map((p) => p.category)),
  ];

  return (
    

    
    <layout>
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl mb-6"
      />

      <div>
        {categoriesNames.map((categoryName) => (
          <div key={categoryName} className="mb-10">
            {filteredProducts.find(
              (p) => p.category === categoryName
            ) && (
              <div>
                <h2 className="text-2xl font-bold capitalize mb-4">
                  {categoryName}
                </h2>

                <div className="flex gap-4 flex-wrap overflow-x-scroll snap-x scrollbar-hide">
                  {filteredProducts
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
            )}
          </div>
        ))}
      </div>
      
    </layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();

  const products = await ProductModel.find().exec();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
