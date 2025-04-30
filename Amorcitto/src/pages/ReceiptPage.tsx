// src/pages/ReceiptPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ReceiptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state?.receipt;

  if (!receipt) {
    return <div className="p-10 text-center">No receipt found. Go back to POS.</div>;
  }

  return (
    <div className= "print-area, max-w-md mx-auto bg-white shadow p-6 mt-8 rounded">
      <h1 className="text-2xl font-bold text-center mb-4">🧾 Receipt</h1>
      <p className="text-sm text-gray-600 mb-2">Store: Amorcitto Retail</p>
      <p className="text-sm text-gray-600 mb-2">Cashier: {receipt.cashier}</p>
      <p className="text-sm text-gray-600 mb-2">Date: {new Date(receipt.date).toLocaleString()}</p>

      <ul className="divide-y my-4">
        {receipt.items.map((item: any) => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <p className="text-right font-semibold text-lg mt-4">
        Total: ${receipt.total.toFixed(2)}
      </p>

      <div className="mt-6 flex justify-between">
        <Button onClick={() => window.print()} variant="outlined">🖨️ Print</Button>
        <Button onClick={() => navigate("/cashier")} variant="contained" color="primary">New Sale</Button>
      </div>
    </div>
  );
};

export default ReceiptPage;
