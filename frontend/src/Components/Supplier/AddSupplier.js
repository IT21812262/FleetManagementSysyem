import React, { useState } from "react";
import axios from "axios";
import "./AddSupplier.css";

export default function AddSupplier() {
  const[supplier_id, setSupplier_ID] = useState ("");
  const[supplier_name, setSupplier_Name] = useState ("");
  const[supplier_NIC, setSupplier_NIC] = useState ("");
  const[phone_number, setPhone_Number] = useState ("");
  const[supplier_possition, setSupplier_Position] = useState ("");
  const[email, setEmail] = useState ("");
  const[company_name, setCompany_Name] = useState ("");
  const[item_type, setItem_type] = useState ("");
  const[item_size, setItem_Size] = useState ("");
  const[item_code, setItem_Code] = useState ("");
  const[brand, setBrand] = useState ("");
  const[quntity, setQuntity] = useState ("");
  const[unit_price, setUnit_Price] = useState ("");
  const[total_price, setTotal_Price] = useState ("");
  const[orderd_date, setOrderd_date] = useState ("");
  const[manufatured_date, setManufactured_Date] = useState ("");
  const[invoice_number, setInvoice_Number] = useState ("");

  const [errors, setErrors] = useState({});

  function validateForm() {
    const errors = {};

    if (!supplier_id) {
      errors.supplier_id = "Supplier ID is required";
    } else {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      if (!regex.test(supplier_id)) {
        errors.supplier_id = "Supplier ID should be 2 letters followed by 4 numbers";
      }
    }
     if (!supplier_name) {
      errors.supplier_name = "Supplier Name is required";
    }

    if (!supplier_NIC) {
      errors.supplier_NIC = "Supplier NIC is required";
    } else if (supplier_NIC.length !== 12) {
      errors.supplier_NIC = "Supplier NIC should be exactly 12 characters";
    }

    if (!phone_number) {
      errors.phone_number = "Phone Number is required";
    } else {
      const regex = /^\d{10}$/;
      if (!regex.test(phone_number)) {
        errors.phone_number = "Phone Number should be exactly 10 numbers";
      }
    }

    if (!supplier_possition) {
      errors.supplier_possition = "Supplier Position is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Enter a valid email address";
      }
    }

    if (!company_name) {
      errors.company_name = "Company Name is required";
    }

    if (!item_type) {
      errors.item_type = "Item Name is required";
    }

    if (!item_size) {
      errors.item_size = "Item Size is required";
    } else {
      const regex = /^\d+$/;
      if (!regex.test(item_size)) {
        errors.item_size = "Item Size should contain only numbers";
      }
    }

    if (!item_code) {
      errors.item_code = "Item Code is required";
    } else {
      const regex = /^[A-Za-z]{2}\d{4}$/;
      if (!regex.test(item_code)) {
        errors.item_code = "Item Code should be 2 letters followed by 4 numbers";
      }
    }

    if (!brand) {
      errors.brand = "Brand is required";
    }

    if (!quntity) {
      errors.quntity = "Quantity is required";
    } else {
      const regex = /^[0-9]+$/;
      if (!regex.test(quntity)) {
        errors.quntity = "Quantity should contain only numbers";
      }
    }

    if (!unit_price) {
      errors.unitPrice = "Unit Price is required";
    } else {
      const regex = /^\d+(\.\d{1,2})?$/; 
      if (!regex.test(unit_price)) {
        errors.unit_price = "Unit Price should be a valid float value";
      }
    }

    if (!total_price) {
      errors.total_price= "Total Price is required";
    } else {
      const regex = /^\d+(\.\d{1,2})?$/; 
      if (!regex.test(total_price)) {
        errors.total_price = "Total Price should be a valid float value";
      }
    }

    if (!orderd_date) {
      errors.orderd_date = "Order Date is required";
    } else {
      const isValidDate = !isNaN(new Date(orderd_date).getTime());

      if (!isValidDate) {
        errors.orderd_date = "Invalid date format";
      }
    }

    if (!manufatured_date) {
      errors.manufatured_date= "Manufactured Date is required";
    } else {
      // Check if the entered value is a valid date
      const isValidDate = !isNaN(new Date(manufatured_date).getTime());

      if (!isValidDate) {
        errors.manufatured_date = "Invalid date format";
      }
    }

    if (!invoice_number) {
      errors.invoice_number = "Invoice Number is required";
    } else {
      const regex = /^[A-Za-z]{2}[0-9]{5}$/;
      if (!regex.test(invoice_number)) {
        errors.invoice_number = "Invoice Number should have 2 letters followed by 5 numbers";
      }
    }

    // Add similar validations for other fields...

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function sentData(e) {
    e.preventDefault();

    if (validateForm()) {
      alert("Insert");

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
        .post("http://localhost:8411/supplier/add", newSupplier)
        .then((response) => {
          alert(response.data.message);
          alert("Supplier Successfully added");
          // ... rest of the code to reset form fields

          setSupplier_ID("");
          setSupplier_Name("");
          setSupplier_NIC("");
          setPhone_Number("");
          setSupplier_Position("");
          setEmail("");
          setCompany_Name("");
          setItem_type("");
          setItem_Size("");
          setItem_Code("");
          setBrand("");
          setQuntity("");
          setUnit_Price("");
          setTotal_Price("");
          setOrderd_date("");
          setManufactured_Date("");
          setInvoice_Number("");

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
        {errors.supplier_id && (
          <div className="alert alert-danger">{errors.supplier_id}</div>
        )}

        <div className="form-group">
          <label htmlFor="supplier_ID">Supplier ID</label>
          <input
            type="text"
            className={`form-control ${errors.supplier_id ? "is-invalid" : ""}`}
            id="supplier_ID"
            placeholder="Enter Supplier ID"
            value={supplier_id}
            onChange={(e) => {
              setSupplier_ID(e.target.value);
              setErrors({ ...errors, supplier_id: null });
            }}
          />
        </div>
      {errors.supplier_name && (
          <div className="alert alert-danger">{errors.supplier_name}</div>
        )}
        <div className="form-group">
          <label htmlFor="supplier_Name">Supplier Name</label>
          <input
            type="text"
            className={`form-control ${errors.supplier_name ? "is-invalid" : ""}`}
            id="supplier_Name"
            placeholder="Enter Supplier Name"
            value={supplier_name}
            onChange={(e) => {
              setSupplier_Name(e.target.value);
              setErrors({ ...errors, supplier_name: null });
            }}
          />
        </div>

        {errors.supplier_NIC && (
          <div className="alert alert-danger">{errors.supplier_NIC}</div>
        )}

        <div className="form-group">
          <label htmlFor="supplier_NIC">Supplier NIC</label>
          <input
            type="text"
            className={`form-control ${errors.supplier_NIC ? "is-invalid" : ""}`}
            id="supplier_NIC"
            placeholder="Enter Supplier NIC"
            value={supplier_NIC}
            onChange={(e) => {
              setSupplier_NIC(e.target.value);
              setErrors({ ...errors, supplier_NIC: null });
            }}
          />
        </div>

        {errors.phone_number && (
          <div className="alert alert-danger">{errors.phone_number}</div>
        )}

        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="number"
            className={`form-control ${errors.phone_number ? "is-invalid" : ""}`}
            id="phone_number"
            placeholder="Enter Phone Number"
            value={phone_number}
            onChange={(e) => {
              setPhone_Number(e.target.value);
              setErrors({ ...errors, phone_number: null });
            }}
          />
        </div>

        {errors.supplier_position && (
          <div className="alert alert-danger">{errors.supplier_position}</div>
        )}

        <div className="form-group">
          <label htmlFor="supplier_Possition">Supplier Position</label>
          <input
            type="text"
            className={`form-control ${errors.supplier_possition ? "is-invalid" : ""}`}
            id="supplier_Possition"
            placeholder="Enter Supplier Position"
            value={supplier_possition}
            onChange={(e) => {
              setSupplier_Position(e.target.value);
              setErrors({ ...errors, supplier_possition: null });
            }}
          />
        </div>

{errors.email && (
          <div className="alert alert-danger">{errors.email}</div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: null });
            }}
          />
        </div>

        {errors.company_name && (
          <div className="alert alert-danger">{errors.company_name}</div>
        )}

        <div className="form-group">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            className={`form-control ${errors.company_name ? "is-invalid" : ""}`}
            id="company_name"
            placeholder="Enter Company Name"
            value={company_name}
            onChange={(e) => {
              setCompany_Name(e.target.value);
              setErrors({ ...errors, company_name: null });
            }}
          />
        </div>

{errors.item_type && (
          <div className="alert alert-danger">{errors.item_type}</div>
        )}

        <div className="form-group">
          <label htmlFor="item_type">Item Name</label>
          <input
            type="text"
            className={`form-control ${errors.item_type ? "is-invalid" : ""}`}
            id="item_type"
            placeholder="Enter Item Name"
            value={item_type}
            onChange={(e) => {
              setItem_type(e.target.value);
              setErrors({ ...errors, item_type: null });
            }}
          />
        </div>

        {errors.item_size && (
          <div className="alert alert-danger">{errors.item_size}</div>
        )}

        <div className="form-group">
          <label htmlFor="item_size">Item Size</label>
          <input
            type="number"
            className={`form-control ${errors.item_size ? "is-invalid" : ""}`}
            id="item_size"
            placeholder="Enter Item Size"
            value={item_size}
            onChange={(e) => {
              setItem_Size(e.target.value);
              setErrors({ ...errors, item_size: null });
            }}
          />
        </div>

        {errors.item_code && (
          <div className="alert alert-danger">{errors.item_code}</div>
        )}

        <div className="form-group">
          <label htmlFor="item_code">Item Code</label>
          <input
            type="text"
            className={`form-control ${errors.item_code ? "is-invalid" : ""}`}
            id="item_code"
            placeholder="Enter Item Code"
            value={item_code}
            onChange={(e) => {
              setItem_Code(e.target.value);
              setErrors({ ...errors, item_code: null });
            }}
          />
        </div>

        {errors.brand && (
          <div className="alert alert-danger">{errors.brand}</div>
        )}

        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            className={`form-control ${errors.brand ? "is-invalid" : ""}`}
            id="brand"
            placeholder="Enter Brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setErrors({ ...errors, brand: null });
            }}
          />
        </div>

        {errors.quntity && (
          <div className="alert alert-danger">{errors.quntity}</div>
        )}

        <div className="form-group">
          <label htmlFor="quntity">Quantity</label>
          <input
            type="number"
            className={`form-control ${errors.quntity ? "is-invalid" : ""}`}
            id="quantity"
            placeholder="Enter Quantity"
            value={quntity}
            onChange={(e) => {
              setQuntity(e.target.value);
              setErrors({ ...errors, quntity: null });
            }}
          />
        </div>

        {errors.unit_price&& (
          <div className="alert alert-danger">{errors.unitPrice}</div>
        )}

        <div className="form-group">
          <label htmlFor="unit_price">Unit Price</label>
          <input
            type="text" // Change input type to text for float values
            className={`form-control ${errors.unit_price ? "is-invalid" : ""}`}
            id="unit_price"
            placeholder="Enter Unit Price"
            value={unit_price}
            onChange={(e) => {
              setUnit_Price(e.target.value);
              setErrors({ ...errors, unit_price: null });
            }}
          />
        </div>

        {errors.total_price && (
          <div className="alert alert-danger">{errors.totalPrice}</div>
        )}

        <div className="form-group">
          <label htmlFor=" total_price">Total Price</label>
          <input
            type="text" // Change input type to text for float values
            className={`form-control ${errors.total_price ? "is-invalid" : ""}`}
            id=" total_price"
            placeholder="Enter Total Price"
            value={total_price}
            onChange={(e) => {
              setTotal_Price(e.target.value);
              setErrors({ ...errors, total_price: null });
            }}
          />
        </div>

        {errors.orderd_date && (
          <div className="alert alert-danger">{errors.orderDate}</div>
        )}

        <div className="form-group">
          <label htmlFor="orderd_date">Order Date</label>
          <input
            type="date"
            className={`form-control ${errors.orderd_date ? "is-invalid" : ""}`}
            id="orderd_date"
            placeholder="Enter Order Date"
            value={orderd_date}
            onChange={(e) => {
              setOrderd_date(e.target.value);
              setErrors({ ...errors, orderd_date: null });
            }}
          />
        </div>

        {errors.manufatured_date && (
          <div className="alert alert-danger">{errors.manufacturedDate}</div>
        )}

        <div className="form-group">
          <label htmlFor="manufatured_date">Manufactured Date</label>
          <input
            type="date"
            className={`form-control ${errors.manufatured_date ? "is-invalid" : ""}`}
            id="manufatured_date"
            placeholder="Enter Manufactured Date"
            value={manufatured_date}
            onChange={(e) => {
              setManufactured_Date(e.target.value);
              setErrors({ ...errors, manufatured_date: null });
            }}
          />
        </div>

        {errors.invoice_number && (
          <div className="alert alert-danger">{errors.invoice_number}</div>
        )}

        <div className="form-group">
          <label htmlFor="invoice_number">Invoice Number</label>
          <input
            type="text"
            className={`form-control ${errors.invoice_number ? "is-invalid" : ""}`}
            id="invoice_number"
            placeholder="Enter Invoice Number"
            value={invoice_number}
            onChange={(e) => {
              setInvoice_Number(e.target.value);
              setErrors({ ...errors, invoice_number: null });
            }}
          />
        </div>

        {/* Add similar form fields with validation and error display */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
