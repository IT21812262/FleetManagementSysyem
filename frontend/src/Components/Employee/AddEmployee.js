import React, { useState } from "react";
import axios from "axios";

export default function AddEmployee() {
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
    <div className="containercp3">
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="eid">Employee ID</label>
          <input
            type="text"
            className="form-control"
            id="eid"
            placeholder="Enter Employee ID"
            value={eid}
            onChange={(e) => {
              setEid(e.target.value);
            }}
          />
          {errors.eid && <div className="text-danger">{errors.eid}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="ename">Employee Name</label>
          <input
            type="text"
            className="form-control"
            id="ename"
            placeholder="Enter Name"
            value={ename}
            onChange={(e) => {
              setEname(e.target.value);
            }}
          />
          {errors.ename && <div className="text-danger">{errors.ename}</div>}
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          {errors.address && <div className="text-danger">{errors.address}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            value={dob}
            onChange={handleDateChange}
          />
          {errors.dob && <div className="text-danger">{errors.dob}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="jobroll">Job Roll</label>
          <select
            className="form-control"
            id="jobroll"
            value={jobroll}
            onChange={(e) => {
              setJobroll(e.target.value);
            }}
          >
            <option value="Driver">Driver</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.jobroll && <div className="text-danger">{errors.jobroll}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="bsal">Basic Salary</label>
          <input
            type="text"
            className="form-control"
            id="bsal"
            placeholder="Enter Basic Salary"
            value={bsal}
            onChange={(e) => {
              setBsal(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
