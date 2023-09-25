import React from 'react';
import { Link } from 'react-router-dom';

const Employee = () => {
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <ul>
        <li>
          <Link to="/employee/addEmployee">Add Employee</Link>
        </li>
        <li>
          <Link to="/employee/allEmployees">View Employee</Link>
        </li>
        
       
        
      </ul>
    </div>
  );
}

export default Employee;