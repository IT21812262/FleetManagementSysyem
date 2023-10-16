import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

const UniqueSupplier = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/supplier/get/${id}`);
          setSupplier(response.data.supplier);
        }
      } catch (error) {
        alert('Error fetching supplier:', error.message);
      }
    };

    fetchSupplierData();
  }, [id]);

  const fetchSupplierDataBySearch = async () => {
    try {
      if (searchQ) {
        const response = await axios.get(`http://localhost:8411/supplier/get/${searchQ}`);
        setSupplier(response.data.supplier);
      }
    } catch (error) {
      alert('Error fetching supplier:', error.message);
    }
  };

  const handleDelete = async (supplierId) => {
    try {
      await axios.delete(`http://localhost:8411/supplier/delete/${supplierId}`);
      alert('Supplier deleted successfully.');
      // Navigate to All Suppliers page
      window.location.href = "/supplier/supplierdata";
    } catch (error) {
      alert('Error deleting supplier:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSupplierDataBySearch();
  };

  const navigate = useNavigate();

  // Use navigate function to programmatically navigate to a different route
  const handleCancelClick = () => {
    navigate('/supplier/supplierdata');
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2}>
        Unique Supplier
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box mt={2}>
          <TextField
            fullWidth
            variant="filled"
            label="Enter Supplier ID"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button type="submit" color="primary" variant="contained">Fetch Supplier Data</Button>
          <Button type="button" color="secondary" variant="contained" onClick={handleCancelClick}>Cancel</Button>
        </Box>

        {supplier && (
          <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
            <Grid container spacing={4}>
  <Grid item xs={3}>
    <List>
      <ListItem>
        <ListItemText primary="Supplier ID" secondary={supplier.supplier_id} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Supplier Name" secondary={supplier.supplier_name} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Phone Number" secondary={supplier.phone_number} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Supplier Position" secondary={supplier.supplier_possition} />
      </ListItem>
    </List>
  </Grid>
  
  <Grid item xs={3}>
    <List>
      <ListItem>
        <ListItemText primary="Email" secondary={supplier.email} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Company Name" secondary={supplier.company_name} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item Type" secondary={supplier.item_type} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item Size" secondary={supplier.item_size} />
      </ListItem>
    </List>
  </Grid>
  
  <Grid item xs={3}>
    <List>
      <ListItem>
        <ListItemText primary="Item Code" secondary={supplier.item_code} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Brand" secondary={supplier.brand} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Quantity" secondary={supplier.quntity} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Unit Price" secondary={supplier.unit_price} />
      </ListItem>
    </List>
  </Grid>
  
  <Grid item xs={3}>
    <List>
      <ListItem>
        <ListItemText primary="Total Price" secondary={(parseFloat(supplier.quntity) * parseFloat(supplier.unit_price)).toFixed(2)} />
      </ListItem>
      <ListItem>
  <ListItemText 
    primary="Ordered Date" 
    secondary={
      new Date(supplier.orderd_date).toISOString().split('T')[0]
    } 
  />
</ListItem>

<ListItem>
  <ListItemText 
    primary="Manufactured Date" 
    secondary={
      new Date(supplier.manufatured_date).toISOString().split('T')[0]
    } 
  />
</ListItem>
      <ListItem>
        <ListItemText primary="Invoice No" secondary={supplier.invoice_number} />
      </ListItem>
    </List>
  </Grid>
  
</Grid>

            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => handleDelete(supplier.supplier_id)}
            >
              Delete Supplier
            </Button>
          </Paper>
        )}
      </form>

      {!supplier && (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
          No supplier found with the specified ID.
        </Typography>
      )}

      <Box mt={3}>
        <Button variant="text" color="primary" onClick={handleCancelClick}>
          All Suppliers
        </Button>
      </Box>
    </Box>
  );
};

export default UniqueSupplier;
