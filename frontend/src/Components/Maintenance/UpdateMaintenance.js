import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UpdateMaintenance";

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
  const [priorityOptions, setPriorityOptions] = useState([
    "High Priority",
    "Medium Priority",
    "Low Priority",
    "In Progress",
    "Completed",
  ]);

  return (
<div className="container">
      <h1>Update Maintenance Job</h1>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="jobId">Job ID</label>
          <input
            type="text"
            className="form-control"
            id="jobId"
            value={jobData.jobID}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="DID">Driver ID</label>
          <input
            type="text"
            className="form-control"
            id="DID"
            value={jobData.DID}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicleNo">Vehicle Number</label>
          <input
            type="text"
            className="form-control"
            id="vehicleNo"
            value={jobData.vehicleNo}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={jobData.priority}
            onChange={handleInputChange}
          >
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>


        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={jobData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="parts_used">Parts Used</label>
          <input
            type="text"
            className="form-control"
            id="parts_used"
            value={jobData.parts_used}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Job
        </button>
      </form>
    </div>
  );
}

