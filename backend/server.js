const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();



const PORT = process.env.PORT || 8411;

app.use(cors());
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false, 
});



const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Your MongoDB connection is success!!!!!");
})

//const dashboard = require("./routes/supplier")//dashbord
const supplier = require("./routes/supplier.js")//supplier.js
const supplier = require("./routes/supplier.js")//supplier.js

//Fuel Management System - Start
const fuel_entry = require("./routes/fuel_entry.js")
const fuel_stock = require("./routes/fuel_stock.js")

app.use("/fuel_entry", fuel_entry);
app.use("/fuel_stock", fuel_stock);

//Fuel Management System - End

//another 8
const rent = require("./routes/rent.js");

/*http://Localhost:8411/supplier*/

//app.use("/", dashboard);
app.use("/supplier", supplier);

//anothe 8
app.use("/rent", rent);





//app.use("/", dashboardRent);





// creating the route for the inventory_management system

const inventoryRouter = require("./routes/inventory.js");

// http://localhost:8070/inventory

app.use("/inventory", inventoryRouter);



app.listen(PORT, () =>{
    console.log(`Server is up and running on port number is: ${PORT}`)
})
