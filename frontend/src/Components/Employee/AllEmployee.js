import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    function AllEmployees() {
      axios
        .get("http://localhost:8411/employee/")
        .then((res) => {
          setEmployees(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    AllEmployees();
  }, []);

  return (
    <div className="container">
      <h1>All Employees</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Job Roll</th>
            <th>Basic Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.eid}</td>
              <td>{employee.ename}</td>
              <td>{employee.gender}</td>
              <td>{employee.address}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>{employee.dob}</td>
              <td>{employee.jobroll}</td>
              <td>{employee.bsal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
