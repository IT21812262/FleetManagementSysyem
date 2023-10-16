import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { Formik } from "formik";
import * as yup from 'yup';
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import "./AddEmployee.css";

const AddEmployee = ({ onClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();

  const [eid, setEid] = useState("");
  const [ename, setEname] = useState("");
  const [gender, setGender] = useState(""); // Default to "Male"
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(""); // To be selected using a calendar
  const [jobroll, setJobroll] = useState("Driver"); // Default to "Driver"
  const [bsal, setBsal] = useState("");
  const [errors, setErrors] = useState({});

  const handleDateChange = (e) => {
    setDob(e.target.value);
  };

  function sendData(e) {
    e.preventDefault();

    // Basic validation checks
    const newErrors = {};
    if (!eid) {
      newErrors.eid = "Employee ID is required.";
    }
    if (!ename) {
      newErrors.ename = "Employee Name is required.";
    }
    if (!address) {
      newErrors.address = "Address is required.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    }
    if (!dob) {
      newErrors.dob = "Date of Birth is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are validation errors, set them and prevent form submission
      setErrors(newErrors);
      return;
    }

    const newEmployee = {
      eid,
      ename,
      gender,
      address,
      phone,
      email,
      dob,
      jobroll,
      bsal,
    };

    axios
      .post("http://localhost:8411/employee/add", newEmployee)
      .then(() => {
        alert("Employee Added");
        // Clear the form data by resetting state variables
        setEid("");
        setEname("");
        setGender("Male");
        setAddress("");
        setPhone("");
        setEmail("");
        setDob("");
        setJobroll("Driver");
        setBsal("");
        setErrors({});
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <Box m="20px">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <Formik onSubmit={sendData} >
        {({ errors, touched, handleBlur, handleChange }) => (
          <form className="addEmployeeForm" onSubmit={sendData}>
            <center>
              <Header title="ADD EMPLOYEE" subtitle="Add a new employee to Fleet" />
            </center>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Employee ID"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setEid(e.target.value);
                  }}
                  value={eid}
                  name="eid"
                  error={!!touched.eid && !!errors.eid}
                  helperText={touched.eid && errors.eid}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.eid && <div className="text-danger">{errors.eid}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Employee Name"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setEname(e.target.value);
                  }}
                  value={ename}
                  name="ename"
                  error={!!touched.ename && !!errors.ename}
                  helperText={touched.ename && errors.ename}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.ename && <div className="text-danger">{errors.ename}</div>}
              </div>
              <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <FormControlLabel
          value="Male"
          control={<Radio />}
          label="Male"
        />
        <FormControlLabel
          value="Female"
          control={<Radio />}
          label="Female"
        />
      </RadioGroup>
    </FormControl>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="ADDRESS"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.address&& <div className="text-danger">{errors.address}</div>}
              </div>
              <div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 2" }}
                />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
              </div>
              <div>
              <TextField
  fullWidth
  variant="filled"
  type="email"
  label="Email"
  onChange={(e) => {
    setEmail(e.target.value);
  }}
  value={email}
  error={!!touched.email && !!errors.email}
  helperText={touched.email && errors.email}
  sx={{ gridColumn: "span 2" }}
/>
{errors.email && <div className="text-danger">{errors.email}</div>}
</div>
<div>
<TextField
  fullWidth
  variant="filled"
  type="date"
  label="Date of Birth"
  onChange={handleDateChange}
  value={dob}
  error={!!touched.dob && !!errors.dob}
  helperText={touched.dob && errors.dob}
  sx={{ gridColumn: "span 2" }}
/>
{errors.dob && <div className="text-danger">{errors.dob}</div>}
</div>
<div>
<TextField
  fullWidth
  variant="filled"
  select
  label="Job Roll"
  onChange={(e) => {
    setJobroll(e.target.value);
  }}
  value={jobroll}
  error={!!touched.jobroll && !!errors.jobroll}
  helperText={touched.jobroll && errors.jobroll}
  sx={{ gridColumn: "span 2" }}
>
  <MenuItem value="Driver">Driver</MenuItem>
  <MenuItem value="Cleaner">Cleaner</MenuItem>
  <MenuItem value="Manager">Manager</MenuItem>
</TextField>
{errors.jobroll && <div className="text-danger">{errors.jobroll}</div>}
</div>
<div>
<TextField
  fullWidth
  variant="filled"
  type="text"
  label="Basic Salary"
  onChange={(e) => {
    setBsal(e.target.value);
  }}
  value={bsal}
  sx={{ gridColumn: "span 2" }}
/></div>

            </Box>
            <center>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  ADD EMPLOYEE
                </Button>
                
              </Box>
            </center>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEmployee;
