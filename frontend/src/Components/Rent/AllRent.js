import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import "./AllRent.css";

export default function AllRent() {
  const [rents, setRents] = useState([]);

  useEffect(() => {
    const getRents = async () => {
      try {
        const response = await axios.get("http://localhost:8411/rent/");
        setRents(response.data);
      } catch (error) {
        alert("Error fetching rents: " + error.message);
      }
    };

    getRents();
  }, []);

  /* const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }; */

  return (
    <div className="container">
      <h1>All Rents</h1>
      {rents.map((rent) => (
        <div key={rent._id} className="rent-card">
          <p>Vehicle No: {rent.vehicle_no}</p>
          <p>Brand: {rent.brand}</p>
          {/* Display other rent attributes here... */}
          {/* <p>Vehicle Model: {rent.vehicle_model}</p>
          <p>Milage: {rent.milage}</p>
          <p>Capacity: {rent.capacity}</p>
          <p>Description: {rent.description}</p>
          <p>Receive Date: {formatDate(rent.receive_date)}</p>
          <p>Return Date: {formatDate(rent.return_date)}</p>
          <p>Owner Name: {rent.owner_name}</p>
          <p>Owner Phone: {rent.owner_phone}</p>
          <p>Owner Email: {rent.owner_email}</p>
          <p>Rental: {rent.rental}</p> */}
          {/* <button onClick={() => deleteRent(rent._id)} className="delete-button">
            Delete
          </button> */}
          <Link to={`/rent/updateRent/${rent._id}`} state={{ rentDetails: rent }}>
            <button className="update-button">Update</button>
          </Link>
          <Link to={`/rent/uniqueRent/${rent.vehicle_no}`} state={{ rentDetails: rent }}>
            <button>View</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
