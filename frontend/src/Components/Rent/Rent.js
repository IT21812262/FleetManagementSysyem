// Rent.js
import React from 'react';
import { Link } from 'react-router-dom';

const Rent = () => {
  return (
    <div>
      <h2>Rent Main Page</h2>
      <ul>
        <li>
          <Link to="/rent/addRent">Add Rent</Link>
        </li>
        <li>
          <Link to="/rent/allRent">View Rent</Link>
        </li>
      </ul>
    </div>
  );
}

export default Rent;
