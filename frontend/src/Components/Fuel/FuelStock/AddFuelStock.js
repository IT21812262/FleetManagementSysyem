import React, {useState} from "react";
import axios from "axios";

export default function AddFuelStock(){


    invoice_no,
    stocked_fuel_type,
    stocked_fuel_quantity,
    per_leter_cost,
    total_cost,
    stocked_fuel_date

    const[invoice_no, setInvoice_NO] = useState ("");
    const[stocked_fuel_type, setStocked_Fuel_Type] = useState ("");
    const[stocked_fuel_quantity, setStocked_Fuel_Quantity] = useState ("");
    const[per_leter_cost, setPer_Leter_Cost] = useState ("");
    const[total_cost, setTotal_Cost] = useState ("");
    const[stocked_fuel_date, setStocked_Fuel_Date] = useState ("");

    function sentData(e){
      e.preventDefault();
      alert("Insert");

      const newFuelStock = {
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date
      }

     // console.log(newFuelStock); output show in the console

     axios.post("http://localhost:8411/fuel/fuel_stock/addFuelStock", newFuelStock).then((response) =>{
      alert(response.data.message);
      /*alert("New Fuel Stock Successfully added");*/
        setInvoice_NO('');
        setStocked_Fuel_Type('');
        setStocked_Fuel_Quantity('');
        setPer_Leter_Cost('');
        setTotal_Cost('');
        setStocked_Fuel_Date('');
        

     }).catch((err) => {
      alert(err);
     });
    };

    return(
        <div className="container">
        <form onSubmit={sentData}>

    <div className="form-group">
            <label for="invoice_no">Invoice No</label>  {/*  for => htmlFor */}
            <input type="text" className="form-control" id="invoice_no" placeholder="Enter Invoice No"
            onChange={(e)=>{
            setInvoice_NO(e.target.value);
          }}/>
           </div>

  <div className="form-group">
    <label for="stocked_fuel_type">Stocked Fuel Type</label>
    <input type="text" className="form-control" id="stocked_fuel_type" placeholder="Enter Stocked Fuel Type"
    onChange={(e)=>{  // e means event
      setStocked_Fuel_Type(e.target.value);
    }}/>
  </div>

  <div className="form-group">
    <label for="stocked_fuel_quantity">Stocked Fuel Quantity</label>
    <input type="number" className="form-control" id="stocked_fuel_quantity" placeholder="Enter Stocked Fuel Quantity"
    onChange={(e)=>{
      setStocked_Fuel_Quantity(e.target.value);
    }}/>
    </div>

<div className="form-group">
    <label for="per_leter_cost">Per Leter Cost</label>
    <input type="number" className="form-control" id="per_leter_cost" placeholder="Enter Per Leter Cost"
    onChange={(e)=>{
      setPer_Leter_Cost(e.target.value);
    }}/>
  </div>

  <div className="form-group">
    <label for="stocked_fuel_date">Stocked Fuel Date</label>
    <input type="date" className="form-control" id="stocked_fuel_date" placeholder="Enter Stocked Fuel Date"
    onChange={(e)=>{
      setStocked_Fuel_Date(e.target.value);
    }}/>
    </div>


  <button type="submit" className="btn btn-primary">Submit Fuel Stock</button>
</form>
</div>
    )
}

