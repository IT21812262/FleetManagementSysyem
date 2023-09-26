import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./AddFuelentry.css";
import Sidebar from '../Sidebar';

const AddFuelentry = () => {
  const [vehicle_id, setVehicle_Id] = useState("");
  const [fuel_date, setFuel_Date] = useState("");
  const [fuel_type, setFuel_Type] = useState("");
  const [fuel_quantity, setFuel_Quantity] = useState("");
  const [fuel_cost, setFuel_Cost] = useState("");
  const [vehicle_milage, setVehicle_Milage] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    const errors = {};

    if (!vehicle_id) {
      errors.vehicle_id = "Invoice No is required";
    } else {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      if (!regex.test(vehicle_id)) {
        errors.vehicle_id = "Invoice No should be 2 letters followed by 4 numbers";
      }
    }

    if (!fuel_date) {
      errors.fuel_date = "Fuel Date is required";
    } else {
      const isValidDate = !isNaN(new Date(fuel_date).getTime());

      if (!isValidDate) {
        errors.fuel_date = "Invalid date format";
      }
    }

    if (!fuel_type) {
      errors.fuel_type = "Fuel Type is required";
    }

    if (!fuel_quantity) {
      errors.fuel_quantity = "Fuel Quantity is required";
    } else {
      const regex = /^[0-9]+$/;
      if (!regex.test(fuel_quantity)) {
        errors.fuel_quantity = "Fuel Quantity should contain only numbers";
      }
    }

    if (!fuel_cost) {
      errors.fuel_cost = "Fuel Cost is required";
    } else {
      const regex = /^\d+(\.\d{1,2})?$/;
      if (!regex.test(fuel_cost)) {
        errors.fuel_cost = "Fuel Cost should be a valid float value";
      }
    }

    if (!vehicle_milage) {
      errors.vehicle_milage = "Vehicle Milage is required";
    } else {
      const regex = /^\d+(\.\d{1,2})?$/;
      if (!regex.test(vehicle_milage)) {
        errors.vehicle_milage = "Vehicle Milage should be a valid float value";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function sentData(e) {
    e.preventDefault();

    if (validateForm()) {
      alert("Insert");

      const newFuelentry = {
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
      };

      axios
        .post("http://localhost:8411/fuelentry/add", newFuelentry)
        .then((response) => {
          //alert(response.data.message);
          alert("Fuel Entry Successfully added");
          // ... rest of the code to reset form fields

          setVehicle_Id('');
          setFuel_Date('');
          setFuel_Type('');
          setFuel_Quantity('');
          setFuel_Cost('');
          setVehicle_Milage('');
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="addfuelentry1">
      <Sidebar />
      <div className="contentbg">
        <div className="contentbg-item">
          
            <div className="formbg-item">
              <form onSubmit={sentData} className="formbg">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    {errors.vehicle_id && (
                      <div className="alert alert-danger">{errors.vehicle_id}</div>
                    )}

                    <div className="form-group">
                      <label htmlFor="vehicle_Id">Vehicle Id</label>
                      <input
                        type="text"
                        className={`form-control ${errors.vehicle_id ? "is-invalid" : ""}`}
                        id="vehicle_Id"
                        placeholder="Enter Vehicle Id"
                        value={vehicle_id}
                        onChange={(e) => {
                          setVehicle_Id(e.target.value);
                          setErrors({ ...errors, vehicle_id: null });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    {errors.fuel_date && (
                      <div className="alert alert-danger">{errors.fuel_date}</div>
                    )}

                    <div className="form-group">
                      <label htmlFor="fuel_Date">Fuel Date</label>
                      <input
                        type="date"
                        className={`form-control ${errors.fuel_date ? "is-invalid" : ""}`}
                        id="fuel_Date"
                        placeholder="Enter Fuel Date"
                        value={fuel_date}
                        onChange={(e) => {
                          setFuel_Date(e.target.value);
                          setErrors({ ...errors, fuel_date: null });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    {errors.fuel_type && (
                      <div className="alert alert-danger">{errors.fuel_type}</div>
                    )}

                    <div className="form-group">
                      <label htmlFor="fuel_Type">Fuel Type</label>
                      <input
                        type="text"
                        className={`form-control ${errors.fuel_type ? "is-invalid" : ""}`}
                        id="fuel_Type"
                        placeholder="Enter Fuel Type"
                        value={fuel_type}
                        onChange={(e) => {
                          setFuel_Type(e.target.value);
                          setErrors({ ...errors, fuel_type: null });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    {errors.fuel_quantity && (
                      <div className="alert alert-danger">{errors.fuel_quantity}</div>
                    )}

                    <div className="form-group">
                      <label htmlFor="fuel_Quantity">Fuel Quantity</label>
                      <input
                        type="number"
                        className={`form-control ${errors.fuel_quantity ? "is-invalid" : ""}`}
                        id="fuel_Quantity"
                        placeholder="Enter Fuel Quantity"
                        value={fuel_quantity}
                        onChange={(e) => {
                          setFuel_Quantity(e.target.value);
                          setErrors({ ...errors, fuel_quantity: null });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    {errors.fuel_cost && (
                      <div className="alert alert-danger">{errors.fuel_cost}</div>
                    )}

                    <div className="form-group">
                      <label htmlFor="fuel_Cost">Fuel Cost</label>
                      <input
                        type="text"
                        className={`form-control ${errors.fuel_cost ? "is-invalid" : ""}`}
                        id="fuel_Cost"
                        placeholder="Enter Fuel Cost"
                        value={fuel_cost}
                        onChange={(e) => {
                          setFuel_Cost(e.target.value);
                          setErrors({ ...errors, fuel_cost: null });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    {errors.vehicle_milage && (
                      <div className="alert alert-danger">{errors.vehicle_milage}</div>
                    )}

                    <div className="form-group">
                      <label htmlFor="vehicle_Milage">Vehicle Milage</label>
                      <input
                        type="text"
                        className={`form-control ${errors.vehicle_milage ? "is-invalid" : ""}`}
                        id="vehicle_Milage"
                        placeholder="Enter Vehicle Milage"
                        value={vehicle_milage}
                        onChange={(e) => {
                          setVehicle_Milage(e.target.value);
                          setErrors({ ...errors, vehicle_milage: null });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default AddFuelentry;
