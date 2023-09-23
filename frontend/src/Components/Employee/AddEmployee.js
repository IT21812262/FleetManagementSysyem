import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function AddEmployee() {
  const [eid, setEid] = useState("");
  const [ename, setEname] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(null);
  const [jobroll, setJobroll] = useState("");
  const [bsal, setBsal] = useState("");
  const [errors, setErrors] = useState({});

  function sendData(e) {
    e.preventDefault();

    const newErrors = {};
    if (!eid) {
      newErrors.eid = "Employee ID is required.";
    }
    if (!ename) {
      newErrors.ename = "Employee Name is required.";
    }
    if (!gender) {
      newErrors.gender = "Gender is required.";
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
    if (!jobroll) {
      newErrors.jobroll = "Job Roll is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convert DOB to a string in "yyyy-MM-dd" format
    const formattedDob = dob ? dob.toLocaleDateString("en-GB") : null;

    const newEmployee = {
      eid,
      ename,
      gender,
      address,
      phone,
      email,
      dob: formattedDob,
      jobroll,
      bsal,
    };

    axios
      .post("http://localhost:8411/employee/add", newEmployee)
      .then(() => {
        alert("Employee Added");
        setEid("");
        setEname("");
        setGender("");
        setAddress("");
        setPhone("");
        setEmail("");
        setDob(null);
        setJobroll("");
        setBsal("");
        setErrors({});
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
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
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            placeholder="Enter Gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
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
          <label>Date of Birth</label>
          <br />
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            className="form-control"
          />
          {errors.dob && <div className="text-danger">{errors.dob}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="jobroll">Job Roll</label>
          <input
            type="text"
            className="form-control"
            id="jobroll"
            placeholder="Enter Job Roll"
            value={jobroll}
            onChange={(e) => {
              setJobroll(e.target.value);
            }}
          />
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
