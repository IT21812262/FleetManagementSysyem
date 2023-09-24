import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function UniqueFuelstock() {
  const { id } = useParams();
  const [fuelstock, setFuelstock] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchFuelstockData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/fuel/get/${id}`);
          setFuelstock(response.data.fuelstock);
        }
      } catch (error) {
        alert('Error fetching fuel stock:', error.message);
      }
    };

    fetchFuelstockData();
  }, [id]);

  const handleSearchQ = (e) => {
    setSearchQ(e.target.value);
  };

  const fetchFuelstockDataBySearch = async () => {
    try {
      if (searchQ) {
        const response = await axios.get(`http://localhost:8411/fuel/get/${searchQ}`);
        setFuelstock(response.data.fuelstock);
      }
    } catch (error) {
      alert('Error fetching fuel stock:', error.message);
    }
  };

  const handleDelete = async (invoiceNo) => {
    try {
      await axios.delete(`http://localhost:8411/fuel/delete/${invoiceNo}`);
      alert('Fuel stock deleted successfully.');
      // Navigate to All Fuel stock page
      window.location.href = "/fuel/allFuelstock";
    } catch (error) {
      alert('Error deleting fuel stock:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFuelstockDataBySearch();
  };

  return (
    <div className="container">
      <h1>Unique Fuel Stock</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQ}
          onChange={handleSearchQ}
          placeholder="Enter Invoice No"
        />
        <button type="submit">Fetch Fuel Stock Data</button>
        <Link to="/fuel/allFuelstocks">
          <button type="button">Cancel</button>
        </Link>
      </form>

      {fuelstock ? (
        <ul>
          <li key={fuelstock.id}>

            Invoice No: {fuelstock.invoice_no}<br />
            Stocked Fuel Type: {fuelstock.stocked_fuel_type}<br />
            Stocked Fuel Quantity: {fuelstock.stocked_fuel_quantity}<br />
            Per Leter Cost: {fuelstock.per_leter_cost}<br />
            Total Cost: {fuelstock.total_cost}<br />
            Stocked Fuel Date: {fuelstock.stocked_fuel_date}<br />

            <button onClick={() => handleDelete(fuelstock.invoice_no)}>Delete Fuel Stock</button>
          </li>
        </ul>
      ) : (
        <p>No fuel stock found with the specified Invoice No.</p>
      )}

      {/* Link to All Fuel Stock page */}
     <Link to="/fuel/allfuelstocks">All Fuel Stoc</Link>
    </div>
  );
}
