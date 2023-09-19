import React, {useState} from "react";
import axios from "axios";

export default function AddSupplier(){
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


  
    function sentData(e){
      e.preventDefault();
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
      }
     // console.log(newSupplier); output show in the console

     axios.post("http://localhost:8411/supplier/addSupplier", newSupplier).then((response) =>{
      alert(response.data.message);
      /*alert("Supplier Successfully added");*/
        setSupplier_ID('');
        setSupplier_Name('');
        setSupplier_NIC('');
        setPhone_Number('');
        setSupplier_Position('');
        setEmail('');
        setCompany_Name('');
        setItem_type('');
        setItem_Size('');
        setItem_Code('');
        setBrand('');
        setQuntity('');
        setUnit_Price('');
        setTotal_Price('');
        setOrderd_date('');
        setManufactured_Date('');
        setInvoice_Number('');

     }).catch((err) => {
      alert(err);
     });
    };

    return(
        <div className="container">
        <form onSubmit={sentData}>

    <div className="form-group">
            <label for="supplier_ID">Supplier ID</label>  {/*  for => htmlFor */}
            <input type="text" className="form-control" id="supplier_ID" placeholder="Enter Supplier ID"
            onChange={(e)=>{
            setSupplier_ID(e.target.value);
          }}/>
           </div>

  <div className="form-group">
    <label for="supplier_Name">Supplier Name</label>
    <input type="text" className="form-control" id="supplier_Name" placeholder="Enter Supplier Name"
    onChange={(e)=>{  // e means event
      setSupplier_Name(e.target.value);
    }}/>
  </div>

  <div className="form-group">
    <label for="supplier_NIC">Supplier NIC</label>
    <input type="text" className="form-control" id="supplier_NIC" placeholder="Enter Supplier NIC"
    onChange={(e)=>{
      setSupplier_NIC(e.target.value);
    }}/>
    </div>

<div className="form-group">
    <label for=" phone_number">Phone Number</label>
    <input type="number" className="form-control" id="phone_number" placeholder="Enter Phone Number"
    onChange={(e)=>{
      setPhone_Number(e.target.value);
    }}/>
  </div>

  <div className="form-group">
    <label for="supplier_Position">Supplier Position</label>
    <input type="text" className="form-control" id="supplier_Position" placeholder="Enter Supplier Position"
    onChange={(e)=>{
      setSupplier_Position(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="email">Email</label>
    <input type="email" className="form-control" id="email" placeholder="Enter Email"
    onChange={(e)=>{
      setEmail(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="company_name">Company Name</label>
    <input type="text" className="form-control" id="company_name" placeholder="Enter Comapany Name"
    onChange={(e)=>{
      setCompany_Name(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="item_type">Item Name</label>
    <input type="text" className="form-control" id="item_type" placeholder="Enter Item Name"
    onChange={(e)=>{
      setItem_type(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="item_size">Item Size</label>
    <input type="number" className="form-control" id="item_size" placeholder="Enter Item Size"
    onChange={(e)=>{
      setItem_Size(e.target.value);
    }}/>
    </div>

   <div className="form-group">
    <label for="item_code">Item Code</label>
    <input type="text" className="form-control" id="item_code" placeholder="Enter Item Code"
    onChange={(e)=>{
      setItem_Code(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="brand">Brand</label>
    <input type="text" className="form-control" id="brand" placeholder="Enter Brand"
    onChange={(e)=>{
      setBrand(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="quntity">Quantity</label>
    <input type="number" className="form-control" id="quntity" placeholder="Enter Quantity"
    onChange={(e)=>{
      setQuntity(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for=" unit_price">Unit Price</label>
    <input type="number" className="form-control" id="unit_price" placeholder="Enter Unit Price"
    onChange={(e)=>{
      setUnit_Price(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="total_price">Total Price</label>
    <input type="number" className="form-control" id="total_price" placeholder="Enter Total Price"
    onChange={(e)=>{
      setTotal_Price(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="orderd_date">Orderd Date</label>
    <input type="date" className="form-control" id="orderd_date" placeholder="Enter Email"
    onChange={(e)=>{
      setOrderd_date(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="manufatured_date">Manufactured Date</label>
    <input type="date" className="form-control" id="manufatured_date" placeholder="Enter Manufactured Date"
    onChange={(e)=>{
     setManufactured_Date(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="invoice_number">Invoice Number</label>
    <input type="text" className="form-control" id="Invoice Number" placeholder="Enter Invoice Number"
    onChange={(e)=>{
      setInvoice_Number(e.target.value);
    }}/>
    </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    )
}

