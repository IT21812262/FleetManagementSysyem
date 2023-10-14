import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./UniqueMaintenanceJob.css";

export default function UniqueMaintenanceJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

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
    // Display a confirmation dialog before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this maintenance job?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8411/corrective/delete/${jobID}`);
        alert('Maintenance job deleted successfully.');
        window.location.href = "/maintenance";
      } catch (error) {
        alert('Error deleting maintenance job:', error.message);
      }
    }
  };

  return (
    <div className="containeryt">
      <h1><b>Corrective Maintenance Job</b></h1>

      {job ? (
        <ul>
          <li key={job.jobID}>
            <b>Job ID:</b> {job.jobID}<br />
            <b>Priority:</b> {job.priority}<br />
            <b>Vehicle Number:</b> {job.vehicleNo}<br />
            <b>Date Report:</b> {job.Date_report}<br />
            <b>Description:</b> {job.description}<br />
            <b>Parts Used:</b> {job.parts_used}<br />
            {/* Date Complete: {job.Date_complete}<br /> */}
            <h2>Error Reported Location</h2>
          <LoadScript googleMapsApiKey="AIzaSyAz27qe4QY9J6XxL_8VmOW4AiA8xr4uuUU">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{ lat: parseFloat(job.latitude), lng: parseFloat(job.longitude) }}
              zoom={20}
            >
              <Marker position={{ lat: parseFloat(job.latitude), lng: parseFloat(job.longitude) }} />
            </GoogleMap>
          </LoadScript>
            <button onClick={() => handleDelete(job.jobID)}>Delete Job</button>
            <Link to={`maintenance/update/${job.jobID}`} className="btn btn-primary">
              Update Job
            </Link>
          </li>
          
        </ul>
        
      ) : (
        <p>No maintenance job found with the specified ID.</p>
      )}
    </div>
  );
}
