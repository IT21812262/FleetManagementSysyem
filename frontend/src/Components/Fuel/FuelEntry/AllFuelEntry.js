import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllFuelentry.css";


export default function AllFuelentry() {

  const [fuelentries, setFuelentries] = useState([]);

  useEffect(() => {
    const getFuelentries = async () => {
      try {
        const response = await axios.get('http://localhost:8411/fuel/');
        setFuelentries(response.data);
      } catch (error) {
        alert('Error fetching fuel entries:', error.message);
      }
    };

    getFuelentries();
  }, []);

  return (
    <div className="container">
      <h1>All Fuel Entries</h1>
    
      <ul>
        {fuelentries.map((fuelentry) => (
          <li key={fuelentry.id}>
            Vehicle ID: {fuelentry.vehicle_id}<br />
            Fuel Date: {fuelentry.fuel_date}<br />
            Fuel Type: {fuelentry.fuel_type}<br />
            Fuel Quantity: {fuelentry.fuel_quantity}<br />
            Fuel Cost: {fuelentry.fuel_cost}<br />
            Vehicle Milage: {fuelentry.vehicle_milage}<br />

            <Link to={`/fuel/updateFuelentry/${fuelentry.vehicle_id}`} state={{ fuelentryData: fuelentry }}>
              <button>Update</button>
            </Link>
            <Link to={`/fuel/uniqueFuelentry/${fuelentry.vehicle_id}`} state={{ fuelentryData: fuelentry }}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
