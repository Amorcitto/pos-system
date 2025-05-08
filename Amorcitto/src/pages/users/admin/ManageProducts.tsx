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
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { getProducts, updateProduct } from "../../../utils/firestore";

const ManageProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editing, setEditing] = useState<{ [key: string]: any }>({});
  const [notification, setNotification] = useState<null | { type: "success" | "error"; message: string }>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByStock, setSortByStock] = useState(false);

  const fetchProducts = async () => {
    try {
      const querySnap = await getDocs(collection(db, "products"));
      const items = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    } catch (err) {
      setNotification({ type: "error", message: "Failed to load products." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
      setNotification({ type: "success", message: "Product deleted." });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to delete." });
    }
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
      setNotification({ type: "success", message: "Product updated." });
    } catch (error) {
      console.error("Error updating product: ", error);
      setNotification({ type: "error", message: "Update failed." });
    }
  };

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortByStock ? a.stock - b.stock : 0
    );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">
        🛠️ Manage Products
      </Typography>

      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <Link to="/admin/add-product">
          <Button variant="contained" color="primary">
            ➕ Add New Product
          </Button>
        </Link>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button variant="outlined" onClick={() => setSortByStock((prev) => !prev)}>
          {sortByStock ? "Unsort Stock" : "Sort by Stock"}
        </Button>
      </div>

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
            {filteredProducts.map((prod) => (
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

      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {notification && (
          <Alert severity={notification.type}>{notification.message}</Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default ManageProducts;
