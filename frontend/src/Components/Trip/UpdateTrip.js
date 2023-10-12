import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateTrip() {
  const { id } = useParams(); // Get the trip ID from the URL
  const [trip, setTrip] = useState({
    tripid: '',
    tripname: '',
    tripduration: '',
    tripdistance: '',
    vehicleno: '',
    driverid: '',
    startpoint: '',
    destination: '',
    tripgoods: '',
    arrivaltime: '',
    departuretime: '',
    startfuel: '',
    endfuel: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8411/trip/get/${id}`)
      .then((res) => {
        setTrip(res.data.trip);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8411/trip/update/${id}`, trip)
      .then((res) => {
        setMessage('Trip details updated successfully!');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="containercp2">
      <h1>Update Trip</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-groupcp">
          <label>Trip Name</label>
          <input
            type="text"
            className="form-control"
            name="tripname"
            value={trip.tripname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Trip Duration</label>
          <input
            type="text"
            className="form-control"
            name="tripduration"
            value={trip.tripduration}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Trip Distance</label>
          <input
            type="text"
            className="form-control"
            name="tripdistance"
            value={trip.tripdistance}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Vehicle Number</label>
          <input
            type="text"
            className="form-control"
            name="vehicleno"
            value={trip.vehicleno}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Driver ID</label>
          <input
            type="text"
            className="form-control"
            name="driverid"
            value={trip.driverid}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Starting Point</label>
          <input
            type="text"
            className="form-control"
            name="startpoint"
            value={trip.startpoint}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Destination</label>
          <input
            type="text"
            className="form-control"
            name="destination"
            value={trip.destination}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Trip Goods</label>
          <input
            type="text"
            className="form-control"
            name="tripgoods"
            value={trip.tripgoods}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Arrival Time</label>
          <input
            type="text"
            className="form-control"
            name="arrivaltime"
            value={trip.arrivaltime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Departure Time</label>
          <input
            type="text"
            className="form-control"
            name="departuretime"
            value={trip.departuretime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>Start Fuel</label>
          <input
            type="text"
            className="form-control"
            name="startfuel"
            value={trip.startfuel}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-groupcp">
          <label>End Fuel</label>
          <input
            type="text"
            className="form-control"
            name="endfuel"
            value={trip.endfuel}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Trip
        </button>
      </form>
    </div>
  );
}
