import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

import "./UpdateMaintenance.css";

const UpdateMaintenance = () => {
  const location = useLocation();

  const [maintenanceData, setMaintenanceData] = useState(
    location.state?.maintenanceData || {
      jobID: "",
      DID: "",
      vehicleNo: "",
      Date_report: "",
      priority: "",
      description: "",
      parts_used: "",
      Date_complete: "",
      latitude: "",
      longitude: ""
    }
  );

  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    setMaintenanceData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));

    validateInput(id, newValue);
  };

  const validateInput = (id, value) => {
    let error = "";

    // switch (id) {

    //   case "invoice_no":
    //     error = value.length !== 6 ? "Invoice No must be 6 characters" : "";
    //     break;

    //   case "stocked_fuel_type":
    //     error = value.trim() === "" ? "Stocked Fuel Type is required" : "";
    //     break;

    //   case "stocked_fuel_quantity":
    //     error = isNaN(value) ? "Stocked Fuel Quantity should contain only numbers" : "";
    //     break;
      
    //   case "per_leter_cost":
    //     error = !/^\d+(\.\d+)?$/.test(value) ? "Unit Price should be a valid float value" : "";
    //     break;    

    //   case "stocked_fuel_date":
    //     if (!value) {
    //         error = "Stocked Fuel Date is required";
    //     } else {
    //         const date = new Date(value);
    //         if (isNaN(date.getTime())) {
    //         error = "Invalid date format";
    //         }
    //     }
    //     break;  
            
    //   default:
    //     break;

    //}
    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      alert("Please correct the errors before updating.");
      return; // Stop the form submission
    }

    const newMaintenance = { ...maintenanceData };

    if (newMaintenance.jobID) {
      axios
        .put(`http://localhost:8411/corrective/update/${newMaintenance.jobID}`, newMaintenance)
        .then((response) => {
          resetForm();
          //alert("Fuel entry successfully updated.");
          window.location.href = "/maintenance";
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Job ID is required.");
    }
    //alert("Insert");
    const {
      jobID,
      DID,
      vehicleNo,
      Date_report,
      priority,
      description,
      parts_used,
      Date_complete,
      latitude,
      longitude
    } = maintenanceData;

    if (maintenanceData.jobID) {
      const newMaintenance = {
        jobID,
        DID,
        vehicleNo,
        Date_report,
        priority,
        description,
        parts_used,
        Date_complete,
        latitude,
        longitude
      };

      axios
        .put(`http://localhost:8411/corrective/update/${jobID}`, newMaintenance)
        .then((response) => {
          resetForm();
          alert("Maintenance successfully updated.");
          window.location.href = "/maintenance";
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Job ID is required.");
    }
  };

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/corrective/get/${searchQ}`
          );

          if (response.data.maintenanceData) {
            setMaintenanceData(response.data.maintenanceData);
          }
        }
      } catch (error) {
        alert("Error fetching Maintenance: " + error.message);
      }
    };

    fetchMaintenanceData();
  }, [searchQ]);

  const resetForm = () => {
    setMaintenanceData({
      jobID: "",
      DID: "",
      vehicleNo: "",
      Date_report: "",
      priority: "",
      description: "",
      parts_used: "",
      Date_complete: "",
      latitude: "",
      longitude: ""
    });
    setErrors({});
  };


  const navigate = useNavigate();

  // Use navigate function to programmatically navigate to a different route
  const handleButtonClick = () => {
    navigate('/maintenance');
  };
  return (
    <Box m="20px">
      
      <Formik
      
        onSubmit={handleSubmit}
      >
        
        <form className="updateMaintenanceForm" onSubmit={handleSubmit}>
        
        {maintenanceData.jobID && (
      <Header
        title={`EDIT MAINTENANCE DATA DATA FOR ${maintenanceData.jobID}`}
        subtitle="Update Maintenance Data"
      />
    )}
   
   <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Enter Job ID to Update"
          id="jobID"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Enter Job ID"
          name="jobID"
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
            variant="outlined"
            
           label="JOB ID"
            id="jobID"
            onChange={handleInputChange}
            value={maintenanceData.jobID}
            error={!!errors.jobID}
            helperText={errors.jobID}
          />
         
           <TextField
            fullWidth
            variant="outlined"            
           label="DID"
            id="DID"
            onChange={handleInputChange}
            value={maintenanceData.DID}
            error={!!errors.DID}
            helperText={errors.DID}
          />
      
          <TextField
            fullWidth
            variant="outlined"            
           label="VEHICLE NUMBER"
            id="vehicleNo"
            onChange={handleInputChange}
            value={maintenanceData.vehicleNo}
            error={!!errors.vehicleNo}
            helperText={errors.vehicleNo}
          />
            <TextField
    fullWidth
    id="Date_report"
    label="DATE REPORT"
    variant="outlined"
    type="date"
    value={maintenanceData.Date_report}
    onChange={(e) => handleInputChange(e, "Date_report")}
    error={!!errors.Date_report}
    helperText={errors.Date_report}
  />
        
       
        
        <TextField
            fullWidth
            variant="outlined"            
           label="DESCRIPTION"
            id="description"
            onChange={handleInputChange}
            value={maintenanceData.description}
            error={!!errors.description}
            helperText={errors.description}
          />
       
       <TextField
            fullWidth
            variant="outlined"            
           label="PARTS USED"
            id="parts_used"
            onChange={handleInputChange}
            value={maintenanceData.parts_used}
            error={!!errors.parts_used}
            helperText={errors.parts_used}
          />
          <TextField
    fullWidth
    id="Date_complete"
    label="DATE COMPLETE"
    variant="outlined"
    type="date"
    value={maintenanceData.Date_complete}
    onChange={(e) => handleInputChange(e, "Date_complete")}
    error={!!errors.Date_complete}
    helperText={errors.Date_complete}
  />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" fullWidth>
              UPDATE MAINTENANCE
            </Button>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="btnBack"
              variant="contained"
              fullWidth
              onClick={handleButtonClick}>
              BACK TO MAINTENANCE MANAGER
            </Button>
          </Box>
        </form>
      </Formik>
    </Box>
  );
};

export default UpdateMaintenance;
