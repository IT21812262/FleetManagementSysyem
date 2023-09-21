import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddSupplier() {
  const [supplier_id, setSupplier_ID] = useState("");
  const [supplier_name, setSupplier_Name] = useState("");
  const [supplier_NIC, setSupplier_NIC] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [supplier_possition, setSupplier_Position] = useState("");
  const [email, setEmail] = useState("");
  const [company_name, setCompany_Name] = useState("");
  const [item_type, setItem_type] = useState("");
  const [item_size, setItem_Size] = useState("");
  const [item_code, setItem_Code] = useState("");
  const [brand, setBrand] = useState("");
  const [quntity,  setQuntity] = useState("");
  const [unit_price, setUnit_Price] = useState("");
  const [total_price, setTotal_Price] = useState("");
  const [orderd_date,  setOrderd_date] = useState("");
  const [manufatured_date, setManufactured_Date] = useState("");
  const [invoice_number, setInvoice_Number] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        if (searchQ) {
          const response = await axios.get(
            `http://localhost:8411/supplier/get/${searchQ}`
          );

if(response.data.supplier){
          setSupplier(response.data.supplier);

          const supplierData = response.data.supplier;
          setSupplier_ID(supplierData.supplier_id);
          setSupplier_Name(supplierData.supplier_name);
          setSupplier_NIC(supplierData.supplier_NIC);
          setPhone_Number(supplierData.phone_number);
          setSupplier_Position(supplierData.supplier_possition);
          setEmail(supplierData.email);
          setCompany_Name(supplierData.company_name);
          setItem_type(supplierData.item_type);
          setItem_Size(supplierData.item_size);
          setItem_Code(supplierData.item_code);
          setBrand(supplierData.brand);
          setQuntity(supplierData.quntity);
          setUnit_Price(supplierData.unit_price);
          setTotal_Price(supplierData.total_price);
          setOrderd_date(supplierData.orderd_date);
          setManufactured_Date(supplierData.manufatured_date);
          setInvoice_Number(supplierData.invoice_number);
    }
        }
      } catch (error) {
        alert("Error fetching supplier: " + error.message);
      }
    };

    fetchSupplierData();
  }, [searchQ]);

  function handleInputChange(e, setter) {
    setter(e.target.value);
  }

  function sentData(e) {
    e.preventDefault();
    alert("Insert");
    // Check if supplier is not null before accessing properties
    if (supplier) {
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
          //alert(response.data.message);
          resetForm();
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Supplier data is null.");
    }
  }

  function resetForm() {
    // Reset all state variables to their initial values
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
  }
  return (
    <div className="container">
      <form onSubmit={sentData}>
        <input
          type="text"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Enter Supplier ID"
        />

        {supplier ? (
          <ul>
            <li key={supplier.id}>


      <div className="form-group">
        <label for="supplier_ID">Supplier ID</label> 
        <input type="text" value={supplier_id} className="form-control" id="supplier_ID" placeholder="Enter Supplier ID"
        onChange={(e) => handleInputChange(e, setSupplier_ID)}
        />
</div>
        <div className="form-group">
         <label for="supplier_Name">Supplier Name</label>
        <input type="text" value={supplier_name} className="form-control" id="supplier_Name" placeholder="Enter Supplier Name"
        onChange={(e)=>handleInputChange(e, setSupplier_Name)}/>
  </div>

  <div className="form-group">
    <label for="supplier_NIC">Supplier NIC</label>
    <input type="text" value={supplier_NIC} className="form-control" id="supplier_NIC" placeholder="Enter Supplier NIC"
     onChange={(e)=>handleInputChange(e, setSupplier_NIC)}/>
    </div>

    <div className="form-group">
    <label for=" phone_number">Phone Number</label>
    <input type="number" value={phone_number} className="form-control" id="phone_number" placeholder="Enter Phone Number"
    onChange={(e)=>handleInputChange(e, setPhone_Number)}/>
  </div>

  <div className="form-group">
    <label for="supplier_Position">Supplier Position</label>
    <input type="text" value={supplier_possition} className="form-control" id="supplier_Possition" placeholder="Enter Supplier Position"
    onChange={(e)=>handleInputChange(e, setSupplier_Position)}/>
    </div>

    <div className="form-group">
    <label for="email">Email</label>
    <input type="email" value={email} className="form-control" id="email" placeholder="Enter Email"
    onChange={(e)=>handleInputChange(e, setEmail)}/>
    </div>

    
    <div className="form-group">
    <label for="company_name">Company Name</label>
    <input type="text" value={company_name} className="form-control" id="company_name" placeholder="Enter Comapany Name"
   onChange={(e)=>handleInputChange(e, setCompany_Name)}/>
   </div>

   <div className="form-group">
    <label for="item_type">Item Name</label>
    <input type="text" value={item_type} className="form-control" id="item_type" placeholder="Enter Item Name"
    onChange={(e)=>handleInputChange(e, setItem_type)}/>
    </div>

    <div className="form-group">
    <label for="item_size">Item Size</label>
    <input type="number" value={item_size} className="form-control" id="item_size" placeholder="Enter Item Size"
    onChange={(e)=>handleInputChange(e, setItem_Size)}/>
    </div>

    <div className="form-group">
    <label for="item_code">Item Code</label>
    <input type="text" value={item_code} className="form-control" id="item_code" placeholder="Enter Item Code"
    onChange={(e)=>handleInputChange(e, setItem_Code)}/>
    </div>

    <div className="form-group">
    <label for="brand">Brand</label>
    <input type="text" value={brand} className="form-control" id="brand" placeholder="Enter Brand"
    onChange={(e)=>handleInputChange(e, setBrand)}/>
    </div>

    <div className="form-group">
    <label for="quantity">Quantity</label>
    <input type="number" value={quntity} className="form-control" id="quantity" placeholder="Enter Quantity"
    onChange={(e)=>handleInputChange(e, setQuntity)}/>
    </div>

    <div className="form-group">
    <label for=" unit_price">Unit Price</label>
    <input type="number" value={unit_price} className="form-control" id="unit_price" placeholder="Enter Unit Price"
    onChange={(e)=>handleInputChange(e, setUnit_Price)}/>
    </div>

    <div className="form-group">
    <label for="total_price">Total Price</label>
    <input type="number" value={total_price} className="form-control" id="total_price" placeholder="Enter Total Price"
    onChange={(e)=>handleInputChange(e, setTotal_Price)}/>
    </div>

    <div className="form-group">
    <label for="orderd_date">Orderd Date</label>
    <input type="date" value={orderd_date} className="form-control" id="orderd_date" placeholder="Enter Email"
    onChange={(e)=>handleInputChange(e, setOrderd_date)}/>
    </div>

    <div className="form-group">
    <label for="manufatured_date">Manufactured Date</label>
    <input type="date" value={manufatured_date} className="form-control" id="manufatured_date" placeholder="Enter Manufactured Date"
     onChange={(e)=>handleInputChange(e, setManufactured_Date)}/>
     </div>

    <div className="form-group">
    <label for="invoice_number">Invoice Number</label>
    <input type="text" value={invoice_number} className="form-control" id="Invoice Number" placeholder="Enter Invoice Number"
     onChange={(e)=>handleInputChange(e, setInvoice_Number)}/>
     </div>
            </li>
          </ul>
        ) : null}
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}


 