import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Import Outlet for nested routes

const Fuelstock = () => {
  return (
    <div>
      <h2>Fuel Stock Main Page</h2>
      <ul>
        <li>
          <Link to="addFuelstock">Add Fuel Stock</Link> {/* Use relative path */}
        </li>
        <li>
          <Link to="allFuelstocks">View Fuel Stocks</Link> {/* Use relative path */}
        </li>
        <li>
          <Link to="updateFuelstock">Update Fuel Stock</Link> {/* Use relative path */}
        </li>
        <li>
          <Link to="uniqueFuelstock">Unique Fuel Stock</Link> {/* Use relative path */}
        </li>
      </ul>

      <Outlet /> {/* Render nested routes */}
    </div>
  );
}

export default Fuelstock;
