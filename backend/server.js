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

const fuel_entry = require("./routes/fuel_entry.js")
const fuel_stock = require("./routes/fuel_stock.js")
const inventoryRouter = require("./routes/inventory.js");
const rent = require("./routes/rent.js");
const supplier = require("./routes/supplier.js")
const trip = require("./routes/trip.js");

/*http://Localhost:8411/supplier*/


app.use("/fuel_entry", fuel_entry);
app.use("/fuel_stock", fuel_stock);
app.use("/supplier", supplier);
app.use("/rent", rent);
app.use("/inventory", inventoryRouter);
app.use("/trip", trip);

app.listen(PORT, () =>{
    console.log(`Server is up and running on port number is: ${PORT}`)
})
