import React, { useState, useEffect, useCallback  } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import emailjs from "emailjs-com";
import { useParams, Link } from "react-router-dom";

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



import './UniqueEmployee.css';


const UniqueEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState({
    eid: '',
    ename: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    dob: '',
    jobroll: '',
    bsal: '',
  });



  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8411/employee/get/${id}`)
      .then((res) => {
        setEmployee(res.data.employee);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8411/employee/update/${id}`, employee)
      .then((res) => {
        setMessage('Employee details updated successfully!');
      })
      .catch((err) => {
        alert(err.message);
      });
  };


  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate('/employee/employeedata');
  };
return (
  <Box m="20px">
      
      <Formik
      
        onSubmit={handleSubmit}
      >
        
        <form className="uniqueEmployeeForm" onSubmit={handleSubmit}>
        {id && (
      <Header
        title={`EDIT EMPLOYEE DATA FOR ${id}`}
        subtitle="Update Employee Data"
      />
    )}
    
  
        <Box
            display="grid"
            gap=""
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "span 4" },
            }}
          >
            <Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeName"
    label="Employee Name"
    variant="outlined"
    disabled
    value={employee.ename}
    onChange={(e) => handleInputChange(e, setEmployee, "ename")}
  />
</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <FormControl component="fieldset" className="form-groupcp">
    <FormLabel component="legend">Gender</FormLabel>
    <div>
      <input
        type="radio"
        id="male"
        name="gender"
        disabled
        value="Male"
        checked={employee.gender === 'Male'}
        onChange={(e) => handleInputChange(e, setEmployee, "gender")}
      />
      <label htmlFor="male">Male</label>
    </div>
    <div>
      <input
        type="radio"
        id="female"
        name="gender"
        
        disabled
        value="Female"
        checked={employee.gender === 'Female'}
        onChange={(e) => handleInputChange(e, setEmployee, "gender")}
      />
      <label htmlFor="female">Female</label>
    </div>
  </FormControl>
</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeAddress"
    label="Address"
    disabled
    variant="outlined"
    value={employee.address}
    onChange={(e) => handleInputChange(e, setEmployee, "address")}
  />
</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeePhone"
    disabled
    label="Phone"
    variant="outlined"
    value={employee.phone}
    onChange={(e) => handleInputChange(e, setEmployee, "phone")}
  />
</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeEmail"
    label="Email"
    disabled
    variant="outlined"
    value={employee.email}
    onChange={(e) => handleInputChange(e, setEmployee, "email")}
  />
</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeDOB"
    label="Date of Birth"
    disabled
    variant="outlined"
    type="date"
    value={employee.dob}
    onChange={(e) => handleInputChange(e, setEmployee, "dob")}
  />
</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeJobroll"
    label="Job Roll"
    disabled
    variant="outlined"
    value={employee.jobroll}
    onChange={(e) => handleInputChange(e, setEmployee, "jobroll")}
  />
</Box>

<Box display="flex" justifyContent="end" mt="20px" gap="30px">
  <TextField
    fullWidth
    id="employeeBsal"
    label="Basic Salary"
    variant="outlined"
    disabled
    value={employee.bsal}
    onChange={(e) => handleInputChange(e, setEmployee, "bsal")}
  />
</Box>


</Box>
<Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" fullWidth>
              UPDATE EMPLOYEE
            </Button>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="btnBack"
              variant="contained"
              fullWidth
              onClick={handleButtonClick}>
              BACK TO EMPLOYEE DATA
            </Button>
          </Box>
        
        </form>
        </Formik>
        </Box>
    
   
       
);

};

export default UniqueEmployee;