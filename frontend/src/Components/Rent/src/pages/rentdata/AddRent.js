import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, Grid, Paper, Typography } from '@mui/material';
import "./AddRent.css";

const AddRent = ({ onClose }) => {
  const [vehicle_no, setVehicleNo] = useState("");
  const [brand, setBrand] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [milage, setMilage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [receive_date, setReceiveDate] = useState("");
  const [return_date, setReturnDate] = useState("");
  const [owner_name, setOwnerName] = useState("");
  const [owner_phone, setOwnerPhone] = useState("");
  const [owner_email, setOwnerEmail] = useState("");
  const [rental, setRental] = useState("");
  const [total_rent, setTotalRent] = useState(0); // Initialize total_rent to 0
  const [errors, setErrors] = useState({});
  const [isVehicleNoUnique, setIsVehicleNoUnique] = useState(true);

  const handleInputChange = (name, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    switch (name) {
      case "vehicle_no":
        setVehicleNo(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "vehicle_model":
        setVehicleModel(value);
        break;
      case "milage":
        setMilage(value);
        break;
      case "capacity":
        setCapacity(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "receive_date":
        setReceiveDate(value);
        break;
      case "return_date":
        setReturnDate(value);
        break;
      case "owner_name":
        setOwnerName(value);
        break;
      case "owner_phone":
        setOwnerPhone(value);
        break;
      case "owner_email":
        setOwnerEmail(value);
        break;
      case "rental":
        setRental(value);
        break;
      default:
        break;
    }
  };


  const sendData = (e) => {
    e.preventDefault();

    if (validate() && isVehicleNoUnique) {
      let totalRentAmount = 0;

      if (return_date && receive_date && rental) {
        const returnDate = new Date(return_date);
        const receiveDate = new Date(receive_date);
        const rentalAmount = parseFloat(rental);

        if (!isNaN(rentalAmount)) {
          const daysDifference = (returnDate - receiveDate) / (1000 * 60 * 60 * 24);
          totalRentAmount = daysDifference * rentalAmount;
        }
      }

      const newRent = {
        vehicle_no,
        brand,
        vehicle_model,
        milage,
        capacity,
        description,
        receive_date,
        return_date,
        owner_name,
        owner_phone,
        owner_email,
        rental,
        total_rental: totalRentAmount.toFixed(2),
      };

      axios.post("http://localhost:8411/rent/add", newRent)
        .then((response) => {
          alert("Rent Successfully added");
          setVehicleNo("");
          setBrand("");
          setVehicleModel("");
          setMilage("");
          setCapacity("");
          setDescription("");
          setReceiveDate("");
          setReturnDate("");
          setOwnerName("");
          setOwnerPhone("");
          setOwnerEmail("");
          setRental("");
          setTotalRent(0);

          
        })
        .catch((err) => {
          console.error("Error while adding rent:", err);
          alert("Error while adding rent");
        });
    }
  };

  const validate = () => {
    const newErrors = {};
    setErrors({});

    if (!vehicle_no.match(/^([A-Z]{2,3}-\d{4})$/)) {
      newErrors.vehicle_no = "Invalid format (e.g., XX-0000 or XXX-0000)";
    }

    if (!brand) {
      newErrors.brand = "Brand is required";
    }
    if (!vehicle_model) {
      newErrors.vehicle_model = "Vehicle Model is required";
    }
    if (!milage) {
      newErrors.milage = "Mileage is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!owner_name) {
      newErrors.owner_name = "Owner Name is required";
    }
    if (!owner_phone || !owner_phone.match(/^\d{10}$/)) {
      newErrors.owner_phone = "Owner Phone must be 10 digits";
    }
    if (!owner_email || !owner_email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.owner_email = "Invalid email format";
    }

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];

    if (receive_date && receive_date < currentDateString) {
      newErrors.receive_date = "Receive Date cannot be in the past";
    }

    if (return_date && return_date < receive_date) {
      newErrors.return_date = "Return Date must be after Receive Date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (return_date && receive_date && rental) {
      const returnDateObj = new Date(return_date);
      const receiveDateObj = new Date(receive_date);
      const rentalAmount = parseFloat(rental);

      if (!isNaN(rentalAmount)) {
        const daysDifference = (returnDateObj - receiveDateObj) / (1000 * 60 * 60 * 24);
        const totalRentAmount = daysDifference * rentalAmount;

        setTotalRent(totalRentAmount.toFixed(2));
      } else {
        setTotalRent(0);
      }
    } else {
      setTotalRent(0);
    }
  }, [return_date, receive_date, rental]);

  return (
    <Box m={3}>
      <Paper elevation={3} className="addInventoryForm">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <Typography variant="h4" component="h2" align="center" color="primary" mt={2}>
          Add Rent
        </Typography>
        <form onSubmit={sendData}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Vehicle Number"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("vehicle_no", e.target.value)}
                value={vehicle_no}
                error={!!errors.vehicle_no}
                helperText={errors.vehicle_no}
                name="vehicle_no"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Brand"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                value={brand}
                error={!!errors.brand}
                helperText={errors.brand}
                name="brand"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Vehicle Model"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("vehicle_model", e.target.value)}
                value={vehicle_model}
                error={!!errors.vehicle_model}
                helperText={errors.vehicle_model}
                name="vehicle_model"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Milage (in km)"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("milage", e.target.value)}
                value={milage}
                error={!!errors.milage}
                helperText={errors.milage}
                name="milage"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Capacity"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                value={capacity}
                error={!!errors.capacity}
                helperText={errors.capacity}
                name="capacity"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Description"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("description", e.target.value)}
                value={description}
                error={!!errors.description}
                helperText={errors.description}
                name="description"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Receive Date"
                type="date"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("receive_date", e.target.value)}
                value={receive_date}
                error={!!errors.receive_date}
                helperText={errors.receive_date}
                InputLabelProps={{
                  shrink: true,
                }}
                name="receive_date"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Return Date"
                type="date"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("return_date", e.target.value)}
                value={return_date}
                error={!!errors.return_date}
                helperText={errors.return_date}
                InputLabelProps={{
                  shrink: true,
                }}
                name="return_date"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Owner Name"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("owner_name", e.target.value)}
                value={owner_name}
                error={!!errors.owner_name}
                helperText={errors.owner_name}
                name="owner_name"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Owner Phone"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("owner_phone", e.target.value)}
                value={owner_phone}
                error={!!errors.owner_phone}
                helperText={errors.owner_phone}
                name="owner_phone"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Owner Email"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("owner_email", e.target.value)}
                value={owner_email}
                error={!!errors.owner_email}
                helperText={errors.owner_email}
                name="owner_email"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Rental (per day)"
                onBlur={() => validate()}
                onChange={(e) => handleInputChange("rental", e.target.value)}
                value={rental}
                error={!!errors.rental}
                helperText={errors.rental}
                name="rental"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Total Rent"
                value={total_rent}
                disabled
              />
            </Grid>
          </Grid>
          <center>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                ADD RENT
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={onClose}
              >
                CANCEL
              </Button>
            </Box>
          </center>
        </form>
      </Paper>
    </Box>
  );
};

export default AddRent;
