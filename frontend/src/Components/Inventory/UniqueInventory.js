// UniqueInventory 


// import "./UniqueInventory.css"; // Import the CSS file
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function UniqueInventory() {
  const { id } = useParams();
  console.log("Received ID:", id);
//  const { inventoryData } = location.state; // Access the inventoryData from location.state

  const [inventory, setInventory] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/inventory/get/${id}`);
          console.log("API Response:", response.data);
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

  // Function to handle deletion of an inventory item
const handleDelete = (itemId) => {
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm("Do you want to delete the item?");
  
    if (userConfirmed) {
      // User clicked "OK," proceed with deletion
      deleteItem(itemId);
    } else {
      // User clicked "Cancel," do nothing
    }
  };
  
  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8411/inventory/delete/${itemId}`);
      alert('Item deleted successfully.');
      // Navigate to All Inventory page
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
    <div className="container">
      <h1>Unique Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQ}
          onChange={handleSearchQ}
          placeholder="Enter Product ID"
        />
        <button type="submit">Fetch Product Data</button>
        &nbsp;&nbsp;&nbsp;

        <Link to="/inventory/allInventory">
          <button className="cancel-button" type="button">Cancel</button>
        </Link>
      </form>

      {inventory ? (
        <div className="product-box">
        <div className="product-detail">
          <strong>Product ID:</strong> {inventory.pid}
        </div>
        <div className="product-detail">
          <strong>Product Type:</strong> {inventory.type}
        </div>
        <div className="product-detail">
          <strong>Product Name:</strong> {inventory.name}
        </div>
        <div className="product-detail">
          <strong>Product Brand:</strong> {inventory.brand}
        </div>
        <div className="product-detail">
          <strong>Quantity:</strong> {inventory.qty}
        </div>
        <div className="product-detail">
          <strong>Unit Price:</strong> {inventory.unit_price}
        </div>
        <div className="product-detail">
          <strong>Size:</strong> {inventory.size}
        </div>
        <div className="product-detail">
          <strong>Voltage:</strong> {inventory.voltage}
        </div>
        <div className="product-detail">
          <strong>Ampiers:</strong> {inventory.amp_hrs}
        </div>
        <div className="product-detail">
          <strong>Manufactured Date:</strong> {inventory.man_date}
        </div>
        <div className="product-detail">
          <strong>Expiry Date:</strong> {inventory.exp_date}
        </div>
        <div className="product-detail">
          <strong>Vehicle Brand and Model:</strong> {inventory.vehicle_brand_and_model}
        </div>
        <div className="product-detail">
          <strong>Vehicle Manufacture Year:</strong> {inventory.vehicle_man_year}
        </div>
        <div className="product-detail">
          <strong>Reorder Level:</strong> {inventory.reorder_level}
        </div>
        
        <button type="button" onClick={() => handleDelete(inventory.pid)}>Delete Item</button>
      </div>
      ) : (
        <p>No Item found with the specified ID.</p>
      )}

      {/* Link to All Products page */}
     <Link to="/inventory/allInventory">
     <button className="dashboard-button">Back To DASHBOARD</button></Link>
    </div>
  );
}