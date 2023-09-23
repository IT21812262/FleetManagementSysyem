import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./UpdateSupplier.css";

export default function UpdateSupplier() {

    const location = useLocation();
  
    const [supplierData, setSupplierData] = useState(
      location.state?.supplierData || {
        supplier_id: "",
        supplier_name: "",
        supplier_NIC: "",
        phone_number: "",
        supplier_possition: "",
        email: "",
        company_name: "",
        item_type: "",
        item_size: "",
        item_code: "",
        brand: "",
        quntity: "",
        unit_price: "",
        total_price: "",
        orderd_date: "",
        manufatured_date: "",
        invoice_number: "",
      }
    );
  
  const [errors, setErrors] = useState({});
  const [searchQ, setSearchQ] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;
  
    if (id === "unit_price" || id === "quntity") {
      const unitPrice = parseFloat(value);
      const quantity = parseFloat(supplierData.quntity);
      const totalPrice = isNaN(unitPrice) || isNaN(quantity) ? "" : (unitPrice * quantity).toFixed(2);
      newValue = totalPrice;
    }
  
    setSupplierData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  
    validateInput(id, newValue);
  };
  
  const validateInput = (id, value) => {
    let error = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[0-9]*$/;
    const itemCodeRegex = /^[A-Za-z]{2}\d{4}$/;
    
    switch (id) {

    case "supplier_id":
        error = value.length !== 6 ? "Supplier ID must be 6 characters" : "";
        break;

    case "supplier_NIC":
        error = value.length !== 12 ? "Supplier NIC must be 12 characters" : "";
        break;

    case "phone_number":
        const phoneNumberRegex = /^[0-9]{10}$/;
          error = !phoneNumberRegex.test(value) ? "Phone Number must be exactly 10 digits" : "";
          break;

    case "supplier_possition":
        error = value.trim() === "" ? "Supplier Position is required" : "";
        break;

    case "email":
        error = !emailRegex.test(value) ? "Enter a valid email address" : "";
        break;

    case "company_name":
        error = value.trim() === "" ? "Company Name is required" : "";
        break;

    case "item_type":
        error = value.trim() === "" ? "Item Name is required" : "";
        break;

    case "item_size":
         error =
         value.trim() === "" || !numberRegex.test(value)
         ? "Item Size should contain only numbers"
         : "";
     break;  

     case "item_code":
        error =
          value.trim() === "" || !itemCodeRegex.test(value)
            ? "Item Code should be 2 letters followed by 4 numbers"
            : "";
        break;

        case "brand":
            error = value.trim() === "" ? "Brand is required" : "";
            break;                            
                                                              
          case "quntity":
              error = isNaN(value) ? "Quantity should contain only numbers" : "";
              break;
        case "unit_price":
          error = !/^\d+(\.\d+)?$/.test(value) ? "Unit Price should be a valid float value" : "";
          break;    

      case "orderd_date":
        if (!value) {
          error = "Order Date is required";
        } else {
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            error = "Invalid date format";
          }
        }
        break;

        case "manufatured_date":
            if (!value) {
              error = "Manufactured Date is required";
            } else {
              const date = new Date(value);
              if (isNaN(date.getTime())) {
                error = "Invalid date format";
              }
            }
            break;

        case "invoice_number":
                const invoiceNumberRegex = /^[A-Za-z]{2}\d{5}$/;
                if (!value) {
                  error = "Invoice Number is required";
                } else if (!invoiceNumberRegex.test(value)) {
                  error = "Invoice Number should have 2 letters followed by 5 numbers";
                }
                break;
            
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const fetchSupplier = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8411/supplier/get/${supplierData.supplier_id}`
      );

      const fetchedSupplier = response.data.supplier;

      setSupplierData(fetchedSupplier);
    } catch (error) {
      alert("Error fetching supplier: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");

  if (hasErrors) {
    alert("Please correct the errors before updating.");
    return; // Stop the form submission
  }

  const newSupplier = { ...supplierData };

  if (newSupplier.supplier_id) {
    axios
      .put(`http://localhost:8411/supplier/update/${newSupplier.supplier_id}`, newSupplier)
      .then((response) => {
        resetForm();
        //alert("Supplier successfully updated.");
        window.location.href = "/supplier/allSuppliers";
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    alert("Supplier ID is required.");
  }
    //alert("Insert");
    const { supplier_id, 
        supplier_name, 
        supplier_NIC, 
        phone_number,
        supplier_possition,
        email,
        company_name,
        item_type,
        item_size,
        item_code,
        brand,
        quntity,
        unit_price,
        total_price,
        orderd_date,
        manufatured_date,
        invoice_number } = supplierData;

    if (supplierData.supplier_id) {
      const newSupplier = {
        supplier_id,
        supplier_name,
        supplier_NIC,
        phone_number,
        supplier_possition,
        email,
        company_name,
        item_type,
        item_size,
        item_code,
        brand,
        quntity,
        unit_price,
        total_price,
        orderd_date,
        manufatured_date,
        invoice_number
      };

      axios
        .put(`http://localhost:8411/supplier/update/${supplier_id}`, newSupplier)
        .then((response) => {
          resetForm();
          alert("Supplier successfully updated.");
          window.location.href = "/supplier/allSuppliers"; 
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Supplier ID is required.");
    }
  };

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/supplier/get/${searchQ}`
          );

          if (response.data.supplier) {
            setSupplierData(response.data.supplier);
          }
        }
      } catch (error) {
        alert("Error fetching supplier: " + error.message);
      }
    };

    fetchSupplierData();
  }, [searchQ]);

  const resetForm = () => {
    setSupplierData({
        supplier_id: "",
        supplier_name: "",
        supplier_NIC: "",
        phone_number:"",
        supplier_possition:"",
        email:"",
        company_name:"",
        item_type:"",
        item_size:"",
        item_code:"",
        brand:"",
        quntity:"",
        unit_price:"",
        total_price:"",
        orderd_date:"",
        manufatured_date:"",
        invoice_number:"" 
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
          placeholder="Enter Supplier ID"
        />
        <div className="form-group">
          <label htmlFor="supplier_id">Supplier ID</label>
          <input
            type="text"
            className={`form-control ${errors.supplier_id ? "is-invalid" : ""}`}
            id="supplier_id"
            placeholder="Enter Supplier ID"
            value={supplierData.supplier_id}
            onChange={handleInputChange}
            onBlur={fetchSupplier}
          />
          {errors.supplier_id && (
            <div className="invalid-feedback">{errors.supplier_id}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="supplier_name">Supplier Name</label>
          <input
            type="text"
            className="form-control"
            id="supplier_name"
            placeholder="Enter Supplier Name"
            value={supplierData.supplier_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
  <label htmlFor="supplier_NIC">Supplier NIC</label>
  <input
    type="text"
    value={supplierData.supplier_NIC}
    className={`form-control ${errors.supplier_NIC ? "is-invalid" : ""}`}
    id="supplier_NIC"
    placeholder="Enter Supplier NIC"
    onChange={handleInputChange}
  />
  {errors.supplier_NIC && (
    <div className="invalid-feedback">{errors.supplier_NIC}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="phone_number">Phone Number</label>
  <input
    type="text"
    value={supplierData.phone_number}
    className={`form-control ${errors.phone_number ? "is-invalid" : ""}`}
    id="phone_number"
    placeholder="Enter Phone Number"
    onChange={(e) => handleInputChange(e, "phone_number")}
  />
  {errors.phone_number && (
    <div className="invalid-feedback">{errors.phone_number}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="supplier_possition">Supplier Position</label>
  <input
    type="text"
    value={supplierData.supplier_possition}
    className={`form-control ${errors.supplier_possition ? "is-invalid" : ""}`}
    id="supplier_possition"
    placeholder="Enter Supplier Position"
    onChange={(e) => handleInputChange(e, "supplier_possition")}
  />
  {errors.supplier_possition && (
    <div className="invalid-feedback">{errors.supplier_possition}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    type="email"
    value={supplierData.email}
    className={`form-control ${errors.email ? "is-invalid" : ""}`}
    id="email"
    placeholder="Enter Email"
    onChange={(e) => handleInputChange(e, "email")}
  />
  {errors.email && (
    <div className="invalid-feedback">{errors.email}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="company_name">Company Name</label>
  <input
    type="text"
    value={supplierData.company_name}
    className={`form-control ${errors.company_name ? "is-invalid" : ""}`}
    id="company_name"
    placeholder="Enter Company Name"
    onChange={(e) => handleInputChange(e, "company_name")}
  />
  {errors.company_name && (
    <div className="invalid-feedback">{errors.company_name}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="item_type">Item Name</label>
  <input
    type="text"
    value={supplierData.item_type}
    className={`form-control ${errors.item_type ? "is-invalid" : ""}`}
    id="item_type"
    placeholder="Enter Item Name"
    onChange={(e) => handleInputChange(e, "item_type")}
  />
  {errors.item_type && (
    <div className="invalid-feedback">{errors.item_type}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="item_size">Item Size</label>
  <input
    type="text"
    value={supplierData.item_size}
    className={`form-control ${errors.item_size ? "is-invalid" : ""}`}
    id="item_size"
    placeholder="Enter Item Size"
    onChange={(e) => handleInputChange(e, "item_size")}
  />
  {errors.item_size && (
    <div className="invalid-feedback">{errors.item_size}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="item_code">Item Code</label>
  <input
    type="text"
    value={supplierData.item_code}
    className={`form-control ${errors.item_code ? "is-invalid" : ""}`}
    id="item_code"
    placeholder="Enter Item Code"
    onChange={(e) => handleInputChange(e, "item_code")}
  />
  {errors.item_code && (
    <div className="invalid-feedback">{errors.item_code}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="brand">Brand</label>
  <input
    type="text"
    value={supplierData.brand}
    className={`form-control ${errors.brand ? "is-invalid" : ""}`}
    id="brand"
    placeholder="Enter Brand"
    onChange={(e) => handleInputChange(e, "brand")}
  />
  {errors.brand && (
    <div className="invalid-feedback">{errors.brand}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="quntity">Quantity</label>
  <input
    type="number"
    value={supplierData.quntity}
    className={`form-control ${errors.quntity ? "is-invalid" : ""}`}
    id="quntity"
    placeholder="Enter Quantity"
    onChange={handleInputChange}
  />
  {errors.quntity && (
    <div className="invalid-feedback">{errors.quntity}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="unit_price">Unit Price</label>
  <input
  type="number"
  step="0.01"
  value={supplierData.unit_price}
  className={`form-control ${errors.unit_price ? "is-invalid" : ""}`}
  id="unit_price"
  placeholder="Enter Unit Price"
  onChange={(e) => handleInputChange(e)}
/>
  {errors.unit_price && (
    <div className="invalid-feedback">{errors.unit_price}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="total_price">Total Price</label>
  <input
    type="number"
    value={supplierData.total_price}
    className={`form-control ${errors.total_price ? "is-invalid" : ""}`}
    id="total_price"
    placeholder="Total Price"
    disabled // Disable editing of total_price
  />
  {errors.total_price && (
    <div className="invalid-feedback">{errors.total_price}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="orderd_date">Order Date</label>
  <input
    type="date"
    value={supplierData.orderd_date}
    className={`form-control ${errors.orderd_date ? "is-invalid" : ""}`}
    id="orderd_date"
    onChange={(e) => handleInputChange(e, "orderd_date")}
  />
  {errors.orderd_date && (
    <div className="invalid-feedback">{errors.orderd_date}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="manufatured_date">Manufactured Date</label>
  <input
    type="date"
    value={supplierData.manufatured_date}
    className={`form-control ${errors.manufatured_date ? "is-invalid" : ""}`}
    id="manufatured_date"
    onChange={(e) => handleInputChange(e, "manufatured_date")}
  />
  {errors.manufatured_date && (
    <div className="invalid-feedback">{errors.manufatured_date}</div>
  )}
</div>

<div className="form-group">
  <label htmlFor="invoice_number">Invoice Number</label>
  <input
    type="text"
    value={supplierData.invoice_number}
    className={`form-control ${errors.invoice_number ? "is-invalid" : ""}`}
    id="invoice_number"
    placeholder="Enter Invoice Number"
    onChange={(e) => handleInputChange(e, "invoice_number")}
  />
  {errors.invoice_number && (
    <div className="invalid-feedback">{errors.invoice_number}</div>
  )}
</div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

