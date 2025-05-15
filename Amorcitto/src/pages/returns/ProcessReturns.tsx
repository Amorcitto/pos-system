// src/pages/returns/ProcessReturn.tsx
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Checkbox, Snackbar, Alert
} from "@mui/material";

interface Sale {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
  customerId?: string;
}

const ProcessReturn = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filtered, setFiltered] = useState<Sale[]>([]);
  const [selectedSales, setSelectedSales] = useState<string[]>([]);
  const [notification, setNotification] = useState<null | { type: "success" | "error"; message: string }>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getDocs(collection(db, "sales")).then(snapshot => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Sale[];
      setSales(list);
      setFiltered(list);
    });
  }, []);

  const handleSearch = () => {
    setFiltered(
      sales.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.customerId?.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const toggleSelect = (id: string) => {
    setSelectedSales(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleProcessReturn = async () => {
    try {
      for (const id of selectedSales) {
        const sale = sales.find(s => s.id === id);
        if (!sale) continue;

        // 1. Update stock
        const productRef = doc(db, "products", sale.productId);
        await updateDoc(productRef, { stock: sale.quantity });

        // 2. Adjust customer points (optional)
        if (sale.customerId) {
          const custRef = doc(db, "customers", sale.customerId);
          const pointsToRemove = Math.floor((sale.total || 0) / 10);
          await updateDoc(custRef, {
            loyaltyPoints: -pointsToRemove
          });
        }

        // 3. Log return
        await addDoc(collection(db, "returns"), {
          ...sale,
          returnDate: new Date().toISOString(),
          refunded: sale.total,
        });
      }

      setNotification({ type: "success", message: "Return processed successfully" });
      setSelectedSales([]);
    } catch (err) {
      setNotification({ type: "error", message: "Failed to process return" });
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">↩️ Return Processing</Typography>

      <div className="flex gap-2 mb-4">
        <TextField
          label="Search by customer/product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outlined" onClick={handleSearch}>Search</Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedSales.includes(s.id)}
                    onChange={() => toggleSelect(s.id)}
                  />
                </TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.quantity}</TableCell>
                <TableCell>${s.total}</TableCell>
                <TableCell>{new Date(s.timestamp).toLocaleString()}</TableCell>
                <TableCell>{s.customerId || "Walk-in"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedSales.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          className="mt-4"
          onClick={handleProcessReturn}
        >
          Process Return ({selectedSales.length})
        </Button>
      )}

      <Snackbar open={!!notification} autoHideDuration={3000} onClose={() => setNotification(null)}>
        {notification && <Alert severity={notification.type}>{notification.message}</Alert>}
      </Snackbar>
    </div>
  );
};

export default ProcessReturn;
