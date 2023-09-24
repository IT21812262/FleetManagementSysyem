
import React from 'react';
import { Link } from 'react-router-dom';

const Fuel = () => {
  return (
    <div>
      <h2>Fuel Main Page</h2>
      <ul>
        
        <li>
          <Link to="/fuel/fuelentry">Fuel Entry</Link>
        </li>
        <li>
          <Link to="/fuel/fuelstock">Fuel Stock</Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Fuel;


