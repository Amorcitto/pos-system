// src/pages/users/admin/ManageProducts.tsx
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getProducts, updateProduct } from "../../../utils/firestore";

const ManageProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editing, setEditing] = useState<{ [key: string]: any }>({});

  const fetchProducts = async () => {
    const querySnap = await getDocs(collection(db, "products"));
    const items = querySnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(items);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleChange = (id: string, field: string, value: string | number) => {
    setEditing((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = async (id: string) => {
    try {
      await updateProduct(id, editing[id]);
      setProducts((prev) =>
        prev.map((prod) => (prod.id === id ? { ...prod, ...editing[id] } : prod))
      );
      setEditing((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">
        🛠️ Manage Products
      </Typography>

      <Link to="/admin/add-product">
        <Button variant="contained" color="primary" className="mb-4">
          ➕ Add New Product
        </Button>
      </Link>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell>{prod.name}</TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={editing[prod.id]?.price ?? prod.price}
                    onChange={(e) =>
                      handleChange(prod.id, "price", Number(e.target.value))
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    value={editing[prod.id]?.stock ?? prod.stock}
                    onChange={(e) =>
                      handleChange(prod.id, "stock", Number(e.target.value))
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(prod.id)}
                  >
                    Delete
                  </Button>

                  {editing[prod.id] && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(prod.id)}
                      className="ml-2"
                    >
                      Save
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageProducts;
