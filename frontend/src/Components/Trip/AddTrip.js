import React, { useState } from "react";
import axios from "axios";
import "./AddTrip.css";

export default function AddTrip() {
  const [tripid, setTripid] = useState("");
  const [tripname, setTripname] = useState("");
  const [tripduration, setTripduration] = useState("");
  const [tripdistance, setTripdistance] = useState("");
  const [vehicleno, setVehicleno] = useState("");
  const [driverid, setDriverid] = useState("");
  const [startpoint, setStartpoint] = useState("");
  const [destination, setDestination] = useState("");
  const [tripgoods, setTripgoods] = useState("");
  const [arrivaltime, setArrivaltime] = useState("");
  const [departuretime, setDeparturetime] = useState("");
  const [startfuel, setStartfuel] = useState("");
  const [endfuel, setEndfuel] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");

  const [errors, setErrors] = useState({});

  function validateForm() {
    const errors = {};

    // Validate Trip ID
    if (!tripid) {
      errors.tripid = "Trip ID is required";
    } else if (!/^[A-Za-z]{2}\d{4}$/.test(tripid)) {
      errors.tripid = "Trip ID must start with 2 letters and end with 4 numbers";
    }

    // Validate Trip Name
    if (!tripname) {
      errors.tripname = "Trip Name is required";
    } else if (tripname.length > 10) {
      errors.tripname = "Trip Name must have a maximum of 10 characters";
    }

    // Validate Trip Duration
    if (!tripduration) {
      errors.tripduration = "Trip Duration is required";
    } else if (isNaN(tripduration) || parseFloat(tripduration) <= 0 || parseFloat(tripduration) > 50) {
      errors.tripduration = "Trip Duration should be a positive number and not exceed 50 hours";
    }

    // Validate Trip Distance
    if (!tripdistance) {
      errors.tripdistance = "Trip Distance is required";
    } else if (isNaN(tripdistance) || parseFloat(tripdistance) <= 0 || parseFloat(tripdistance) > 300) {
      errors.tripdistance = "Trip Distance should be a positive number and not exceed 300 kilometers";
    }

    // Validate Vehicle Number
    if (!vehicleno) {
      errors.vehicleno = "Vehicle Number is required";
    } else if (!/^\d{6}$/.test(vehicleno)) {
      errors.vehicleno = "Vehicle Number must have 6 numbers";
    }

    // Validate Driver ID
    if (!driverid) {
      errors.driverid = "Driver ID is required";
    } // Add more validation rules for Driver ID if needed

    // Validate Starting Point
    if (!startpoint) {
      errors.startpoint = "Starting Point is required";
    } // Add more validation rules for Starting Point if needed

    // Validate Destination
    if (!destination) {
      errors.destination = "Destination is required";
    } // Add more validation rules for Destination if needed

    // Validate Trip Goods
    if (!tripgoods) {
      errors.tripgoods = "Trip Goods is required";
    } // Add more validation rules for Trip Goods if needed

    // Validate Arrival Time
    if (!arrivaltime) {
      errors.arrivaltime = "Arrival Time is required";
    } // Add more validation rules for Arrival Time if needed

    // Validate Departure Time
    if (!departuretime) {
      errors.departuretime = "Departure Time is required";
    } // Add more validation rules for Departure Time if needed

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function sendData(e) {
    e.preventDefault();

    if (validateForm()) {
      const newTrip = {
        tripid,
        tripname,
        tripduration: parseFloat(tripduration),
        tripdistance: parseFloat(tripdistance),
        vehicleno,
        driverid,
        startpoint,
        destination,
        tripgoods,
        arrivaltime: parseFloat(arrivaltime),
        departuretime: parseFloat(departuretime),
        startfuel: parseFloat(startfuel),
        endfuel: parseFloat(endfuel),
        fuelUsed: parseFloat(fuelUsed),
      };
    
      

      axios
        .post("http://localhost:8411/trip/add", newTrip)
        .then((response) => {
          alert(response.data.message);
          window.location.href = "/trip";
          // Reset form fields
          setTripid("");
          setTripname("");
          setTripduration("");
          setTripdistance("");
          setVehicleno("");
          setDriverid("");
          setStartpoint("");
          setDestination("");
          setTripgoods("");
          setArrivaltime("");
          setDeparturetime("");
          setStartfuel("");
          setEndfuel("");
          setFuelUsed("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="containeryohan">
      <form onSubmit={sendData} className="form-container">
        <div className="form-column">
          {errors.tripid && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.tripid}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="tripid">Trip ID</label>
            <input
              type="text"
              className={`form-control ${errors.tripid ? "is-invalid" : ""}`}
              id="tripid"
              placeholder="Enter Trip ID"
              style={inputStyle}
              value={tripid}
              onChange={(e) => {
                setTripid(e.target.value);
                setErrors({ ...errors, tripid: null });
              }}
            />
          </div>

          {errors.tripname && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.tripname}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="tripname">Trip Name</label>
            <input
              type="text"
              className={`form-control ${errors.tripname ? "is-invalid" : ""}`}
              id="tripname"
              placeholder="Enter Trip Name"
              style={inputStyle}
              value={tripname}
              onChange={(e) => {
                setTripname(e.target.value);
                setErrors({ ...errors, tripname: null });
              }}
            />
          </div>

          {errors.tripduration && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.tripduration}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="tripduration">Trip Duration (hours)</label>
            <input
              type="number"
              className={`form-control ${
                errors.tripduration ? "is-invalid" : ""
              }`}
              id="tripduration"
              placeholder="Enter Trip Duration"
              style={inputStyle}
              value={tripduration}
              onChange={(e) => {
                setTripduration(e.target.value);
                setErrors({ ...errors, tripduration: null });
              }}
            />
          </div>

          {errors.tripdistance && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.tripdistance}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="tripdistance">Trip Distance (km)</label>
            <input
              type="number"
              className={`form-control ${
                errors.tripdistance ? "is-invalid" : ""
              }`}
              id="tripdistance"
              placeholder="Enter Trip Distance"
              style={inputStyle}
              value={tripdistance}
              onChange={(e) => {
                setTripdistance(e.target.value);
                setErrors({ ...errors, tripdistance: null });
              }}
            />
          </div>

          {errors.vehicleno && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.vehicleno}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="vehicleno">Vehicle Number</label>
            <input
              type="text"
              className={`form-control ${
                errors.vehicleno ? "is-invalid" : ""
              }`}
              id="vehicleno"
              placeholder="Enter Vehicle Number"
              style={inputStyle}
              value={vehicleno}
              onChange={(e) => {
                setVehicleno(e.target.value);
                setErrors({ ...errors, vehicleno: null });
              }}
            />
          </div>

          {errors.driverid && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.driverid}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="driverid">Driver ID</label>
            <input
              type="text"
              className={`form-control ${
                errors.driverid ? "is-invalid" : ""
              }`}
              id="driverid"
              placeholder="Enter Driver ID"
              style={inputStyle}
              value={driverid}
              onChange={(e) => {
                setDriverid(e.target.value);
                setErrors({ ...errors, driverid: null });
              }}
            />
          </div>

          {errors.startpoint && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.startpoint}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="startpoint">Starting Point</label>
            <input
              type="text"
              className={`form-control ${
                errors.startpoint ? "is-invalid" : ""
              }`}
              id="startpoint"
              placeholder="Enter Starting Point"
              style={inputStyle}
              value={startpoint}
              onChange={(e) => {
                setStartpoint(e.target.value);
                setErrors({ ...errors, startpoint: null });
              }}
            />
          </div>
        </div>

        <div className="form-column">
          {errors.destination && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.destination}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              className={`form-control ${
                errors.destination ? "is-invalid" : ""
              }`}
              id="destination"
              placeholder="Enter Destination"
              style={inputStyle}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setErrors({ ...errors, destination: null });
              }}
            />
          </div>

          {errors.tripgoods && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.tripgoods}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="tripgoods">Trip Goods</label>
            <input
              type="text"
              className={`form-control ${
                errors.tripgoods ? "is-invalid" : ""
              }`}
              id="tripgoods"
              placeholder="Enter Trip Goods"
              style={inputStyle}
              value={tripgoods}
              onChange={(e) => {
                setTripgoods(e.target.value);
                setErrors({ ...errors, tripgoods: null });
              }}
            />
          </div>

          {errors.arrivaltime && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.arrivaltime}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="arrivaltime">Arrival Time</label>
            <input
              type="number"
              className={`form-control ${
                errors.arrivaltime ? "is-invalid" : ""
              }`}
              id="arrivaltime"
              placeholder="Enter Arrival Time"
              style={inputStyle}
              value={arrivaltime}
              onChange={(e) => {
                setArrivaltime(e.target.value);
                setErrors({ ...errors, arrivaltime: null });
              }}
            />
          </div>

          {errors.departuretime && (
            <div className="alert alert-danger" style={alertStyle}>
              {errors.departuretime}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="departuretime">Departure Time</label>
            <input
              type="number"
              className={`form-control ${
                errors.departuretime ? "is-invalid" : ""
              }`}
              id="departuretime"
              placeholder="Enter Departure Time"
              style={inputStyle}
              value={departuretime}
              onChange={(e) => {
                setDeparturetime(e.target.value);
                setErrors({ ...errors, departuretime: null });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="startfuel">Start Fuel</label>
            <input
              type="number"
              className={`form-control ${
                errors.startfuel ? "is-invalid" : ""
              }`}
              id="startfuel"
              placeholder="Enter Start Fuel"
              style={inputStyle}
              value={startfuel}
              onChange={(e) => {
                setStartfuel(e.target.value);
                setErrors({ ...errors, startfuel: null });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endfuel">End Fuel</label>
            <input
              type="number"
              className={`form-control ${
                errors.endfuel ? "is-invalid" : ""
              }`}
              id="endfuel"
              placeholder="Enter End Fuel"
              style={inputStyle}
              value={endfuel}
              onChange={(e) => {
                setEndfuel(e.target.value);
                setErrors({ ...errors, endfuel: null });
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={buttonStyle}>
          Submit
        </button>
        </div>

        
      </form>
    </div>
  );
}

const alertStyle = {
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  padding: "10px 10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
