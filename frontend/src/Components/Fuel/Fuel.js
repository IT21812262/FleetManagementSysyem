
import React from 'react';
import { Link } from 'react-router-dom';

const Fuel = () => {
  return (
    <div>
      <h2>Fuel Management System</h2>
      <ul>
        <li>
          <Link to="/fuel/fuelEntry">Fuel Entry</Link>
        </li>
        <li>
          <Link to="/fuel/fuelStock">Fuel Stock</Link>
        </li>
        
        
      </ul>
    </div>
  );
}

export default Fuel;


