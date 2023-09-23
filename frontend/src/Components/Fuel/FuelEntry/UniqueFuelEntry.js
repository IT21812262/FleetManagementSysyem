import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import "./UniqueFuelEntry.css"; 

export default function UniqueFuelEntry() {
  const { id } = useParams();
  const [fuel_entry, setFuel_Entry] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchFuelEntryData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/fuel/fuel_entry/get/${id}`);
          setFuel_Entry(response.data.fuel_entry);
        }
      } catch (error) {
        alert('Error fetching fuel entry:', error.message);
      }
    };

    fetchFuelEntryData();
  }, [id]);

  const handleSearchQ = (e) => {
    setSearchQ(e.target.value);
  };

  const fetchFuelEntryDataBySearch = async () => {
    try {
      if (searchQ) {
        const response = await axios.get(`http://localhost:8411/fuel/fuel_entry/get/${searchQ}`);
        setFuel_Entry(response.data.fuel_entry);
      }
    } catch (error) {
      alert('Error fetching fuel entry:', error.message);
    }
  };

  const handleDelete = async (vehicle_id) => {
    try {
      await axios.delete(`http://localhost:8411/fuel/fuel_entry/delete/${vehicle_id}`);
      alert('Fuel entry deleted successfully.');
    } catch (error) {
      alert('Error deleting fuel entry:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFuelEntryDataBySearch();
  };

  return (
    <div className="container">
      <h1>Unique FuelEntry</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQ}
          onChange={handleSearchQ}
          placeholder="Enter Vehicle ID"
        />
        <button type="submit">Fetch Fuel Entry Data</button>
      </form>

      {fuel_entry ? (
        <ul>
          <li key={supplier.id}>

            Vehicle ID: {fuel_entry.vehicle_id}<br />
            Fuel Date: {fuel_entry.fuel_date}<br />
            Fuel Type: {fuel_entry.fuel_type}<br />
            Fuel Quantity: {fuel_entry.fuel_quantity}<br />
            Fuel Cost: {fuel_entry.fuel_cost}<br />
            Vehicle Milage: {fuel_entry.vehicle_milage}<br />

            <button onClick={() => handleDelete(fuel_entry.vehicle_id)}>Delete FuelEntry</button>
          </li>
        </ul>
      ) : (
        <p>No fuel entry found with the specified ID.</p>
      )}

    </div>
  );
}
