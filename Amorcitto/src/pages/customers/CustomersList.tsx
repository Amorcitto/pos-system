// src/pages/customers/CustomersList.tsx
import { useEffect, useState } from "react";
import { getCustomers } from "../../utils/firestore";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Typography, Paper, TableContainer, TextField
} from "@mui/material";

const CustomersList = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCustomers().then((data) => {
      // Optional: sort by name
      const sorted = data.sort((a: any, b: any) => a.name.localeCompare(b.name));
      setCustomers(sorted);
    });
  }, []);

  const filtered = customers.filter((cust) =>
    cust.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">👥 Registered Customers</Typography>

      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Loyalty Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" className="text-gray-500">
                  No matching customers found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((cust) => (
                <TableRow key={cust.id}>
                  <TableCell>{cust.name}</TableCell>
                  <TableCell>{cust.email}</TableCell>
                  <TableCell>{cust.phone}</TableCell>
                  <TableCell>{cust.customerId}</TableCell>
                  <TableCell>{cust.loyaltyPoints || 0}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomersList;
