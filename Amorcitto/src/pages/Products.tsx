import React, { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

const ProductList = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      {user?.role === 'admin' && (
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Add New Product
        </button>
      )}
      <table className="table-auto w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Price</th>
            {user?.role === 'admin' && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-2">Sample Product</td>
            <td className="px-4 py-2">$10.00</td>
            {user?.role === 'admin' && (
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
