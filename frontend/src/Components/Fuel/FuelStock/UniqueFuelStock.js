import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import "./UniqueFuelStock.css"; 

export default function UniqueFuelStock() {
  const { id } = useParams();
  const [fuel_stock, setFuelStock] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchFuelStockData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/fuel/fuel_stock/get/${id}`);
          setFuelStock(response.data.fuel_stock);
        }
      } catch (error) {
        alert('Error fetching fuel stock:', error.message);
      }
    };

    fetchFuelStockData();
  }, [id]);

  const handleSearchQ = (e) => {
    setSearchQ(e.target.value);
  };

  const fetchFuelStockDataBySearch = async () => {
    try {
      if (searchQ) {
        const response = await axios.get(`http://localhost:8411/fuel/fuel_stock/get/${searchQ}`);
        setFuelStock(response.data.fuel_stock);
      }
    } catch (error) {
      alert('Error fetching fuel stock:', error.message);
    }
  };

  const handleDelete = async (invoice_no) => {
    try {
      await axios.delete(`http://localhost:8411/fuel/fuel_stock/delete/${invoice_no}`);
      alert('Fuel stock deleted successfully.');
    } catch (error) {
      alert('Error deleting fuel stock:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFuelStockDataBySearch();
  };

  return (
    <div className="container">
      <h1>Unique FuelStock</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQ}
          onChange={handleSearchQ}
          placeholder="Enter Invoice No"
        />
        <button type="submit">Fetch Fuel Stock Data</button>
      </form>

      {fuel_stock ? (
        <ul>
          <li key={fuel_stock.id}>

            Invoice NO: {fuel_stock.invoice_no}<br />
            Stocked Fuel Type: {fuel_stock.stocked_fuel_type}<br />
            Stocked Fuel Quantity: {fuel_stock.stocked_fuel_quantity}<br />
            Per Leter Cost: {fuel_entry.per_leter_cost}<br />
            Total Cost: {fuel_stock.total_cost}<br />
            Stocked Fuel Date: {fuel_stock.stocked_fuel_date}<br />

            <button onClick={() => handleDelete(fuel_stock.invoice_no)}>Delete Fuel Stock</button>
          </li>
        </ul>
      ) : (
        <p>No fuel stock found with the specified ID.</p>
      )}

    </div>
  );
}
