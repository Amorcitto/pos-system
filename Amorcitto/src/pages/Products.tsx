// src/pages/Products.tsx
import React from 'react';

const ProductList = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Products</h1>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Sample Product</td>
            <td className="px-4 py-2">$10.00</td>
            <td className="px-4 py-2">
              <button className="bg-blue-500 text-white p-2 rounded">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
