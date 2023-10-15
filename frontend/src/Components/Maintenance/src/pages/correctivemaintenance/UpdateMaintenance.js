import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from 'yup';
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

    switch (id) {

      case "invoice_no":
        error = value.length !== 6 ? "Invoice No must be 6 characters" : "";
        break;

      case "stocked_fuel_type":
        error = value.trim() === "" ? "Stocked Fuel Type is required" : "";
        break;

      case "stocked_fuel_quantity":
        error = isNaN(value) ? "Stocked Fuel Quantity should contain only numbers" : "";
        break;
      
      case "per_leter_cost":
        error = !/^\d+(\.\d+)?$/.test(value) ? "Unit Price should be a valid float value" : "";
        break;    

      case "stocked_fuel_date":
        if (!value) {
            error = "Stocked Fuel Date is required";
        } else {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
            error = "Invalid date format";
            }
        }
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

    const newMaintenance = { ...maintenanceData };

    if (newMaintenance.jobID) {
      axios
        .put(`http://localhost:8411/corrective/update/${newMaintenance.jobID}`, newMaintenance)
        .then((response) => {
          resetForm();
          //alert("Fuel entry successfully updated.");
          window.location.href = "/fuel/fuelstock";
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Invoice No is required.");
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
          alert("Fuel stock successfully updated.");
          window.location.href = "/fuel/allFuelstocks";
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Invoice No is required.");
    }
  };

  useEffect(() => {
    const fetchFuelstockData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/corrective/get/${searchQ}`
          );

          if (response.data.fuelstock) {
            setMaintenanceData(response.data.fuelstock);
          }
        }
      } catch (error) {
        alert("Error fetching fuel stock: " + error.message);
      }
    };

    fetchFuelstockData();
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

  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };
  const navigate = useNavigate();

  // Use navigate function to programmatically navigate to a different route
  const handleButtonClick = () => {
    navigate('/fuel/fuelstock');
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
            variant="filled"
            type="text"
            label="JOB ID"
            id="jobID"
            onChange={handleInputChange}
            value={maintenanceData.jobID}
            name="jobID"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="DID"
            id="DID"
            onChange={(e) => handleInputChange(e, "DID")}
            value={maintenanceData.DID}
            name="DID"
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
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
            label="VEHICLE NO"
            id="vehicleNo"
            onChange={(e) => handleInputChange(e, "vehicleNo")}
            value={maintenanceData.vehicleNo}
            name="vehicleNo"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="DATE REPORT"
            id="Date_report"
            onChange={(e) => handleInputChange(e, "Date_report")}
            value={maintenanceData.Date_report}
            name="Date_report"
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
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
            label="PRIORITY"
            id="priority"
            onChange={(e) => handleInputChange(e, "priority")}
            value={maintenanceData.priority}
            name="priority"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="DESCRIPTION"
            id="description"
            onChange={(e) => handleInputChange(e, "description")}
            value={maintenanceData.description}
            name="description"
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
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
            label="PARTS USED"
            id="parts_used"
            onChange={(e) => handleInputChange(e, "parts_used")}
            value={maintenanceData.parts_used}
            name="parts_used"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="DATE COMPLETE"
            id="Date_complete"
            onChange={(e) => handleInputChange(e, "Date_complete")}
            value={maintenanceData.Date_complete}
            name="Date_complete"
            sx={{ gridColumn: "span 2" }}
          />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" fullWidth>
              UPDATE FUEL STOCK
            </Button>
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="btnBack"
              variant="contained"
              fullWidth
              onClick={handleButtonClick}>
              BACK TO FUEL STOCK MANAGER
            </Button>
          </Box>
        </form>
      </Formik>
    </Box>
  );
};

export default UpdateMaintenance;
