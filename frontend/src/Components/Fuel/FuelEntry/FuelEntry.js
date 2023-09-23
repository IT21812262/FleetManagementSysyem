
import React from 'react';
import { Link } from 'react-router-dom';

const FuelEntry= () => {
  return (
    <div>
      <h2>Fuel Entry</h2>
      <ul>
        <li>
          <Link to="/fuelEntry/AddFuelEntry">Add Fuel Entry</Link>
        </li>
        <li>
          <Link to="/fuelEntry/AllFuelEntry">View Fuel Entry</Link>
        </li>
        <li>
          <Link to="/fuelEntry/UpdateFuelEntry">Update Fuel Entry</Link>
        </li>
        <li>
          <Link to="/fuelEntry/UniqueFuelEntry">Unique Fuel Entry</Link>
        </li>
        
      </ul>
    </div>
  );
}

export default FuelEntry;


