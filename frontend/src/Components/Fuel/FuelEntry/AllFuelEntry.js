import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllFuelentry.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";


export default function AllFuelentry() {

  const [fuelentries, setFuelentries] = useState([]);

  useEffect(() => {
    const getFuelentries = async () => {
      try {
        const response = await axios.get('http://localhost:8411/fuelentry/');
        setFuelentries(response.data);
      } catch (error) {
        alert('Error fetching fuel entries:', error.message);
      }
    };

    getFuelentries();
  }, []);
  const generatePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const columns = [
      "Vehicle ID",
      "Fuel Date",
      "Fuel Type",
      "Fuel Quantity",
      "Fuel Cost",
      "Vehicle Milage",
    ];

    const rows = fuelentries.map((fuelentry) => [
      fuelentry.vehicle_id,
      fuelentry.fuel_date,
      fuelentry.fuel_type,
      fuelentry.fuel_quantity,
      fuelentry.fuel_cost,
      fuelentry.vehicle_milage,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("fuel_entry_report.pdf");
  };
  return (
    <div className="container">
      <h1>All Fuel Entries</h1>
      <button onClick={generatePdf} type="button">Generate Report</button>
      <ul>
        {fuelentries.map((fuelentry) => (
          <li key={fuelentry.id}>
            Vehicle ID: {fuelentry.vehicle_id}<br />
            Fuel Date: {fuelentry.fuel_date}<br />
            Fuel Type: {fuelentry.fuel_type}<br />
            Fuel Quantity: {fuelentry.fuel_quantity}<br />
            Fuel Cost: {fuelentry.fuel_cost}<br />
            Vehicle Milage: {fuelentry.vehicle_milage}<br />

            <Link to={`/fuel/fuelentry/updateFuelentry/${fuelentry.vehicle_id}`} state={{ fuelentryData: fuelentry }}>
              <button>Update</button>
            </Link>
            <Link to={`/fuel/fuelentry/uniqueFuelentry/${fuelentry.vehicle_id}`} state={{ fuelentryData: fuelentry }}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
