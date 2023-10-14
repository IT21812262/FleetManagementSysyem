import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import "./AddTrip.css";


const AddTrip = ({onClose}) => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  
  const handleFormSubmit = (values) => {
      console.log(values);
  };

  const initialValues = {
    
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
  };    

  const checkoutSchema = yup.object().shape({
    tripid: yup
    .string()
    .matches(/^[A-Za-z]{2}\d{4}$/, 'Trip ID must start with 2 letters and end with 4 numbers')
    .required('Trip ID is required'),

  tripname: yup
    .string()
    .max(10, 'Trip Name must have a maximum of 10 characters')
    .required('Trip Name is required'),

  tripduration: yup
    .number()
    .positive('Trip Duration should be a positive number')
    .max(50, 'Trip Duration should not exceed 50 hours')
    .required('Trip Duration is required'),

  tripdistance: yup
    .number()
    .positive('Trip Distance should be a positive number')
    .max(300, 'Trip Distance should not exceed 300 kilometers')
    .required('Trip Distance is required'),

  vehicleno: yup
    .string()
    .matches(/^\d{6}$/, 'Vehicle Number must have 6 numbers')
    .required('Vehicle Number is required'),

  driverid: yup
    .string()
    .required('Driver ID is required'),

  startpoint: yup
    .string()
    .required('Starting Point is required'),

  destination: yup
    .string()
    .required('Destination is required'),

  tripgoods: yup
    .string()
    .required('Trip Goods is required'),

  arrivaltime: yup
    .number()
    .positive('Arrival Time should be a positive number')
    .required('Arrival Time is required'),

  departuretime: yup
    .number()
    .positive('Departure Time should be a positive number')
    .required('Departure Time is required'),

  startfuel: yup
    .number()
    .required('Start Fuel is required'),

  endfuel: yup
    .number()
    .required('End Fuel is required'),

  fuelUsed: yup
    .number()
    .required('Fuel Used is required'),
  });
  

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



  function sentData(e) {
    e.preventDefault();

    if (validateForm()) {
      alert("Insert");

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
          window.location.reload();
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
    
    <Box m="20px">
          <Header title="ADD NEW TRIP" subtitle="Adding new tripto Fleet" />
          <button className="close-button" onClick={onClose}>
          Close
        </button>
          <Formik onSubmit={sentData} >
            
            {({ errors, handleBlur, handleChange }) => (
              <form className="addTripForm" onSubmit={sentData}>
                <center><Header title="ADD TRIP" subtitle="Adding new trip to Fleet" /></center>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >   
                  <TextField
                    fullWidth
                    variant="filled"
                    className={`form-control ${errors.tripid ? "is-invalid" : ""}`}
                    type="text"
                    label="TRIP ID"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setTripid(e.target.value);
                      setErrors({ ...errors, tripid: null });
                      handleChange(e)
                    }}
                    value={tripid}
                    name="tripid"
                  />
                  
                  
                  <TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.tripname ? "is-invalid" : ""}`}
  type="text"
  label="TRIP NAME"
  onBlur={handleBlur}
  onChange={(e) => {
    setTripname(e.target.value);
    setErrors({ ...errors, tripname: null });
    handleChange(e)
  }}
  value={tripname}
  name="tripname"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.tripduration ? "is-invalid" : ""}`}
  type="text"
  label="TRIP DURATION"
  onBlur={handleBlur}
  onChange={(e) => {
    setTripduration(e.target.value);
    setErrors({ ...errors, tripduration: null });
    handleChange(e)
  }}
  value={tripduration}
  name="tripduration"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.tripdistance ? "is-invalid" : ""}`}
  type="text"
  label="TRIP DISTANCE"
  onBlur={handleBlur}
  onChange={(e) => {
    setTripdistance(e.target.value);
    setErrors({ ...errors, tripdistance: null });
    handleChange(e)
  }}
  value={tripdistance}
  name="tripdistance"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.vehicleno ? "is-invalid" : ""}`}
  type="text"
  label="VEHICLE NO"
  onBlur={handleBlur}
  onChange={(e) => {
    setVehicleno(e.target.value);
    setErrors({ ...errors, vehicleno: null });
    handleChange(e)
  }}
  value={vehicleno}
  name="vehicleno"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.driverid ? "is-invalid" : ""}`}
  type="text"
  label="DRIVER ID"
  onBlur={handleBlur}
  onChange={(e) => {
    setDriverid(e.target.value);
    setErrors({ ...errors, driverid: null });
    handleChange(e)
  }}
  value={driverid}
  name="driverid"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.startpoint ? "is-invalid" : ""}`}
  type="text"
  label="START POINT"
  onBlur={handleBlur}
  onChange={(e) => {
    setStartpoint(e.target.value);
    setErrors({ ...errors, startpoint: null });
    handleChange(e)
  }}
  value={startpoint}
  name="startpoint"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.destination ? "is-invalid" : ""}`}
  type="text"
  label="DESTINATION"
  onBlur={handleBlur}
  onChange={(e) => {
    setDestination(e.target.value);
    setErrors({ ...errors, destination: null });
    handleChange(e)
  }}
  value={destination}
  name="destination"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.tripgoods ? "is-invalid" : ""}`}
  type="text"
  label="TRIP GOODS"
  onBlur={handleBlur}
  onChange={(e) => {
    setTripgoods(e.target.value);
    setErrors({ ...errors, tripgoods: null });
    handleChange(e)
  }}
  value={tripgoods}
  name="tripgoods"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.arrivaltime ? "is-invalid" : ""}`}
  type="text"
  label="ARRIVAL TIME"
  onBlur={handleBlur}
  onChange={(e) => {
    setArrivaltime(e.target.value);
    setErrors({ ...errors, arrivaltime: null });
    handleChange(e)
  }}
  value={arrivaltime}
  name="arrivaltime"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.departuretime ? "is-invalid" : ""}`}
  type="text"
  label="DEPARTURE TIME"
  onBlur={handleBlur}
  onChange={(e) => {
    setDeparturetime(e.target.value);
    setErrors({ ...errors, departuretime: null });
    handleChange(e)
  }}
  value={departuretime}
  name="departuretime"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.startfuel ? "is-invalid" : ""}`}
  type="text"
  label="START FUEL"
  onBlur={handleBlur}
  onChange={(e) => {
    setStartfuel(e.target.value);
    setErrors({ ...errors, startfuel: null });
    handleChange(e)
  }}
  value={startfuel}
  name="startfuel"
/>

<TextField
  fullWidth
  variant="filled"
  className={`form-control ${errors.endfuel ? "is-invalid" : ""}`}
  type="text"
  label="END FUEL"
  onBlur={handleBlur}
  onChange={(e) => {
    setEndfuel(e.target.value);
    setErrors({ ...errors, endfuel: null });
    handleChange(e)
  }}
  value={endfuel}
  name="endfuel"
/>

                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained" fullWidth>
                    ADD NEW TRIP
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
  );
};

export default AddTrip;
