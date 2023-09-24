import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Import Outlet for nested routes

const Fuelentry = () => {
  return (
    <div>
      <h2>Fuel Entry Main Page</h2>
      <ul>
        <li>
          <Link to="addFuelentry">Add Fuel Entry</Link> {/* Use relative path */}
        </li>
        <li>
          <Link to="allFuelentries">View Fuel Entries</Link> {/* Use relative path */}
        </li>
        <li>
          <Link to="updateFuelentry">Update Fuel Entry</Link> {/* Use relative path */}
        </li>
        <li>
          <Link to="uniqueFuelentry">Unique Fuel Entry</Link> {/* Use relative path */}
        </li>
      </ul>

      <Outlet /> {/* Render nested routes */}
    </div>
  );
}

export default Fuelentry;
