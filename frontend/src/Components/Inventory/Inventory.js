import React from 'react';
import { Link } from 'react-router-dom';
// import './Inventory.css';

const Inventory = () => {
  return (
    <div className="inventory-container">
      <div className="left-column">
        <h2>Inventory Management System</h2>
        <ul className="nav-list">
          <li>
            <Link to="/inventory/addInventory" className="nav-link">
              <button className="tab-button">Add New Item</button>
            </Link>
          </li>
          <li>
            <Link to="/inventory/allInventory" className="nav-link">
              <button className="tab-button">Display All Items</button>
            </Link>
          </li>
          <li>
            <Link to="/inventory/updateInventory" className="nav-link">
              <button className="tab-button">Update Item</button>
            </Link>
          </li>
          <li>
            <Link to="/inventory/uniqueInventory" className="nav-link">
              <button className="tab-button">Display Unique Item</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Inventory;
