import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./UpdateFuelStock.css"

export default function UpdateFuelStock() {

    const location = useLocation();
    // Set fuel_stockData based on location state or default values
    const initialFuelStockData = location.state?.fuel_stockData || {
      invoice_no: "",
      stocked_fuel_type: "",
      stocked_fuel_quantity: "",
      per_leter_cost: "",
      total_cost: "",
      stocked_fuel_date: "",
      
    };
  
  const [fuel_stockData, setFuelStockData] = useState(initialFuelStockData);
  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFuelStockData({ ...fuel_stockData, [id]: value });
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
        error = !isValidFloat(value) ? "Fuel per leter cost should be a valid float value" : "";
        break;

    case "total_cost":
        error = !isValidFloat(value) ? "Total cost should be a valid float value" : "";
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

    }

    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const fetchFuelStock= async () => {
    try {
      const response = await axios.get(
        `http://localhost:8411/fuel/fuel_stock/get/${fuel_stockData.invoice_no}`
      );

      const fetchedFuelStock = response.data.fuel_stock;

      setFuelStockData(fetchedFuelStock);
    } catch (error) {
      alert("Error fetching fuel stock: " + error.message);
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
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date 
    } = fuel_stockData;

    if (fuel_stockData.invoice_no) {
      const newFuelStock = {
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date
      };

      axios
        .put(`http://localhost:8411/fuel/fuel_stock/update/${invoice_no}`, newFuelStock)
        .then((response) => {
          resetForm();
          alert("Fuel Stock successfully updated.");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Invoice No is required.");
    }
  };

  useEffect(() => {
    const fetchFuelStockData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/fuel/fuel_stock/get/${searchQ}`
          );

          if (response.data.fuel_stock) {
            setFuelStockData(response.data.fuel_stock);
          }
        }
      } catch (error) {
        alert("Error fetching fuel stock: " + error.message);
      }
    };

    fetchFuelStockData();
  }, [searchQ]);

  const resetForm = () => {
    setFuelStockData({
        invoice_no: "",
        stocked_fuel_type: "",
        stocked_fuel_quantity: "",
        per_leter_cost:"",
        total_cost:"",
        stocked_fuel_date:""
            
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
          placeholder="Enter Invoice No"
        />
        <div className="form-group">
          <label htmlFor="invoice_no">Invoice No</label>
          <input
            type="text"
            className={`form-control ${errors.invoice_no ? "is-invalid" : ""}`}
            id="invoice_no"
            placeholder="Enter Invoice No"
            value={fuel_stockData.invoice_no}
            onChange={handleInputChange}
            onBlur={fetchFuelStock}
          />
          {errors.invoice_no && (
            <div className="invalid-feedback">{errors.invoice_no}</div>
          )}
        </div>

        <div className="form-group">
            <label htmlFor="stocked_fuel_type">Stocked Fuel Type</label>
            <input
                type="text"
                value={fuel_stockData.stocked_fuel_type}
                className={`form-control ${errors.stocked_fuel_type ? "is-invalid" : ""}`}
                id="stocked_fuel_type"
                placeholder="Enter Stocked Fuel Type"
                onChange={(e) => handleInputChange(e, "stocked_fuel_type")}
            />
            {errors.stocked_fuel_type && (
            <div className="invalid-feedback">{errors.stocked_fuel_type}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="stocked_fuel_quantity">Stocked Fuel Quantity</label>
            <input
                type="number"
                value={fuel_stockData.stocked_fuel_quantity}
                className={`form-control ${errors.stocked_fuel_quantity ? "is-invalid" : ""}`}
                id="stocked_fuel_quantity"
                placeholder="Enter Stocked Fuel Quantity"
                onChange={(e) => handleInputChange(e, "stocked_fuel_quantity")}
            />
            {errors.stocked_fuel_quantity && (
            <div className="invalid-feedback">{errors.stocked_fuel_quantity}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="per_leter_cost">Per Leter Cost</label>
            <input
                type="number"
                value={fuel_stockData.per_leter_cost}
                className={`form-control ${errors.per_leter_cost ? "is-invalid" : ""}`}
                id="per_leter_cost"
                placeholder="Enter Per Cost"
                onChange={(e) => handleInputChange(e, "per_leter_cost")}
            />
            {errors.per_leter_cost && (
            <div className="invalid-feedback">{errors.per_leter_cost}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="total_cost">Total Cost</label>
            <input
                type="number"
                value={fuel_stockData.total_cost}
                className={`form-control ${errors.total_cost ? "is-invalid" : ""}`}
                id="total_cost"
                placeholder="Enter Total Cost"
                onChange={(e) => handleInputChange(e, "total_cost")}
            />
            {errors.per_leter_cost && (
            <div className="invalid-feedback">{errors.total_cost}</div>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="stocked_fuel_date">Stocked Fuel Date</label>
            <input
                type="date"
                value={fuel_stockData.stocked_fuel_date}
                className={`form-control ${errors.stocked_fuel_date ? "is-invalid" : ""}`}
                id="stocked_fuel_date"
                onChange={(e) => handleInputChange(e, "stocked_fuel_date")}
         />
            {errors.stocked_fuel_date && (
            <div className="invalid-feedback">{errors.stocked_fuel_date}</div>
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

