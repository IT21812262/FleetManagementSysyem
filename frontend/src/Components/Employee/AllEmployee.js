import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function getEmployees() {
      axios
        .get('http://localhost:8411/employee/')
        .then((res) => {
          setEmployees(res.data);
          setFilteredEmployees(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getEmployees();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios
        .delete(`http://localhost:8411/employee/delete/${id}`)
        .then(() => {
          // Remove the deleted employee from the list
          setEmployees(employees.filter((employee) => employee._id !== id));
          setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== id));
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const generatePdf = () => {
    // Create a new jsPDF instance with landscape orientation
    const doc = new jsPDF({
      orientation: 'landscape',
    });

    // Define columns and rows for the table
    const columns = [
      'Employee ID',
      'Employee Name',
      'Gender',
      'Address',
      'Phone',
      'Email',
      'Date of Birth',
      'Job Roll',
      'Basic Salary',
    ];
    const rows = filteredEmployees.map((employee) => [
      employee.eid,
      employee.ename,
      employee.gender,
      employee.address,
      employee.phone,
      employee.email,
      employee.dob,
      employee.jobroll,
      employee.bsal,
    ]);

    // Calculate the page height based on the number of rows
    const pageHeight = doc.internal.pageSize.height;
    const tableHeight = rows.length * 10; // Adjust as needed
    let y = 20; // Initial Y position

    if (tableHeight > pageHeight) {
      // Add a new page if the table exceeds the current page height
      doc.addPage();
    }

    // Add a page, set font size and text
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: y, // Start the table at the adjusted Y position
    });

    // Save the PDF with a name
    doc.save('employees.pdf');
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.eid.toLowerCase().includes(query) ||
        employee.ename.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="containercp1">
      <h1>All Employees</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Employee ID or Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="button" className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
        <button type="button" className="btn btn-secondary mt-2 ml-2" onClick={() => setSearchQuery('')}>
          Clear
        </button>
      </div>
      <button className="btn btn-primary" onClick={generatePdf}>
        Download Report
      </button>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.eid}</td>
              <td>{employee.ename}</td>
              <td>{employee.gender}</td>
              <td>{employee.address}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>{employee.dob}</td>
              <td>{employee.jobroll}</td>
              <td>{employee.bsal}</td>
              <td>
                <div className="btn-group" role="group">
                  <Link to={`/employee/updateEmployee/${employee._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
