// src/pages/sales/SalesReport.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, TextField, Button
} from "@mui/material";

interface Sale {
  id: string;
  name: string;
  quantity: number;
  total: number;
  timestamp: string;
}

const SalesReport = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      const snapshot = await getDocs(collection(db, "sales"));
      const allSales = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Sale[];

      setSales(allSales);
      setFilteredSales(allSales);
    };

    fetchSales();
  }, []);

  const handleFilter = () => {
    if (!date) {
      setFilteredSales(sales);
      return;
    }

    const selected = new Date(date).toDateString();

    const filtered = sales.filter((sale) =>
      new Date(sale.timestamp).toDateString() === selected
    );
    setFilteredSales(filtered);
  };

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">📊 Sales Report</Typography>

      <div className="mb-4 flex gap-2">
        <TextField
          type="date"
          label="Filter by Date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.name}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>${sale.total.toFixed(2)}</TableCell>
                <TableCell>{new Date(sale.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SalesReport;
