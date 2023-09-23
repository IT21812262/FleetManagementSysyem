
import React from 'react';
import { Link } from 'react-router-dom';


const FuelStock= () => {
  return (
    <div>
      <h2>Fuel Stock</h2>
      <ul>
        <li>
          <Link to="/fuelStock/AddFuelStock">Add Fuel Stock</Link>
        </li>
        <li>
          <Link to="/fuelStock/AllFuelStock">View Fuel Stock</Link>
        </li>
        <li>
          <Link to="/fuelStock/UpdateFuelStock">Update Fuel Stock</Link>
        </li>
        <li>
          <Link to="/fuelStock/UniqueFuelStock">Unique Fuel Stock</Link>
        </li>
        
      </ul>
    </div>
  );
}

export default FuelStock;


