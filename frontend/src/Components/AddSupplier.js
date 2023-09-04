import React, {useState} from "react";

export default function AddSupplier(){

    return(
        <div className="container">
        <form>
  <div class="form-group">

    <label for="name">Supplier Name</label>
    <input type="text" class="form-control" id="name" placeholder="Enter Supplier Name"/>
  
  </div>

  <div class="form-group">

    <label for="id">Supplier ID</label>
    <input type="text" class="form-control" id="id" placeholder="Enter Supplier ID"/>
  
  </div>
  <div class="form-group">

    <label for="position">Supplier Position</label>
    <input type="text" class="form-control" id="position" placeholder="Enter Supplier Position"/>

    </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
    )
}

