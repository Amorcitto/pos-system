// src/pages/sales/SalesReport.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


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
  const [filters, setFilters] = useState({
    date: "",
    name: "",
    minTotal: "",
    maxTotal: ""
  });
  const [open, setOpen] = useState(false);

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
    let result = [...sales];

    if (filters.date) {
      const selected = new Date(filters.date).toDateString();
      result = result.filter(sale => new Date(sale.timestamp).toDateString() === selected);
    }

    if (filters.name) {
      result = result.filter(sale => sale.name.toLowerCase().includes(filters.name.toLowerCase()));
    }

    if (filters.minTotal) {
      result = result.filter(sale => sale.total >= Number(filters.minTotal));
    }

    if (filters.maxTotal) {
      result = result.filter(sale => sale.total <= Number(filters.maxTotal));
    }

    setFilteredSales(result);
    setOpen(false);
  };
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["Product", "Quantity", "Total", "Date"]],
      body: filteredSales.map((sale) => [
        sale.name,
        sale.quantity,
        `$${sale.total.toFixed(2)}`,
        new Date(sale.timestamp).toLocaleString(),
      ]),
    });
    doc.save("sales-report.pdf");
  };
  
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredSales.map((sale) => ({
        Product: sale.name,
        Quantity: sale.quantity,
        Total: sale.total,
        Date: new Date(sale.timestamp).toLocaleString(),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "sales-report.xlsx");
  };
  
  const handlePrint = () => {
    window.print();
  };
  

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">📊 Sales Reports</Typography>

      <Button variant="outlined" onClick={() => setOpen(true)}>Open Filters</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Filter Sales</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            fullWidth
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
          <TextField
            fullWidth
            label="Product Name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Min Total"
            type="number"
            value={filters.minTotal}
            onChange={(e) => setFilters({ ...filters, minTotal: e.target.value })}
          />
          <TextField
            fullWidth
            label="Max Total"
            type="number"
            value={filters.maxTotal}
            onChange={(e) => setFilters({ ...filters, maxTotal: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleFilter}>Apply</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} className="mt-4">
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
      {/*Export & Print buttons*/}
      <div className="flex gap-4 mt-6">
        <Button variant="contained" color="primary" onClick={exportPDF}>Export PDF</Button>
        <Button variant="contained" color="secondary" onClick={exportExcel}>Export Excel</Button>
        <Button variant="contained" color="default" onClick={handlePrint}>Print</Button>
        </div>
    </div>
  );
};

export default SalesReport;
