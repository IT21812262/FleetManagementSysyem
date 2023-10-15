import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useParams, Link } from "react-router-dom";
import "./UniqueInventory.css";

export default function UniqueInventory() {
  const { id } = useParams();
  const [inventory, setInventory] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/inventory/get/${id}`);
          setInventory(response.data.inventory);
        }
      } catch (error) {
        alert('Error fetching inventory:', error.message);
      }
    };

    fetchInventoryData();
  }, [id]);

  const handleSearchQ = (e) => {
    setSearchQ(e.target.value);
  };

  const fetchInventoryDataBySearch = async () => {
    try {
      if (searchQ) {
        const response = await axios.get(`http://localhost:8411/inventory/get/${searchQ}`);
        setInventory(response.data.inventory);
      }
    } catch (error) {
      alert('Error fetching item:', error.message);
    }
  };

  const handleDelete = (itemId) => {
    const userConfirmed = window.confirm("Do you want to delete the item?");
    if (userConfirmed) {
      deleteItem(itemId);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8411/inventory/delete/${itemId}`);
      alert('Item deleted successfully.');
      window.location.href = "/inventory/allInventory";
    } catch (error) {
      alert('Error deleting item:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchInventoryDataBySearch();
  };

  return (
    <Box m="20px">
      <h1>Unique Product</h1>

      <form onSubmit={handleSubmit}>
        <TextField 
          value={searchQ} 
          onChange={handleSearchQ}
          label="Enter Product ID"
          fullWidth
        />
        <Box mt="20px">
          <Button type="submit" color="primary" variant="contained">
            Fetch Product Data
          </Button>
          <Button component={Link} to="/inventory/allInventory" color="secondary" variant="contained" style={{ marginLeft: '15px' }}>
            Cancel
          </Button>
        </Box>
      </form>

      {inventory ? (
        <Box className="product-box-g22" mt="20px">
          {/* Map through inventory properties to create a UI like the UniqueFuelStock */}
          <Box display="flex" flexDirection="column" gap="20px">
            {/* Assuming you want a similar style of display as UniqueFuelstock */}
            {/* You may need to modify this to match exactly what you want */}
            {Object.entries(inventory).map(([key, value]) => (
              <Box key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </Box>
            ))}
          </Box>
          <Box mt="20px">
            <Button color="error" variant="contained" onClick={() => handleDelete(inventory.pid)}>
              Delete Item
            </Button>
          </Box>
        </Box>
      ) : (
        <p>No Item found with the specified ID.</p>
      )}

      <Box mt="20px">
        <Button component={Link} to="/inventory/allInventory" variant="contained">
          Back To DASHBOARD
        </Button>
      </Box>
    </Box>
  );
}
