import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from 'yup';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

//import "./UpdateTrip.css"; // You can create a separate CSS file for styling

const UpdateTrip = () => {
  const location = useLocation();

  const [tripData, setTripData] = useState(
    location.state?.tripData || {
      tripid: "",
      tripname: "",
      tripduration: "",
      tripdistance: "",
      vehicleno: "",
      driverid: "",
      startpoint: "",
      destination: "",
      tripgoods: "",
      arrivaltime: "",
      departuretime: "",
      startfuel: "",
      endfuel: "",
      fuelUsed: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    setTripData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));

    validateInput(id, newValue);
  };

  const validateInput = (id, value) => {
    let error = "";

    switch (id) {
      case "tripid":
        error = value.length !== 4 ? "Trip ID must be 4 characters" : "";
        break;

      case "tripname":
        error = value.trim() === "" ? "Trip Name is required" : "";
        break;

      case "tripduration":
        error = isNaN(value) ? "Trip Duration should contain only numbers" : "";
        break;

      case "tripdistance":
        error = isNaN(value) ? "Trip Distance should contain only numbers" : "";
        break;

      case "vehicleno":
        error = value.trim() === "" ? "Vehicle Number is required" : "";
        break;

      case "driverid":
        error = value.trim() === "" ? "Driver ID is required" : "";
        break;

      case "startpoint":
        error = value.trim() === "" ? "Starting Point is required" : "";
        break;

      case "destination":
        error = value.trim() === "" ? "Destination is required" : "";
        break;

      case "tripgoods":
        error = value.trim() === "" ? "Trip Goods is required" : "";
        break;

      case "arrivaltime":
        error = isNaN(value) ? "Arrival Time should contain only numbers" : "";
        break;

      case "departuretime":
        error = isNaN(value) ? "Departure Time should contain only numbers" : "";
        break;

      case "startfuel":
        error = isNaN(value) ? "Start Fuel should contain only numbers" : "";
        break;

      case "endfuel":
        error = isNaN(value) ? "End Fuel should contain only numbers" : "";
        break;

      case "fuelUsed":
        error = isNaN(value) ? "Fuel Used should contain only numbers" : "";
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      alert("Please correct the errors before updating.");
      return; // Stop the form submission
    }

    const newTrip = { ...tripData };

    if (newTrip.tripid) {
      axios
        .put(`http://localhost:8411/trip/update/${newTrip.tripid}`, newTrip)
        .then((response) => {
          resetForm();
          alert("Trip data successfully updated.");
          // Redirect or navigate to the appropriate page
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Trip ID is required.");
    }
  };

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/trip/get/${searchQ}`
          );

          if (response.data.tripData) {
            setTripData(response.data.tripData);
          }
        }
      } catch (error) {
        alert("Error fetching trip data: " + error.message);
      }
    };

    fetchTripData();
  }, [searchQ]);

  const resetForm = () => {
    setTripData({
      tripid: "",
      tripname: "",
      tripduration: "",
      tripdistance: "",
      vehicleno: "",
      driverid: "",
      startpoint: "",
      destination: "",
      tripgoods: "",
      arrivaltime: "",
      departuretime: "",
      startfuel: "",
      endfuel: "",
      fuelUsed: "",
    });
    setErrors({});
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/trip/tripdata'); // Redirect to the trips page or the appropriate route
  };

  return (
    <Box m="20px">
      <Formik
        onSubmit={handleSubmit}
      >
        <form className="updateTripForm" onSubmit={handleSubmit}>
          {tripData.tripid && (
            <Header
              title={`EDIT TRIP DATA FOR TRIP ID: ${tripData.tripid}`}
              subtitle="Update Trip Data"
            />
          )}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Enter Trip ID to Update"
            id="tripid"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Enter Trip ID"
            name="tripid"
            sx={{ gridColumn: "span 2" }}
          />

          <Box
            display="grid"
            gap=""
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="TRIP NAME"
              id="tripname"
              onChange={handleInputChange}
              value={tripData.tripname}
              name="tripname"
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="TRIP DURATION"
              id="tripduration"
              onChange={handleInputChange}
              value={tripData.tripduration}
              name="tripduration"
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="TRIP DISTANCE"
              id="tripdistance"
              onChange={handleInputChange}
              value={tripData.tripdistance}
              name="tripdistance"
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="VEHICLE NO"
              id="vehicleno"
              onChange={handleInputChange}
              value={tripData.vehicleno}
              name="vehicleno"
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="DRIVER ID"
              id="driverid"
              onChange={handleInputChange}
              value={tripData.driverid}
              name="driverid"
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="START POINT"
              id="startpoint"
              onChange={handleInputChange}
              value={tripData.startpoint}
              name="startpoint"
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="DESTINATION"
              id="destination"
              onChange={handleInputChange}
              value={tripData.destination}
              name="destination"
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="TRIP GOODS"
              id="tripgoods"
              onChange={handleInputChange}
              value={tripData.tripgoods}
              name="tripgoods"
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="ARRIVAL TIME"
              id="arrivaltime"
              onChange={handleInputChange}
              value={tripData.arrivaltime}
              name="arrivaltime"
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="DEPARTURE TIME"
              id="departuretime"
              onChange={handleInputChange}
              value={tripData.departuretime}
              name="departuretime"
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="START FUEL"
              id="startfuel"
              onChange={handleInputChange}
              value={tripData.startfuel}
              name="startfuel"
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="END FUEL"
              id="endfuel"
              onChange={handleInputChange}
              value={tripData.endfuel}
              name="endfuel"
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="FUEL USED"
              id="fuelUsed"
              onChange={handleInputChange}
              value={tripData.fuelUsed}
              name="fuelUsed"
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" fullWidth>
              UPDATE TRIP DATA
            </Button>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="btnBack"
              variant="contained"
              fullWidth
              onClick={handleButtonClick}
            >
              BACK TO TRIPS
            </Button>
          </Box>
        </form>
      </Formik>
    </Box>
  );
};

export default UpdateTrip;
