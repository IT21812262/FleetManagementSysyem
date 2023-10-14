import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, FormControl, Select, MenuItem, TextareaAutosize } from '@mui/material';
import { useLocation, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from 'yup';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

import "./UpdateMaintenance.css";

export default function UpdateMaintenanceJob() {
  const { id } = useParams();
  const [jobData, setJobData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`http://localhost:8411/corrective/get/${id}`);
        setJobData(response.data.correctiveMaintenance);
      } catch (error) {
        alert('Error fetching job data:', error.message);
      }
    };

    fetchJobData();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setJobData({ ...jobData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8411/corrective/update/${id}`,
        jobData
      );

      if (response.status === 200) {
        alert("Job successfully updated.");
        window.location.href ="/maintenance";
      } else {
        alert("Failed to update job.");
      }
    } catch (error) {
      alert('Error updating job:', error.message);
    }
  };
  const priorityOptions = [
    "High Priority",
    "Medium Priority",
    "Low Priority",
    "In Progress",
    "Completed",
  ];

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Update Maintenance Job
      </Typography>

      <Formik initialValues={jobData} onSubmit={handleSubmit}>
        <Form>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Job ID"
            id="jobId"
            disabled
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Driver ID"
            id="DID"
            disabled
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Vehicle Number"
            id="vehicleNo"
            disabled
          />

          <FormControl fullWidth variant="filled">
            <label htmlFor="priority">Priority</label>
            <Select
              id="priority"
              value={jobData.priority}
              onChange={handleInputChange}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextareaAutosize
            className="form-control"
            id="description"
            rowsMin={3}
            placeholder="Description"
            value={jobData.description}
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Parts Used"
            id="parts_used"
            value={jobData.parts_used}
            onChange={handleInputChange}
          />

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" fullWidth>
              Update Job
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
}
