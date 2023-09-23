import React, {useState} from "react";
import axios from "axios";

export default function AddFuelEntry(){

    const[vehicle_id, setVehicle_ID] = useState ("");
    const[fuel_date, setFuel_Date] = useState ("");
    const[fuel_type, setFuel_Type] = useState ("");
    const[fuel_quantity, setFuel_Quantity] = useState ("");
    const[fuel_cost, setFuel_Cost] = useState ("");
    const[vehicle_milage, setVehicle_Milage] = useState ("");

    function sentData(e){
      e.preventDefault();
      alert("Insert");

      const newFuelEntry = {
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
      }

     // console.log(newFuelEntry); output show in the console

     axios.post("http://localhost:8411/fuel/fuel_entry/add", newFuelEntry).then((response) =>{
      alert(response.data.message);
      /*alert("New Fuel Entry Successfully added");*/
        setVehicle_ID('');
        setFuel_Date('');
        setFuel_Type('');
        setFuel_Quantity('');
        setFuel_Cost('');
        setVehicle_Milage('');
        

     }).catch((err) => {
      alert(err);
     });
    };

    return(
        <div className="container">
        <form onSubmit={sentData}>

    <div className="form-group">
            <label for="vehicle_id">Vehicle ID</label>  {/*  for => htmlFor */}
            <input type="text" className="form-control" id="vehicle_id" placeholder="Enter Vehicle ID"
            onChange={(e)=>{
            setVehicle_ID(e.target.value);
          }}/>
           </div>

  <div className="form-group">
    <label for="fuel_date">Fuel Date</label>
    <input type="date" className="form-control" id="fuel_date" placeholder="Enter Fuel Date"
    onChange={(e)=>{  // e means event
      setFuel_Date(e.target.value);
    }}/>
  </div>

  <div className="form-group">
    <label for="fuel_type">Fuel Type</label>
    <input type="text" className="form-control" id="fuel_type" placeholder="Enter Fuel Type"
    onChange={(e)=>{
      setFuel_Type(e.target.value);
    }}/>
    </div>

<div className="form-group">
    <label for="fuel_quantity">Fuel Quantity</label>
    <input type="number" className="form-control" id="fuel_quantity" placeholder="Enter Fuel Quantity"
    onChange={(e)=>{
      setFuel_Quantity(e.target.value);
    }}/>
  </div>

  <div className="form-group">
    <label for="fuel_cost">Fuel Cost</label>
    <input type="number" className="form-control" id="fuel_cost" placeholder="Enter Fuel Cost"
    onChange={(e)=>{
      setFuel_Cost(e.target.value);
    }}/>
    </div>

    <div className="form-group">
    <label for="vehicle_milage">Vehicle Milage</label>
    <input type="number" className="form-control" id="vehicle_milage" placeholder="Enter Vehicle Milage"
    onChange={(e)=>{
      setVehicle_Milage(e.target.value);
    }}/>
    </div>


  <button type="submit" className="btn btn-primary">Submit Fuel Entry</button>
</form>
</div>
    )
}

