// 1. Customers List Page - src/pages/customers/CustomersList.tsx
import { useEffect, useState } from "react";
import { getCustomers } from "../../utils/firestore";
import { TextField, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from "@mui/material";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints?: number;
}

const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">👥 Customers List</Typography>
      <TextField fullWidth label="Search by name" value={search} onChange={e => setSearch(e.target.value)} className="mb-4" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Loyalty Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{c.loyaltyPoints ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomersList;
