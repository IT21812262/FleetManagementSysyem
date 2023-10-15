// update code second editing




// UpdateInventory before adding the edit button functionality

// import { useHistory } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useLocation,  useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import "./UpdateInventory.css";



// Initialize EmailJS with your user ID
emailjs.init("RnzlVKpWiSPUCD2ru");

export default function UpdateInventory() {

    const { id } = useParams();
    console.log("Received ID:", id);



  const [pid, setPid] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [qty, setQty] = useState("");
  const [unit_price, setUnitPrice] = useState("");
  const [size, setSize] = useState("");
  const [voltage, setVoltage] = useState("");
  const [amp_hrs, setAmpHrs] = useState("");
  const [man_date, setManDate] = useState("");
  const [exp_date, setExpDate] = useState("");
  const [vehicle_brand_and_model,  setVehicleBrandAndModel] = useState("");
  const [vehicle_man_year, setVehicleManYear] = useState("");
  const [reorder_level, setReOrderLevel] = useState("");
  
  const [searchQ, setSearchQ] = useState("");
  const [inventory, setInventory] = useState(null);
  const [showReorderWarning, setShowReorderWarning] = useState(false);
  const [showReorderWarningModal, setShowReorderWarningModal] = useState(false);
//   const [reorderReached, setReorderReached] = useState(false);

//   const history = useHistory(); // Initialize the useHistory hook


//   const location = useLocation();
//   const navigate = useNavigate();
//   const initialInventory = location.state && location.state.InventoryDetails
//   ? location.state.InventoryDetails
//   : {
//     pid: "",
//     type: "",
//     name: "",
//     brand: "",
//     qty: "",
//     unit_price: "",
//     size: "",
//     voltage: "",
//     amp_hrs: "",
//     man_date: "",
//     exp_date: "",
//     vehicle_brand_and_model: "",
//     vehicle_man_year: "",
//     reorder_level: "",

//   };
  
  const [errors, setErrors] = useState({
    pid: "",
    type: "",
    name: "",
    brand: "",
    qty: "",
    unit_price: "",
    size: "",
    voltage: "",
    amp_hrs: "",
    man_date: "",
    exp_date: "",
    vehicle_brand_and_model: "",
    vehicle_man_year: "",
    reorder_level: "",
  });


  // useEffect for searchQ

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        if (searchQ ) {  // searchQ
          const response = await axios.get(
            `http://localhost:8411/inventory/get/${searchQ}`  //searchQ
          );

          if (response.data.inventory) {
            setInventory(response.data.inventory);

            const inventoryData = response.data.inventory;

            const manDate = new Date(inventoryData.man_date);
            const expDate = new Date(inventoryData.exp_date);

            const formattedManDate = manDate.toISOString().split('T')[0];
            const formattedExpDate = expDate.toISOString().split('T')[0];

            setPid(inventoryData.pid);
            setType(inventoryData.type);
            setName(inventoryData.name);
            setBrand(inventoryData.brand);
            setQty(inventoryData.qty);
            setUnitPrice(inventoryData.unit_price);
            setSize(inventoryData.size);
            setVoltage(inventoryData.voltage);
            setAmpHrs(inventoryData.amp_hrs);
            setManDate(formattedManDate);
            setExpDate(formattedExpDate);
            setVehicleBrandAndModel(inventoryData.vehicle_brand_and_model);
            setVehicleManYear(inventoryData.vehicle_man_year);
            setReOrderLevel(inventoryData.reorder_level);
          }
        }
      } catch (error) {
        alert("Error fetching inventory: " + error.message);
      }
    };

    fetchInventoryData();
  }, [searchQ]);


  // useEffect for id

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        if (id ) {  // searchQ
          const response = await axios.get(
            `http://localhost:8411/inventory/get/${id}`  //searchQ
          );

          if (response.data.inventory) {
            setInventory(response.data.inventory);

            const inventoryData = response.data.inventory;

            const manDate = new Date(inventoryData.man_date);
            const expDate = new Date(inventoryData.exp_date);

            const formattedManDate = manDate.toISOString().split('T')[0];
            const formattedExpDate = expDate.toISOString().split('T')[0];

            setPid(inventoryData.pid);
            setType(inventoryData.type);
            setName(inventoryData.name);
            setBrand(inventoryData.brand);
            setQty(inventoryData.qty);
            setUnitPrice(inventoryData.unit_price);
            setSize(inventoryData.size);
            setVoltage(inventoryData.voltage);
            setAmpHrs(inventoryData.amp_hrs);
            setManDate(formattedManDate);
            setExpDate(formattedExpDate);
            setVehicleBrandAndModel(inventoryData.vehicle_brand_and_model);
            setVehicleManYear(inventoryData.vehicle_man_year);
            setReOrderLevel(inventoryData.reorder_level);
          }
        }
      } catch (error) {
        alert("Error fetching inventory: " + error.message);
      }
    };

    fetchInventoryData();
  }, [id]);


    // Function to check if the quantity reaches the reorder level and show a warning
    const checkReorderLevel = (updatedQty, reorderLevel) => {
        if (updatedQty <= reorderLevel) {
          setShowReorderWarningModal(true);
        } else {
          setShowReorderWarningModal(false);
        }
      };
      
    
      // Function to handle quantity input change
      const handleQtyChange = (e) => {
        const updatedQty = parseInt(e.target.value, 10); // Convert input to an integer
        setQty(updatedQty); // Update the quantity state
    
        // Call the function to check if reorder level is reached
        checkReorderLevel(updatedQty, reorder_level);

        // Call the function to check if reorder level is reached
//   if (updatedQty <= reorder_level) {
//     setShowReorderWarning(true);
//   } else {
//     setShowReorderWarning(false);
//   }

      };


      




// Function to send an email to supplier


      function contactSupplyManager  ()  {
        // Define your EmailJS service ID, template ID, and user ID
        const serviceId = "service_gy8ucp6";
        const templateId = "template_yi0ely8";
        const userId = "RnzlVKpWiSPUCD2ru";

        const message = `Re Order Level has reached for product ${id}. Please take necessary actions.`;

      
        // Create a template parameters object with the product ID and any other data you want to include
        const templateParams = {
          productID: id, // Assuming urlPid contains the product ID
          message,//: 'Re Order Level has reached for product ${id}. Please take nessasarry actions.',
          to_name: 'Supply Manager',
          from_name: 'Inventory Manager'
          
        };
      
        // Send the email using EmailJS
        emailjs.send(serviceId, templateId, templateParams, userId)
          .then((response) => {
            console.log("Email sent successfully:",response);
            alert("Email sent successfully:");
            // Close the modal or perform any other actions
            setShowReorderWarningModal(false);

            
          })
          .catch((error) => {
            // console.error("Email send error:", error);
            alert("Email send error:", error);
            // Handle the error, e.g., display an error message to the user
          });
      };
      


  function handleInputChange(e, setter, fieldName) {
    const value = e.target.value;
    setter(value);

    const validationFunction = getValidationFunction(fieldName);
    const isValid = validationFunction(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: isValid ? "" : getErrorMessage(fieldName),
    }));
  }

  function sentData(e) {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    if (inventory) {
      const newInventory = {
        pid,
        type,
        name,
        brand,
        qty,
        unit_price,
        size,
        voltage,
        amp_hrs,
        man_date,
        exp_date,
        vehicle_brand_and_model,
        vehicle_man_year,
        reorder_level
      };

      axios
        .put(`http://localhost:8411/inventory/update/${pid}`, newInventory)
        .then((response) => {

            //  alert("Updated Successfully...")
            // window.location.href = '/inventory/allInventory';
        //   resetForm();
          console.log(response);
        })
        .catch((err) => {
          alert(err);
        });
        alert("Updated Successfully...")
        resetForm();
                // Redirect to the AllInventory page
         window.location.href = '/inventory/inventorydata'; 

        // history.push("/inventory/allInventory");  // Redirect to the AllInventory page after a successful update


    } else {
      alert("Inventory data is null.");
    }
  }

  function resetForm() {
    setPid("");
    setType("");
    setName("");
    setBrand("");
    setQty("");
    setUnitPrice("");
    setSize("");
    setVoltage("");
    setAmpHrs("");
    setManDate("");
    setExpDate("");
    setVehicleBrandAndModel("");
    setVehicleManYear("");
    setReOrderLevel("");
  }

  const validatePid = (pid) => {
    const regexPattern = /^[a-zA-Z]{3}\d{5}$/;
    return regexPattern.test(pid);
  };

  const validateType = (type) => {
    return type.length <= 25;
  };

  const validateName = (name) => {
    return name.length <= 25;
  };

  const validateBrand = (brand) => {
    return brand.length <= 25;
  };

  const validateQty = (qty) => {
    return /^\d+$/.test(qty);
  };

  const validateUnitPrice = (unitPrice) => {
    return !isNaN(parseFloat(unitPrice)) && parseFloat(unitPrice) >= 0;
  };

  const validateSize = (size) => {
    return size.length <= 50 || size === "";
  };

  /*
  const validateVoltage = (voltage) => {
    return !isNaN(parseFloat(voltage)) || voltage === "";
  };
  */

  const validateVoltage = (voltage) => {
    if (voltage === "") {
      return true; // Field is empty, so it's valid
    }
  
    const parsedVoltage = parseInt(voltage);
    return !isNaN(parsedVoltage) && parsedVoltage >= 0 && parsedVoltage <= 24;
  };
  

  /*
  const validateAmpHrs = (ampHrs) => {
    if (ampHrs === "") {
      return true;
    }
    return !isNaN(parseFloat(ampHrs)) && parseFloat(ampHrs) >= 0;
  };
  */

  const validateAmpHrs = (ampHrs) => {
    if (ampHrs === "") {
      return true; // Field is empty, so it's valid
    }
  
    const parsedAmpHrs = parseFloat(ampHrs);
    return !isNaN(parsedAmpHrs) && parsedAmpHrs >= 0 && parsedAmpHrs <= 500 && Number.isInteger(parsedAmpHrs);
  };
  
/*
  const validateManDate = (manDate) => {
    const currentDate = new Date();
    return new Date(manDate) < currentDate;
  };
  */

const validateManDate = (manDate) => {
  const inputDate = new Date(manDate);
  const currentDate = new Date(); // Get the current date

  return inputDate < currentDate;
};
  
  

  const validateExpDate = (expDate) => {
    const currentDate = new Date();
    return new Date(expDate) > currentDate;
  };

  const validateVehicleBrandAndModel = (value) => {
    return value.length <= 50 || value === "";
  };
  
/*
  const validateVehicleManYear = (year) => {
    const currentYear = new Date().getFullYear();
    return !isNaN(parseInt(year)) && parseInt(year) < currentYear;
  };
  */

//   const validateVehicleManYear = (year) => {
//     const currentYear = new Date().getFullYear();
//     const parsedYear = parseInt(year);
  
//     if (year === "") {
//       return true; // Field is empty, so it's valid
//     }

    const validateVehicleManYear = (value) => {
        if (value === "") {
          return true; // Field is empty, so it's valid
        }
      
        const parsedValue = parseInt(value);
        const currentYear = new Date().getFullYear();
      
        return (
          !isNaN(parsedValue) &&
          parsedValue >= 1990 &&
          parsedValue <= currentYear
        );
      };









  const validateReorderLevel = (level) => {
    return /^\d+$/.test(level) && parseInt(level) >= 10 && parseInt(level) <= 100;
  };

  const getValidationFunction = (fieldName) => {
    switch (fieldName) {
      case "pid":
        return validatePid;
      case "type":
        return validateType;
      case "name":
        return validateName;
      case "brand":
        return validateBrand;
      case "qty":
        return validateQty;
      case "unit_price":
        return validateUnitPrice;
      case "size":
        return validateSize;
      case "voltage":
        return validateVoltage;
      case "amp_hrs":
        return validateAmpHrs;
      case "man_date":
        return validateManDate;
      case "exp_date":
        return validateExpDate;
      case "vehicle_brand_and_model":
        return validateVehicleBrandAndModel;
      case "vehicle_man_year":
        return validateVehicleManYear;
      case "reorder_level":
        return validateReorderLevel;
      default:
        return () => true; // Default to always valid
    }
  };

  const getErrorMessage = (fieldName) => {
    switch (fieldName) {
      case "pid":
        return "Invalid Product ID. It should be 3 uppercase or lowercase letters followed by 5 whole numbers and cannot be edited.";
      case "type":
        return "Product Type should contain a maximum of 25 characters.";
      case "name":
        return "Product Name should contain a maximum of 25 characters.";
      case "brand":
        return "Brand should contain a maximum of 25 characters.";
      case "qty":
        return "Quantity should be a non-negative whole number.";
      case "unit_price":
        return "Unit Price should be a non-negative real number.";
      case "size":
        return "Product Size should contain a maximum of 50 characters.";
      case "voltage":
        return "Voltage should be a non-negative whole or real number and should not exceed 24 Volts.";
      case "amp_hrs":
        return "Ampiers should be a non-negative whole or real number and should not exceed 500 Ampiers.";
      case "man_date":
        return "Manufactured Date should be before the current date.";
      case "exp_date":
        return "Expiry Date should be after the current date.";
      case "vehicle_brand_and_model":
        return "Vehicle Brand And Model should contain a maximum of 50 characters.";
      case "vehicle_man_year":
        return "Vehicle Manufacture Year should be a positive whole number less than the current year. Vehicles before 1990 are not accepted";
      case "reorder_level":
        return "Re-Order Level should be a positive whole number greater than or equal to 10 and less than or equal to 100.";
      default:
        return ""; // Default error message
    }
  };

  return (
    <div className="container">
      <form onSubmit={sentData}>
        {/* Separate "Enter Product ID" input field */}
        <div className="form-group">
          <label htmlFor="pid">Enter Product ID &nbsp;&nbsp;</label>
        <input
          type="text"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Enter Product ID"
        />
        </div>

        {inventory ? (
          <ul>
            <li key={inventory.id}>
              <div className="form-group">
                <label htmlFor="pid">Product ID</label>
                <input
                  type="text"
                  value={pid}
                  className="form-control"
                  id="pid"
                  placeholder="Enter Product ID"
                  onChange={(e) => handleInputChange(e, setPid, "pid")}
                  disabled={!!inventory.pid}
                />
                <div className="error-message">{errors.pid}</div>
              </div>

              <div className="form-group">
                <label htmlFor="type">Product Type</label>
                <input
                  type="text"
                  value={type}
                  className="form-control"
                  id="type"
                  placeholder="Enter Product Type"
                  onChange={(e) => handleInputChange(e, setType, "type")}
                />
                <div className="error-message">{errors.type}</div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  id="name"
                  placeholder="Enter Product Name"
                  onChange={(e) => handleInputChange(e, setName, "name")}
                />
                <div className="error-message">{errors.name}</div>
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  value={brand}
                  className="form-control"
                  id="brand"
                  placeholder="Enter Brand"
                  onChange={(e) => handleInputChange(e, setBrand, "brand")}
                />
                <div className="error-message">{errors.brand}</div>
              </div>

              <div className="form-group">
                <label htmlFor="qty">Quantity</label>
                <input
                  type="number"
                  value={qty}
                  className="form-control"
                  id="qty"
                  placeholder="Enter Quantity"
                  onChange={(e) => {
                    handleInputChange(e, setQty, "qty");
                    handleQtyChange(e);
                }}
                />
                <div className="error-message">{errors.qty}</div>
              </div>
              

               {/* Render the warning modal */}
                {showReorderWarningModal && (  
                <div className="modal">
                 <div className="modal-content">
                    <h2>Reorder Level is reached!</h2>
                    <p>Product ID: {id}</p>     
                    <p>Contact the Supply Manager?</p>
                    <button type="button" onClick={contactSupplyManager}>Contact Supply Manager</button>
                    <button onClick={() => setShowReorderWarningModal(false)}>Cancel</button>
                 </div>
                </div>
            )}
           

{/* {showReorderWarning && (
  <div className="modal">
    <div className="modal-content">
      <h2>Reorder Level is reached!</h2>
      <p>Product ID: {id}</p>
      <p>Contact the Supply Manager?</p>
      <button onClick={contactSupplyManager}>Contact Supply Manager</button>
      <button onClick={() => setShowReorderWarning(false)}>Cancel</button>
    </div>
  </div>
)} */}

              <div className="form-group">
                <label htmlFor="unit_price">Unit Price</label>
                <input
                  type="number"
                  value={unit_price}
                  className="form-control"
                  id="unit_price"
                  placeholder="Enter Unit Price"
                  onChange={(e) => handleInputChange(e, setUnitPrice, "unit_price")}
                />
                <div className="error-message">{errors.unit_price}</div>
              </div>

              <div className="form-group">
                <label htmlFor="size">Product Size</label>
                <input
                  type="text"
                  value={size}
                  className="form-control"
                  id="size"
                  placeholder="Enter Product Size"
                  onChange={(e) => handleInputChange(e, setSize, "size")}
                />
                <div className="error-message">{errors.size}</div>
              </div>

              <div className="form-group">
                <label htmlFor="voltage">Voltage</label>
                <input
                  type="text"
                  value={voltage}
                  className="form-control"
                  id="voltage"
                  placeholder="Enter Voltage"
                  onChange={(e) => handleInputChange(e, setVoltage, "voltage")}
                />
                <div className="error-message">{errors.voltage}</div>
              </div>

              <div className="form-group">
                <label htmlFor="amp_hrs">Ampiers</label>
                <input
                  type="text"
                  value={amp_hrs}
                  className="form-control"
                  id="amp_hrs"
                  placeholder="Enter Ampiers"
                  onChange={(e) => handleInputChange(e, setAmpHrs, "amp_hrs")}
                />
                <div className="error-message">{errors.amp_hrs}</div>
              </div>

              <div className="form-group">
                <label htmlFor="man_date">Manufactured Date</label>
                <input
                  type="date"
                  value={man_date}
                  className="form-control"
                  id="man_date"
                  placeholder="Enter Manufactured Date"
                  onChange={(e) => handleInputChange(e, setManDate, "man_date")}
                />
                <div className="error-message">{errors.man_date}</div>
              </div>

              <div className="form-group">
                <label htmlFor="exp_date">Expiry Date</label>
                <input
                  type="date"
                  value={exp_date}
                  className="form-control"
                  id="exp_date"
                  placeholder="Enter Expiry Date"
                  onChange={(e) => handleInputChange(e, setExpDate, "exp_date")}
                />
                <div className="error-message">{errors.exp_date}</div>
              </div>

              <div className="form-group">
                <label htmlFor="vehicle_brand_and_model">Vehicle Brand And Model</label>
                <input
                  type="text"
                  value={vehicle_brand_and_model}
                  className="form-control"
                  id="vehicle_brand_and_model"
                  placeholder="Enter Vehicle Brand And Model"
                  onChange={(e) => handleInputChange(e, setVehicleBrandAndModel, "vehicle_brand_and_model")}
                />
                <div className="error-message">{errors.vehicle_brand_and_model}</div>
              </div>

              <div className="form-group">
                <label htmlFor="vehicle_man_year">Vehicle Manufacture Year</label>
                <input
                  type="number"
                  value={vehicle_man_year}
                  className="form-control"
                  id="vehicle_man_year"
                  placeholder="Enter Vehicle Manufacture Year"
                  onChange={(e) => handleInputChange(e, setVehicleManYear, "vehicle_man_year")}
                />
                <div className="error-message">{errors.vehicle_man_year}</div>
              </div>

              <div className="form-group">
                <label htmlFor="reorder_level">Re-Order Level</label>
                <input
                  type="number"
                  value={reorder_level}
                  className="form-control"
                  id="reorder_level"
                  placeholder="Enter Re-Order Level"
                  onChange={(e) => handleInputChange(e, setReOrderLevel, "reorder_level")}
                />
                <div className="error-message">{errors.reorder_level}</div>
              </div>
            </li>
          </ul>
        ) : null}

<div className="button-container">
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={resetForm}
          >
            CANCEL
          </button>

          {/* Back to Dashboard button */}
          <Link to="/inventory/inventorydata" className="back-to-dashboard-link">
            <button className="back-to-dashboard-button">Back to DASHBOARD</button>
          </Link>
        </div>

        {/* <button
            type="button"
            className="btn btn-primary"
            onClick={handleBackToDashboard}>
                Back to DASHBOARD
      </button> */}

      </form>
    </div>
  );
}
