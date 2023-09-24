import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./UpdateFuelstock.css";

export default function UpdateFuelstock() {

    const location = useLocation();
  
    const [fuelstockData, setFuelstockData] = useState(
      location.state?.fuelstockData || {
        invoice_no: "",
        stocked_fuel_type: "",
        stocked_fuel_quantity: "",
        per_leter_cost: "",
        total_cost: "",
        stocked_fuel_date: "",
      }
    );
  
  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;
  
    if (id === "per_Leter_Cost" || id === "stocked_Fuel_Quantity") {
      const perLeterCost = parseFloat(value);
      const stockedFuelQuantity = parseFloat(fuelstockData.stocked_fuel_quantity);
      const totalCost = isNaN(perLeterCost) || isNaN(stockedFuelQuantity) ? "" : (perLeterCost * stockedFuelQuantity).toFixed(2);
      newValue = totalCost;
    }
  
    setFuelstockData((prevData) => ({
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

  const fetchFuelstock = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8411/fuel/get/${fuelstockData.invoice_no}`
      );

      const fetchedFuelstock = response.data.fuelstock;

      setFuelstockData(fetchedFuelstock);
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

  const newFuelstock = { ...fuelstockData };

  if (newFuelstock.invoice_no) {
    axios
      .put(`http://localhost:8411/fuel/update/${newFuelstock.invoice_no}`, newFuelstock)
      .then((response) => {
        resetForm();
        //alert("Fuel stock successfully updated.");
        window.location.href = "/fuel/allFuelstocks";
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    alert("Invoice No is required.");
  }
    //alert("Insert");
    const { 
      invoice_no,
      stocked_fuel_type,
      stocked_fuel_quantity,
      per_leter_cost,
      total_cost,
      stocked_fuel_date 
        
    } = fuelstockData;

    if (fuelstockData.invoice_no) {
      const newFuelstock = {
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date
      };

      axios
        .put(`http://localhost:8411/fuel/update/${invoice_no}`, newFuelstock)
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
            `http://localhost:8411/fuel/get/${searchQ}`
          );

          if (response.data.fuelstock) {
            setFuelstockData(response.data.fuelstock);
          }
        }
      } catch (error) {
        alert("Error fetching fuel stock: " + error.message);
      }
    };

    fetchFuelstockData();
  }, [searchQ]);

  const resetForm = () => {
    setFuelstockData({
      invoice_no: "",
      stocked_fuel_type: "",
      stocked_fuel_quantity: "",
      per_leter_cost:"",
      total_cost:"",
      stocked_fuel_date:""
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
          <label htmlFor="invoice_No">Invoice No</label>
          <input
            type="text"
            className={`form-control ${errors.invoice_no ? "is-invalid" : ""}`}
            id="invoice_No"
            placeholder="Enter Invoice No"
            value={fuelstockData.invoice_no}
            onChange={handleInputChange}
            onBlur={fetchFuelstock}
          />
          {errors.invoice_no && (
            <div className="invalid-feedback">{errors.invoice_no}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="stocked_Fuel_Type">Stocked Fuel Type</label>
          <input
            type="text"
            className={`form-control ${errors.stocked_fuel_type ? "is-invalid" : ""}`}
            id="stocked_Fuel_Type"
            placeholder="Enter Stocked Fuel Type"
            value={fuelstockData.stocked_fuel_type}
            onChange={handleInputChange}
            onBlur={fetchFuelstock}
          />
          {errors.stocked_fuel_type && (
            <div className="invalid-feedback">{errors.stocked_fuel_type}</div>
          )}
        </div>

        

        <div className="form-group">
          <label htmlFor="stocked_Fuel_Quantity">Stocked Fuel Quantity</label>
          <input
            type="number"
            value={fuelstockData.stocked_fuel_quantity}
            className={`form-control ${errors.stocked_fuel_quantity ? "is-invalid" : ""}`}
            id="stocked_Fuel_Quantity"
            placeholder="Enter Stocked Fuel Quantity"
            onChange={handleInputChange}
          />
          {errors.stocked_fuel_quantity && (
            <div className="invalid-feedback">{errors.stocked_fuel_quantity}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="per_Leter_Cost">Per Leter Cost</label>
          <input
            type="number"
            step="0.01"
            value={fuelstockData.per_leter_cost}
            className={`form-control ${errors.per_leter_cost ? "is-invalid" : ""}`}
            id="per_Leter_Cost"
            placeholder="Enter Per Leter Cost"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.per_leter_cost && (
            <div className="invalid-feedback">{errors.per_leter_cost}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="total_Cost">Total Cost</label>
          <input
            type="number"
            value={fuelstockData.total_cost}
            className={`form-control ${errors.total_cost ? "is-invalid" : ""}`}
            id="total_Cost"
            placeholder="Total Cost"
            disabled // Disable editing of total_cost
          />
          {errors.total_cost && (
            <div className="invalid-feedback">{errors.total_cost}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="stocked_Fuel_Date">Stocked Fuel Date</label>
          <input
            type="date"
            value={fuelstockData.stocked_fuel_date}
            className={`form-control ${errors.stocked_fuel_date ? "is-invalid" : ""}`}
            id="stocked_Fuel_Date"
            onChange={(e) => handleInputChange(e, "stocked_Fuel_Date")}
          />
          {errors.stocked_fuel_date && (
            <div className="invalid-feedback">{errors.stocked_fuel_date}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

