import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import Header from "../../components/Header";

export default function UpdateMaintenanceJob() {
  const { id } = useParams();
  const [jobData, setJobData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`http://localhost:8411/corrective/get/${id}`);
        setJobData(response.data.correctiveMaintence);
      } catch (error) {
        alert('Error fetching job data:', error.message);
      }
    };

    fetchJobData();
  }, [id]);
  const validateVehicleNumber = (vehicleNo) => {
    const vehicleNumberRegex = /^[A-Z0-9]{2,3}-[0-9]{4}$/;
    return vehicleNumberRegex.test(vehicleNo);
  };

  // const formatDate = (dateStr) => {
  //   const date = new Date(dateStr);
  //   const formattedDate = date.toLocaleDateString(); // Format the date as needed
  //   return formattedDate;
  // };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setJobData({ ...jobData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateVehicleNumber(jobData.vehicleNo)) {
      setErrors({ ...errors, vehicleNo: "Invalid vehicle number format" });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8411/corrective/update/${id}`,
        jobData
      );

      if (response.status === 200) {
        alert("Job successfully updated.");
        window.location.href = "/maintenance";
      } else {
        alert("Failed to update job.");
      }
    } catch (error) {
      alert('Error updating job:', error.message);
    }
  };

  return (
    <Box m="20px">
      <Formik onSubmit={handleSubmit}>
        <form className="updateMaintenanceForm" onSubmit={handleSubmit}>
          {jobData.jobID && (
            <Header
              title={`EDIT MAINTENANCE DATA FOR ${jobData.jobID}`}
              subtitle="Update Maintenance Data"
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
           <Box display="flex" justifyContent="end" mt="20px" gap="30px"></Box>
            <TextField
              fullWidth
              variant="outlined"
              label=""
              id="jobID"
              onChange={handleInputChange}
              value={jobData.jobID}
              error={!!errors.jobID}
              helperText={errors.jobID}
              disabled
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px" gap="30px">
            <TextField
              fullWidth
              variant="outlined"
              label=""
              id="DID"
              onChange={handleInputChange}
              value={jobData.DID}
              error={!!errors.DID}
              helperText={errors.DID}
              disabled
            />

            <TextField
              fullWidth
              variant="outlined"
              label=""
              id="vehicleNo"
              onChange={handleInputChange}
              value={jobData.vehicleNo}
              error={!!errors.vehicleNo}
              helperText={errors.vehicleNo}
              disabled
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px" gap="30px">
          <TextField
              fullWidth
              variant="outlined"
              label="Status"
              id="priority"
              onChange={handleInputChange}
              value={jobData.priority}
              error={!!errors.priority}
              helperText={errors.priority}
            />

            

          <TextField
            fullWidth
            id="Date_report"
            label="Date Report"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={jobData.Date_report?.split('T')[0]}
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
            value={jobData.description}
            error={!!errors.description}
            helperText={errors.description}
          />
       </Box>
        <Box display="flex" justifyContent="end" mt="20px" gap="30px">
       <TextField
            fullWidth
            variant="outlined"            
           label="PARTS USED"
            id="parts_used"
            onChange={handleInputChange}
            value={jobData.parts_used}
            error={!!errors.parts_used}
            helperText={errors.parts_used}
          />
          
          <TextField
            fullWidth
            id="Date_complete"
            label="DATE COMPLETE"
            variant="outlined"
            type="date"
            value={jobData.Date_complete?.split('T')[0]}
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
              onClick={handleSubmit}
            >
              BACK TO MAINTENANCE MANAGER
            </Button>
          </Box>
        </form>
      </Formik>
    </Box>
  );
}
