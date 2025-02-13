import React, { useContext } from "react";
import { CartContext } from "../store/CartContext";

const CartPage = () => {
  const { cart } = useContext(CartContext)!;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Product</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">${item.price.toFixed(2)}</td>
                <td className="border p-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartPage;
