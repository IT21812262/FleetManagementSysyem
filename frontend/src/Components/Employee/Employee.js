import React from 'react';
import { Link } from 'react-router-dom';

const Employee = () => {
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <ul>
        <li>
          <Link to="/employee/addEmployees">Add Supplier</Link>
        </li>
        <li>
          <Link to="/employee/allEmployees">View Supplier</Link>
        </li>
       
        
      </ul>
    </div>
  );
}

export default Employee;