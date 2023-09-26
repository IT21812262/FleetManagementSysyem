import React, { useState, useEffect,  useCallback} from "react";
import axios from "axios";
import "./AddFuelstock.css";

export default function AddSupplier() {

  const[invoice_no, setInvoice_No] = useState ("");
  const[stocked_fuel_type, setStocked_Fuel_Type] = useState ("");
  const[stocked_fuel_quantity, setStocked_Fuel_Quantity] = useState ("");
  const[per_leter_cost, setPer_Leter_Cost] = useState ("");
  const[total_cost, setTotal_Cost] = useState ("");
  const[stocked_fuel_date, setStocked_Fuel_Date] = useState ("");

  const [errors, setErrors] = useState({});

  function validateForm() {
    const errors = {};

    if (!invoice_no) {
      errors.invoice_no = "Invoice No is required";
    } else {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      if (!regex.test(invoice_no)) {
        errors.invoice_no = "Invoice No should be 2 letters followed by 4 numbers";
      }
    }
     if (!stocked_fuel_type) {
      errors.stocked_fuel_type = "Stocked Fuel Type is required";
    }

    if (!stocked_fuel_quantity) {
      errors.stocked_fuel_quantity = "Stocked Fuel Quantity is required";
    } else {
      const regex = /^[0-9]+$/;
      if (!regex.test(stocked_fuel_quantity)) {
        errors.stocked_fuel_quantity = "Stocked Fuel Quantity should contain only numbers";
      }
    }

    if (!per_leter_cost) {
      errors.per_leter_cost = "Per Leter Cost is required";
    } else {
      const regex = /^\d+(\.\d{1,2})?$/; 
      if (!regex.test(per_leter_cost)) {
        errors.per_leter_cost = "Per Leter Cost should be a valid float value";
      }
    }


    if (!stocked_fuel_date) {
      errors.stocked_fuel_date = "Stocked Fuel Date is required";
    } else {
      const isValidDate = !isNaN(new Date(stocked_fuel_date).getTime());

      if (!isValidDate) {
        errors.stocked_fuel_date = "Invalid date format";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const calculateTotalCost = useCallback(() => {
      const perLeterCostValue = parseFloat(per_leter_cost) || 0;
      const stockedFuelQuantityValue = parseInt(stocked_fuel_quantity, 10) || 0;
      const totalCostValue = perLeterCostValue * stockedFuelQuantityValue;
      setTotal_Cost(totalCostValue.toFixed(2));// Round to 2 decimal places
      
    }, [per_leter_cost, stocked_fuel_quantity, setTotal_Cost]);

  useEffect(() => {
    calculateTotalCost();
  }, [calculateTotalCost])

  function sentData(e) {
    e.preventDefault();

    if (validateForm()) {
      alert("Insert");

      const newFuelstock = {
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date
      };

      axios
        .post("http://localhost:8411/fuelstock/add", newFuelstock)
        .then((response) => {
          alert(response.data.message);
          alert("Fuel Stock Successfully added");
          // ... rest of the code to reset form fields

          setInvoice_No('');
          setStocked_Fuel_Type('');
          setStocked_Fuel_Quantity('');
          setPer_Leter_Cost('');
          setTotal_Cost('');
          setStocked_Fuel_Date('');

        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="container">
      <form onSubmit={sentData}>
        {/* Add validation errors display */}
        
        {errors.invoice_no && (
          <div className="alert alert-danger">{errors.invoice_no}</div>
        )}

        <div className="form-group">
          <label htmlFor="Invoice_No">Invoice No</label>
          <input
            type="text"
            className={`form-control ${errors.invoice_no ? "is-invalid" : ""}`}
            id="Invoice_No"
            placeholder="Enter Invoice No"
            value={invoice_no}
            onChange={(e) => {
              setInvoice_No(e.target.value);
              setErrors({ ...errors, invoice_no: null });
            }}
          />
        </div>

        {errors.stocked_fuel_type && (
          <div className="alert alert-danger">{errors.stocked_fuel_type}</div>
        )}
        
        <div className="form-group">
          <label htmlFor="stocked_Fuel_Type">Stocked Fuel Type</label>
          <input
            type="text"
            className={`form-control ${errors.stocked_fuel_type ? "is-invalid" : ""}`}
            id="stocked_Fuel_Type"
            placeholder="Enter Stocked Fuel Type"
            value={stocked_fuel_type}
            onChange={(e) => {
              setStocked_Fuel_Type(e.target.value);
              setErrors({ ...errors, stocked_fuel_type: null });
            }}
          />
        </div>

 
        {errors.stocked_fuel_quantity && (
          <div className="alert alert-danger">{errors.stocked_fuel_quantity}</div>
        )}

        <div className="form-group">
          <label htmlFor="stocked_Fuel_Quantity">Stocked Fuel Quantity</label>
          <input
            type="number"
            className={`form-control ${errors.stocked_fuel_quantity ? "is-invalid" : ""}`}
            id="stocked_Fuel_Quantity"
            placeholder="Enter Stocked Fuel Quantity"
            value={stocked_fuel_quantity}
            onChange={(e) => {
              setStocked_Fuel_Quantity(e.target.value);
              setErrors({ ...errors, stocked_fuel_quantity: null });
              calculateTotalCost();
            }}
          />
        </div>

        {errors.per_leter_cost && (
          <div className="alert alert-danger">{errors.per_leter_cost}</div>
        )}

        <div className="form-group">
          <label htmlFor="per_Leter_Cost">Per Leter Cost</label>
          <input
            type="text"
            className={`form-control ${errors.per_leter_cost ? "is-invalid" : ""}`}
            id="per_Leter_Cost"
            placeholder="Enter per Leter Cost"
            value={per_leter_cost}
            onChange={(e) => {
              setPer_Leter_Cost(e.target.value);
              setErrors({ ...errors, per_leter_cost: null });
              calculateTotalCost();
            }}
          />
        </div>

        {errors.total_cost && (
          <div className="alert alert-danger">{errors.total_cost}</div>
        )}

        <div className="form-group">
          <label htmlFor="total_Cost">Total Cost</label>
          <input
            type="text"
            className={`form-control ${errors.total_cost ? "is-invalid" : ""}`}
            id="total_Cost"
            placeholder="Total Cost"
            value={total_cost}
            readOnly
          />
        </div>

        {errors.stocked_fuel_date && (
          <div className="alert alert-danger">{errors.stocked_fuel_date}</div>
        )}

        <div className="form-group">
          <label htmlFor="stocked_Fuel_Date">Ftocked Fuel Date</label>
          <input
            type="date"
            className={`form-control ${errors.stocked_fuel_date ? "is-invalid" : ""}`}
            id="stocked_Fuel_Date"
            placeholder="Enter Stocked Fuel Date"
            value={stocked_fuel_date}
            onChange={(e) => {
              setStocked_Fuel_Date(e.target.value);
              setErrors({ ...errors, stocked_fuel_date: null });
            }}
            />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
