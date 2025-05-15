// src/pages/customers/LoyaltyStats.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  Card, CardContent, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, TableContainer
} from "@mui/material";

interface Customer {
  id: string;
  name: string;
  email: string;
  loyaltyPoints: number;
}

const LoyaltyStats = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const snapshot = await getDocs(collection(db, "customers"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Customer[];

      setCustomers(list);
    };

    fetchCustomers();
  }, []);

  const topCustomers = [...customers]
    .sort((a, b) => b.loyaltyPoints - a.loyaltyPoints)
    .slice(0, 5);

  const totalPoints = customers.reduce((acc, c) => acc + (c.loyaltyPoints || 0), 0);

  return (
    <div className="p-6 space-y-6">
      <Typography variant="h5">🎖️ Loyalty Stats</Typography>

      <Card>
        <CardContent>
          <Typography variant="subtitle1">Total Loyalty Points Across Customers:</Typography>
          <Typography variant="h6">{totalPoints}</Typography>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Loyalty Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topCustomers.map(cust => (
              <TableRow key={cust.id}>
                <TableCell>{cust.name}</TableCell>
                <TableCell>{cust.email}</TableCell>
                <TableCell>{cust.loyaltyPoints || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LoyaltyStats;
