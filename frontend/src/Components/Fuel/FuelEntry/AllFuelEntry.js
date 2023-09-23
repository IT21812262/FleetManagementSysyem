import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllFuelEntry.css";


export default function AllFuelEntry() {

  const [fuel_entry, setFuelEntry] = useState([]);

  useEffect(() => {
    const getFuelEntry = async () => {
      try {
        const response = await axios.get('http://localhost:8411/fuel/fuel_entry');
        setFuelEntry(response.data);
      } catch (error) {
        alert('Error fetching fuel entry:', error.message);
      }
    };

    getFuelEntry();
  }, []);

  return (
    <div className="container">
      <h1>All Fuel Entries</h1>
      
      <ul>
        {fuel_entry.map((fuel_entry) => (
          <li key={fuel_entry.id}>
            Vehicle ID: {fuel_entry.vehicle_id}<br />
            Fuel Date: {fuel_entry.fuel_date}<br />
            Fuel Type: {fuel_entry.fuel_type}<br />
            Fuel Quantity: {fuel_entry.fuel_quantity}<br />
            Fuel Cost: {fuel_entry.fuel_cost}<br />
            Vehicle Milage: {fuel_entry.vehicle_milage}<br />
            <Link to={`/updateFuelEntry/${fuel_entry.vehicle_id}`} state={{ fuel_entryData: fuel_entry }}>
              <button>Update</button>
            </Link>
            <Link to={`/uniqueFuelEntry/${fuel_entry.vehicle_id}`} state={{ fuel_entryData: fuel_entry }}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
