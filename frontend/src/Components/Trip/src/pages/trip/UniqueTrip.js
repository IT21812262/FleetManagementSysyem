import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
//import "./UniqueTrip.css"; // You can create a CSS file for UniqueTrip styles

export default function UniqueTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/trip/get/${id}`);
          setTrip(response.data.trip);
        }
      } catch (error) {
        alert('Error fetching trip:', error.message);
      }
    };

    fetchTripData();
  }, [id]);

  const handleSearchQ = (e) => {
    setSearchQ(e.target.value);
  };

  const fetchTripDataBySearch = async () => {
    try {
      if (searchQ) {
        const response = await axios.get(`http://localhost:8411/trip/get/${searchQ}`);
        setTrip(response.data.trip);
      }
    } catch (error) {
      alert('Error fetching trip:', error.message);
    }
  };

  const handleDelete = async (tripId) => {
    try {
      await axios.delete(`http://localhost:8411/trip/delete/${id}`);
      alert('Trip deleted successfully.');
      // Navigate to All Trips page
      window.location.href = "/trip/allTrip";
    } catch (error) {
      alert('Error deleting trip:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTripDataBySearch();
  };

  return (
    <div className="container">
      <h1>Unique Trip</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQ}
          onChange={handleSearchQ}
          placeholder="Enter Trip ID"
        />
        <button type="submit">Fetch Trip Data</button>
      </form>

      {trip ? (
        <ul>
          <li key={trip.tripid}>
            Trip ID: {trip.tripid}<br />
            Trip Name: {trip.tripname}<br />
            Trip Duration: {trip.tripduration} hours<br />
            Trip Distance: {trip.tripdistance} km<br />
            Vehicle Number: {trip.vehicleno}<br />
            Driver ID: {trip.driverid}<br />
            Starting Point: {trip.startpoint}<br />
            Destination: {trip.destination}<br />
            Trip Goods: {trip.tripgoods}<br />
            Arrival Time: {trip.arrivaltime} hours<br />
            Departure Time: {trip.departuretime} hours<br />
            Start Fuel: {trip.startfuel} Litres<br />
            End Fuel: {trip.endfuel} litres<br />
            {/* You can add more attributes as needed */}
            <Link to="/trip/allTrip">
              <button type="button">Cancel</button>
            </Link>
            <button onClick={() => handleDelete(trip.tripid)} className="button2"> Delete Trip</button>
          </li>
        </ul>
      ) : (
        <p>No trip found with the specified ID.</p>
      )}

      {/* Link to All Trips page */}
      <Link to="/trip/allTrip">All Trips</Link>
    </div>
  );
}
