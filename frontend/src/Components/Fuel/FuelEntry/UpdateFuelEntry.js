import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./UpdateFuelentry.css";

export default function UpdateFuelentry() {

    const location = useLocation();
  
    const [fuelentryData, setFuelentryData] = useState(
      location.state?.fuelentryData || {
        vehicle_id: "",
        fuel_date: "",
        fuel_type: "",
        fuel_quantity: "",
        fuel_cost: "",
        vehicle_milage: "",
      }
    );
  
  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
  const { id, value } = e.target;
  let newValue = value;
  
    setFuelentryData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  
    validateInput(id, newValue);
  };
  
  const validateInput = (id, value) => {
    let error = "";
    
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
        error = !/^\d+(\.\d+)?$/.test(value) ? "Unit Price should be a valid float value" : "";
        break;

      case "vehicle_milage":
        error = !/^\d+(\.\d+)?$/.test(value) ? "Unit Price should be a valid float value" : "";
        break;

      default:
        break;

    }
    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const fetchFuelentry = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8411/fuelentry/get/${fuelentryData.invoice_no}`
      );

      const fetchedFuelentry = response.data.fuelentry;

      setFuelentryData(fetchedFuelentry);
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

  const newFuelentry = { ...fuelentryData };

  if (newFuelentry.vehicle_id) {
    axios
      .put(`http://localhost:8411/fuelentry/update/${newFuelentry.vehicle_id}`, newFuelentry)
      .then((response) => {
        resetForm();
        //alert("Fuel entry successfully updated.");
        window.location.href = "/fuel/allFuelentries";
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    alert("Vehicle Id is required.");
  }
    //alert("Insert");
    const { 
      vehicle_id, 
      fuel_date,
      fuel_type,
      fuel_quantity,
      fuel_cost,
      vehicle_milage 
        
    } = fuelentryData;

    if (fuelentryData.vehicle_id) {
      const newFuelentry = {
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
      };

      axios
        .put(`http://localhost:8411/fuelentry/update/${vehicle_id}`, newFuelentry)
        .then((response) => {
          resetForm();
          alert("Fuel entry successfully updated.");
          window.location.href = "/fuel/allFuelentries"; 
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Vehicle Id is required.");
    }
  };

  useEffect(() => {
    const fetchFuelentryData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/fuelentry/get/${searchQ}`
          );

          if (response.data.fuelentry) {
            setFuelentryData(response.data.fuelentry);
          }
        }
      } catch (error) {
        alert("Error fetching fuel entry: " + error.message);
      }
    };

    fetchFuelentryData();
  }, [searchQ]);

  const resetForm = () => {
    setFuelentryData({
      vehicle_id: "",
      fuel_date: "",
      fuel_type: "",
      fuel_quantity:"",
      fuel_cost:"",
      vehicle_milage:""
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
          <label htmlFor="vehicle_Id">Vehicle ID</label>
          <input
            type="text"
            className={`form-control ${errors.vehicle_id ? "is-invalid" : ""}`}
            id="vehicle_Id"
            placeholder="Enter Vehicle ID"
            value={fuelentryData.vehicle_id}
            onChange={handleInputChange}
            onBlur={fetchFuelentry}
          />
          {errors.vehicle_id && (
            <div className="invalid-feedback">{errors.vehicle_id}</div>
          )}
        </div>

        <div className="form-group">
            <label htmlFor="fuel_Date">Fuel Date</label>
            <input
                type="date"
                value={fuelentryData.fuel_date}
                className={`form-control ${errors.fuel_date ? "is-invalid" : ""}`}
                id="fuel_Date"
                onChange={(e) => handleInputChange(e, "fuel_Date")}
         />
            {errors.fuel_date && (
            <div className="invalid-feedback">{errors.fuel_date}</div>
         )}
        </div>

        <div className="form-group">
            <label htmlFor="fuel_Type">Fuel Type</label>
            <input
                type="text"
                value={fuelentryData.fuel_type}
                className={`form-control ${errors.fuel_type ? "is-invalid" : ""}`}
                id="fuel_Type"
                placeholder="Enter Fuel Type"
                onChange={(e) => handleInputChange(e, "fuel_Type")}
            />
            {errors.fuel_type && (
            <div className="invalid-feedback">{errors.fuel_type}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="fuel_Quantity">Fuel Quantity</label>
            <input
                type="number"
                value={fuelentryData.fuel_quantity}
                className={`form-control ${errors.fuel_quantity ? "is-invalid" : ""}`}
                id="fuel_Quantity"
                placeholder="Enter Fuel Quantity"
                onChange={(e) => handleInputChange(e, "fuel_Quantity")}
            />
            {errors.fuel_quantity && (
            <div className="invalid-feedback">{errors.fuel_quantity}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="fuel_cost">Fuel Cost</label>
            <input
                type="number"
                value={fuelentryData.fuel_cost}
                className={`form-control ${errors.fuel_cost ? "is-invalid" : ""}`}
                id="fuel_Cost"
                placeholder="Enter Fuel Cost"
                onChange={(e) => handleInputChange(e, "fuel_Cost")}
            />
            {errors.fuel_cost && (
            <div className="invalid-feedback">{errors.fuel_cost}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="vehicle_Milage">Vehicle Milage</label>
            <input
                type="number"
                value={fuelentryData.vehicle_milage}
                className={`form-control ${errors.vehicle_milage ? "is-invalid" : ""}`}
                id="vehicle_Milage"
                placeholder="Enter Vehicle Milage"
                onChange={(e) => handleInputChange(e, "vehicle_Milage")}
            />
            {errors.vehicle_milage && (
            <div className="invalid-feedback">{errors.vehicle_milage}</div>
        )}
        </div>


        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

