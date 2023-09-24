import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link ,useNavigate} from "react-router-dom";

export default function UniqueRent() {
  const { id } = useParams();
  const [rent, setRent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/rent/get/${id}`);
          setRent(response.data.rent);
        }
      } catch (error) {
        alert('Error fetching rent:', error.message);
      }
    };

    fetchRentData();
  }, [id]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value.toUpperCase());
  };

  const fetchRentDataBySearch = async () => {
    try {
      if (searchQuery) {
        const response = await axios.get(`http://localhost:8411/rent/get/${searchQuery}`);
        setRent(response.data.rent);
      }
    } catch (error) {
      alert('Error fetching rent:', error.message);
    }
  };

  const handleDelete = async (vehicle_no) => {
    const confirmation = window.prompt("To confirm deletion, type 'CONFIRM' (case-sensitive):");
  
    if (confirmation === "CONFIRM") {
      try {
        await axios.delete(`http://localhost:8411/rent/delete/${rent.vehicle_no}`);
        alert('Rent record deleted successfully.');

        navigate("/rent/allRent");

      } catch (error) {
        alert('Error deleting rent record:', error.message);
      }
    } else {
      alert('Deletion cancelled. No changes were made.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRentDataBySearch();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container">
      <h1>Unique Rent</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQuery}
          placeholder="Enter Vehicle Number"
        />
        <button type="submit">Fetch Rent Data</button>
        <Link to="/rent/allRent">
          <button type="button">Cancel</button>
        </Link>
      </form>

      {rent ? (
        <ul>
          <li key={rent.id}>
            Vehicle Number: {rent.vehicle_no}<br />
            Brand: {rent.brand}<br />
            Vehicle Model: {rent.vehicle_model}<br />
            Mileage: {rent.milage}<br />
            Capacity: {rent.capacity}<br />
            Description: {rent.description}<br />
            Receive Date: {formatDate(rent.receive_date)}<br />
            Return Date: {formatDate(rent.return_date)}<br />
            Owner Name: {rent.owner_name}<br />
            Owner Phone: {rent.owner_phone}<br />
            Owner Email: {rent.owner_email}<br />
            Rental: {rent.rental}<br />
            <button onClick={() => handleDelete(rent.vehicle_no)}>Delete Rent Record</button>
          </li>
        </ul>
      ) : (
        <p>No rent record found with the specified Vehicle Number.</p>
      )}

      {/* Link to All Rent page */}
      <Link to="/rent/allRent">All Rent</Link>
    </div>
  );
}
