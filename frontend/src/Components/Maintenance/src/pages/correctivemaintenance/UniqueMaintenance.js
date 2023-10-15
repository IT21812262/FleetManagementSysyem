import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Link as MUILink } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UniqueMaintenanceJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/corrective/get/${id}`);
          setJob(response.data.correctiveMaintence);
        }
      } catch (error) {
        alert('Error fetching maintenance job:', error.message);
      }
    };

    fetchJobData();
  }, [id]);
  
  const handleDelete = async (jobID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this maintenance job?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8411/corrective/delete/${jobID}`);
        alert('Maintenance job deleted successfully.');
        navigate("/maintenance");
      } catch (error) {
        alert('Error deleting maintenance job:', error.message);
      }
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" component="h1"><b>Corrective Maintenance Job</b></Typography>

      {job ? (
        <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
          <List>
            <ListItem><ListItemText primary="Job ID" secondary={job.jobID} /></ListItem>
            <ListItem><ListItemText primary="Priority" secondary={job.priority} /></ListItem>
            <ListItem><ListItemText primary="Vehicle Number" secondary={job.vehicleNo} /></ListItem>
            <ListItem><ListItemText primary="Date Report" secondary={job.Date_report} /></ListItem>
            <ListItem><ListItemText primary="Description" secondary={job.description} /></ListItem>
            <ListItem><ListItemText primary="Parts Used" secondary={job.parts_used} /></ListItem>
          </List>
          <Box mt={2}>
            <Button variant="contained" color="error" onClick={() => handleDelete(job.jobID)}>Delete Job</Button>
            <MUILink component={Button} variant="contained" color="primary" href={`maintenance/update/${job.jobID}`} style={{ marginLeft: '10px' }}>
              Update Job
            </MUILink>
          </Box>
        </Paper>
      ) : (
        <Typography variant="h6">No maintenance job found with the specified ID.</Typography>
      )}
    </Box>
  );
}
