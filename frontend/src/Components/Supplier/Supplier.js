
import React from 'react';
import { Link } from 'react-router-dom';

const Supplier = () => {
  return (
    <div>
      <h2>Supplier Main Page</h2>
      <ul>
        <li>
          <Link to="/supplier/addSupplier">Add Supplier</Link>
        </li>
        <li>
          <Link to="/supplier/allSuppliers">View Supplier</Link>
        </li>
      </ul>
    </div>
  );
}

export default Supplier;


