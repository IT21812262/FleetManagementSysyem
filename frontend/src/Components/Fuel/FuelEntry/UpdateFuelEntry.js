import React, { useState, useEffect } from "react";
import axios from "axios";
import { /*Link*/ useLocation } from "react-router-dom";
import "./UpdateFuelEntry.css"

export default function UpdateFuelEntry() {

    const location = useLocation();
    // Set fuelEntryData based on location state or default values
    const initialFuelEntryData = location.state?.fuelEntryData || {
      vehicle_id: "",
      fuel_date: "",
      fuel_type: "",
      fuel_quantity: "",
      fuel_cost: "",
      vehicle_milage: "",
      
    };
  
  const [fuelEntryData, setFuelEntryData] = useState(initialFuelEntryData);
  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFuelEntryData({ ...fuelEntryData, [id]: value });
    validateInput(id, value);
  };

  const validateInput = (id, value) => {
    let error = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[0-9]*$/;
    const itemCodeRegex = /^[A-Za-z]{2}\d{4}$/;
    const isValidFloat = (value) => {
        return !isNaN(value) && parseFloat(value) >= 0; // Check if it's a valid float value
      };
    
    switch (id) {

    case "vehicle_id":
        error = value.length !== 6 ? "Vehicle ID must be 6 characters" : "";
        break;

    case "fuel_date":
        if (!value) {
            error = "Fuel Date is required";
        } else {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
            error = "Invalid date format";
            }
        }
        break;

    case "fuel_type":
        error = value.trim() === "" ? "Fuel Type is required" : "";
        break;

    case "fuel_quantity":
        error = isNaN(value) ? "Fuel Quantity should contain only numbers" : "";
        break;
      
    case "fuel_cost":
        error = !isValidFloat(value) ? "Total fuel cost should be a valid float value" : "";
        break;

    case "vehicle_milage":
        error = !isValidFloat(value) ? "Vehicle milage should be a valid float value" : "";
        break;

    }

    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const fetchFuelEntry = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8411/fuel/fuel_entry/get/${fuelEntryData.vehicle_id}`
      );

      const fetchedFuelEntry = response.data.fuel_entry;

      setFuelEntryData(fetchedFuelEntry);
    } catch (error) {
      alert("Error fetching fuel entry: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");

  if (hasErrors) {
    alert("Please correct the errors before updating.");
    return; // Stop the form submission
  }
    //alert("Insert");
    const { 
        vehicle_id, 
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage 
    } = fuelEntryData;

    if (fuelEntryData.vehicle_id) {
      const newFuelEntry = {
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
      };

      axios
        .put(`http://localhost:8411/fuel/fuel_entry/update/${vehicle_id}`, newFuelEntry)
        .then((response) => {
          resetForm();
          alert("Fuel Entry successfully updated.");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Vehicle ID is required.");
    }
  };

  useEffect(() => {
    const fetchFuelEntryData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/fuel/fuel_entry/get/${searchQ}`
          );

          if (response.data.fuel_entry) {
            setFuelEntryData(response.data.fuel_entry);
          }
        }
      } catch (error) {
        alert("Error fetching fuel entry: " + error.message);
      }
    };

    fetchFuelEntryData();
  }, [searchQ]);

  const resetForm = () => {
    setFuelEntryData({
        vehicle_id: "",
        fuel_date: "",
        fuel_type: "",
        fuel_quantity:"",
        fuel_cost:"",
        vehicle_milage:""
            
      // ... reset other fields as needed
    });
    setErrors({});
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Enter Vehicle ID"
        />
        <div className="form-group">
          <label htmlFor="vehicle_id">Vehicle ID</label>
          <input
            type="text"
            className={`form-control ${errors.vehicle_id ? "is-invalid" : ""}`}
            id="vehicle_id"
            placeholder="Enter Vehicle ID"
            value={fuelEntryData.vehicle_id}
            onChange={handleInputChange}
            onBlur={fetchFuelEntry}
          />
          {errors.vehicle_id && (
            <div className="invalid-feedback">{errors.vehicle_id}</div>
          )}
        </div>

        <div className="form-group">
            <label htmlFor="fuel_date">Fuel Date</label>
            <input
                type="date"
                value={fuelEntryData.fuel_date}
                className={`form-control ${errors.fuel_date ? "is-invalid" : ""}`}
                id="fuel_date"
                onChange={(e) => handleInputChange(e, "fuel_date")}
         />
            {errors.fuel_date && (
            <div className="invalid-feedback">{errors.fuel_date}</div>
         )}
        </div>

        <div className="form-group">
            <label htmlFor="fuel_type">Fuel Type</label>
            <input
                type="text"
                value={fuelEntryData.fuel_type}
                className={`form-control ${errors.fuel_type ? "is-invalid" : ""}`}
                id="fuel_type"
                placeholder="Enter Fuel Type"
                onChange={(e) => handleInputChange(e, "fuel_type")}
            />
            {errors.item_type && (
            <div className="invalid-feedback">{errors.fuel_type}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="fuel_quantity">Fuel Quantity</label>
            <input
                type="number"
                value={fuelEntryData.fuel_quantity}
                className={`form-control ${errors.fuel_quantity ? "is-invalid" : ""}`}
                id="fuel_quantity"
                placeholder="Enter Fuel Quantity"
                onChange={(e) => handleInputChange(e, "fuel_quantity")}
            />
            {errors.fuel_quantity && (
            <div className="invalid-feedback">{errors.fuel_quantity}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="fuel_cost">Fuel Cost</label>
            <input
                type="number"
                value={fuelEntryData.fuel_cost}
                className={`form-control ${errors.fuel_cost ? "is-invalid" : ""}`}
                id="fuel_cost"
                placeholder="Enter Fuel Cost"
                onChange={(e) => handleInputChange(e, "fuel_cost")}
            />
            {errors.fuel_cost && (
            <div className="invalid-feedback">{errors.fuel_cost}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="vehicle_milage">Vehicle Milage</label>
            <input
                type="number"
                value={fuelEntryData.vehicle_milage}
                className={`form-control ${errors.vehicle_milage ? "is-invalid" : ""}`}
                id="vehicle_milage"
                placeholder="Enter Vehicle Milage"
                onChange={(e) => handleInputChange(e, "vehicle_milage")}
            />
            {errors.vehicle_milage && (
            <div className="invalid-feedback">{errors.vehicle_milage}</div>
        )}
        </div>


        {/* Add more input fields and validation as needed */}
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

