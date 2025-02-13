import React, { useEffect, useState } from "react";
import { getProducts } from "../utils/firestore";

const ProductList = () => {
  const [products, setProducts] = useState<{ id: string; name: string; price: number }[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
