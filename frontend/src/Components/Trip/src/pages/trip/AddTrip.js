import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

const AddTrip = ({ onClose }) => {
  const initialValues = {
    tripid: 0, // Set the initial value as a number (e.g., 0)
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

  const validationSchema = yup.object().shape({
    tripid: yup
      .number()
      .integer("Trip ID must be an integer")
      .positive("Trip ID must be a positive number")
      .required("Trip ID is required"),
    tripname: yup
      .string()
      .max(10, "Trip Name must have a maximum of 10 characters")
      .required("Trip Name is required"),
    tripduration: yup
      .number()
      .positive("Trip Duration should be a positive number")
      .max(100, "Trip Duration should not exceed 50 hours")
      .required("Trip Duration is required"),
    tripdistance: yup
      .number()
      .positive("Trip Distance should be a positive number")
      .max(600, "Trip Distance should not exceed 300 kilometers")
      .required("Trip Distance is required"),
    vehicleno: yup
      .string()
      .matches(/^\d{6}$/, "Vehicle Number must have 6 numbers")
      .required("Vehicle Number is required"),
    driverid: yup.string().required("Driver ID is required"),
    startpoint: yup.string().required("Starting Point is required"),
    destination: yup.string().required("Destination is required"),
    tripgoods: yup.string().required("Trip Goods is required"),
    arrivaltime: yup
      .number()
      .positive("Arrival Time should be a positive number")
      .required("Arrival Time is required"),
    departuretime: yup
      .number()
      .positive("Departure Time should be a positive number")
      .required("Departure Time is required"),
    startfuel: yup.number().required("Start Fuel is required"),
    endfuel: yup.number().required("End Fuel is required"),
    fuelUsed: yup.number().required("Fuel Used is required"),
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
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    } else if (
      isNaN(tripduration) ||
      parseFloat(tripduration) <= 0 ||
      parseFloat(tripduration) > 50
    ) {
      errors.tripduration =
        "Trip Duration should be a positive number and not exceed 50 hours";
    }

    // Validate Trip Distance
    if (!tripdistance) {
      errors.tripdistance = "Trip Distance is required";
    } else if (
      isNaN(tripdistance) ||
      parseFloat(tripdistance) <= 0 ||
      parseFloat(tripdistance) > 300
    ) {
      errors.tripdistance =
        "Trip Distance should be a positive number and not exceed 300 kilometers";
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
    }

    // Validate Starting Point
    if (!startpoint) {
      errors.startpoint = "Starting Point is required";
    }

    // Validate Destination
    if (!destination) {
      errors.destination = "Destination is required";
    }

    // Validate Trip Goods
    if (!tripgoods) {
      errors.tripgoods = "Trip Goods is required";
    }

    // Validate Arrival Time
    if (!arrivaltime) {
      errors.arrivaltime = "Arrival Time is required";
    }

    // Validate Departure Time
    if (!departuretime) {
      errors.departuretime = "Departure Time is required";
    }

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
          alert("Trip added successfully");
          window.location.href = "/tripdata"
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
      <Header title="ADD NEW TRIP" subtitle="Adding a new trip to Fleet" />
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={sentData} 
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: "span 1" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="TRIP ID"
                name="tripid"
                value={values.tripid}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tripid && errors.tripid}
                helperText={touched.tripid && errors.tripid}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="TRIP NAME"
                name="tripname"
                value={values.tripname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tripname && errors.tripname}
                helperText={touched.tripname && errors.tripname}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="TRIP DURATION"
                name="tripduration"
                value={values.tripduration}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tripduration && errors.tripduration}
                helperText={touched.tripduration && errors.tripduration}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="TRIP DISTANCE"
                name="tripdistance"
                value={values.tripdistance}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tripdistance && errors.tripdistance}
                helperText={touched.tripdistance && errors.tripdistance}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="VEHICLE NO"
                name="vehicleno"
                value={values.vehicleno}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.vehicleno && errors.vehicleno}
                helperText={touched.vehicleno && errors.vehicleno}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="DRIVER ID"
                name="driverid"
                value={values.driverid}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.driverid && errors.driverid}
                helperText={touched.driverid && errors.driverid}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="START POINT"
                name="startpoint"
                value={values.startpoint}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.startpoint && errors.startpoint}
                helperText={touched.startpoint && errors.startpoint}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="DESTINATION"
                name="destination"
                value={values.destination}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.destination && errors.destination}
                helperText={touched.destination && errors.destination}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="TRIP GOODS"
                name="tripgoods"
                value={values.tripgoods}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.tripgoods && errors.tripgoods}
                helperText={touched.tripgoods && errors.tripgoods}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="ARRIVAL TIME"
                name="arrivaltime"
                value={values.arrivaltime}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.arrivaltime && errors.arrivaltime}
                helperText={touched.arrivaltime && errors.arrivaltime}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="DEPARTURE TIME"
                name="departuretime"
                value={values.departuretime}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.departuretime && errors.departuretime}
                helperText={touched.departuretime && errors.departuretime}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="START FUEL"
                name="startfuel"
                value={values.startfuel}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.startfuel && errors.startfuel}
                helperText={touched.startfuel && errors.startfuel}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="END FUEL"
                name="endfuel"
                value={values.endfuel}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.endfuel && errors.endfuel}
                helperText={touched.endfuel && errors.endfuel}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="FUEL USED"
                name="fuelUsed"
                value={values.fuelUsed}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fuelUsed && errors.fuelUsed}
                helperText={touched.fuelUsed && errors.fuelUsed}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                ADD NEW TRIP
              </Button>
            </Box>
            {successMessage && (
              <Typography variant="success" sx={{ marginTop: 2 }}>
                {successMessage}
              </Typography>
            )}
            {errorMessage && (
              <Typography variant="error" sx={{ marginTop: 2 }}>
                {errorMessage}
              </Typography>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddTrip;
