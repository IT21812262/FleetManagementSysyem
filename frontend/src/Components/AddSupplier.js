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

     axios.post("http://localhost:8411/supplier/add", newSupplier).then(() =>{

      alert("Supplier Successfully added");

       /* setSupplier_Name("");
        setSupplier_ID("");
        setSupplier_Position("");*/

     }).catch((err) => {
      alert(err)
     })
    }

    return(
        <div className="container">
        <form onSubmit={sentData}>

    <div className="form-group">
            <label for="supplier_ID">Supplier ID</label>
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
    <label for=" phone_number">Supplier NIC</label>
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
      setSupplier_Position(e.target.value);
    }}/>
    </div>



  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    )
}

