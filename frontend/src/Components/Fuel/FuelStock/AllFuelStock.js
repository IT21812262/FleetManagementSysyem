import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllFuelStock.css";


export default function AllFuelStock() {

  const [fuel_stocks, setFuelStocks] = useState([]);

  useEffect(() => {
    const getFuelStocks = async () => {
      try {
        const response = await axios.get('http://localhost:8411/fuel/fuel_stock');
        setFuelStock(response.data);
      } catch (error) {
        alert('Error fetching fuel stocks:', error.message);
      }
    };

    getFuelStocks();
  }, []);

  return (
    <div className="container">
      <h1>All Fuel Stocks</h1>
      
      <ul>
        {fuel_stocks.map((fuel_stock) => (
          <li key={fuel_stock.id}>
            Invoice NO: {fuel_stock.invoice_no}<br />
            Stocked Fuel Type: {fuel_stock.stocked_fuel_type}<br />
            Stocked Fuel Quantity: {fuel_stock.stocked_fuel_quantity}<br />
            Per Leter Cost: {fuel_entry.per_leter_cost}<br />
            Total Cost: {fuel_stock.total_cost}<br />
            Stocked Fuel Date: {fuel_stock.stocked_fuel_date}<br />
            <Link to={`/fuel_stock/updateFuelStock/${fuel_stock.invoice_no}`} state={{ fuel_stockData: fuel_stock }}>
              <button>Update</button>
            </Link>
            <Link to={`/fuel_stock/uniqueFuelStock/${fuel_stock.invoice_no}`} state={{ fuel_stockData: fuel_stock }}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
