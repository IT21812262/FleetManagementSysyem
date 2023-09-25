import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllFuelstock.css";


export default function AllFuelstocks() {

  const [fuelstocks, setFuelstocks] = useState([]);

  useEffect(() => {
    const getFuelstocks = async () => {
      try {
        const response = await axios.get('http://localhost:8411/fuelstock/');
        setFuelstocks(response.data);
      } catch (error) {
        alert('Error fetching fuel stocks:', error.message);
      }
    };

    getFuelstocks();
  }, []);

  return (
    <div className="container">
      <h1>All Fuel Stocks</h1>
    
      <ul>
        {fuelstocks.map((fuelstock) => (
          <li key={fuelstock.id}>
            Invoice No: {fuelstock.invoice_no}<br />
            Stocked Fuel Type: {fuelstock.stocked_fuel_type}<br />
            Stocked Fuel Quantity: {fuelstock.stocked_fuel_quantity}<br />
            Per Leter Cost: {fuelstock.per_leter_cost}<br />
            Total Cost: {fuelstock.total_cost}<br />
            Stocked Fuel Date: {fuelstock.stocked_fuel_date}<br />

            <Link to={`/fuel/fuelstock/updateFuelstock/${fuelstock.invoice_no}`} state={{ fuelstockData: fuelstock }}>
              <button>Update</button>
            </Link>
            <Link to={`/fuel/fuelstock/uniqueFuelstock/${fuelstock.invoice_no}`} state={{ fuelstockData: fuelstock }}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
