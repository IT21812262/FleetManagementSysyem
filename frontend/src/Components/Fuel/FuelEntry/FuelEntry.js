import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from '../Sidebar'; // Import your Sidebar component
import "./Fuelentry.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Fuelentry = () => {
  const [fuelentries, setFuelentries] = useState([]);

  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8411/fuelentry/delete/${vehicleId}`);
      alert('Fuel entry deleted successfully.');
      // Navigate to All Fuel entry page
      window.location.href = "/fuel/fuelentry";
    } catch (error) {
      alert('Error deleting fuel entry:', error.message);
    }
  };

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
    <div className="fuelentry">
      <Sidebar />

      <div className="framfuelentry">
        <div className="backgroundfuelentry" />

        <div className="searchfuelentry">
          <img className="iconssearch" alt="" src="/iconssearch.svg" />
          <div className="search">Search Fuel Entry...</div>
        </div>
        <button className="btnpdf" onClick={generatePdf} type="button">Generate Report</button>
        <div className="addfuelentry">
          
          <div className="btnaddfuelentry">
            <Link to="addFuelentry">
              <button className="btnaddfuelentry">ADD NEW FUEL ENTRY</button>
            </Link>
          </div>
        </div>

        <div className="allfuelentry">
          <div className="div">
            <div className="inner">
            </div>
          </div>
          <div className="table">
            <div className="frame-parent1">
              <div className="vehicle-id-wrapper">
                <b className="vehicle-id">VEHICLE ID</b>
              </div>
              <div className="quantity-parent">
                <b className="vehicle-id">QUANTITY</b>
                <img
                  className="iconssearch"
                  alt=""
                  src="/bxssortalt.svg"
                />
              </div>
              <div className="type-parent">
                <b className="vehicle-id">TYPE</b>
                <img
                  className="iconssearch"
                  alt=""
                  src="/bxssortalt1.svg"
                />
              </div>
              <div className="date-parent">
                <b className="vehicle-id">DATE</b>
                <img
                  className="iconssearch"
                  alt=""
                  src="/bxssortalt2.svg"
                />
              </div>
              <div className="cost-wrapper">
                <b className="vehicle-id">COST</b>
              </div>
              <div className="cost-wrapper">
                <b className="vehicle-id">MILAGE</b>
              </div>
              <div className="vehicle-id-wrapper">
                <b className="vehicle-id">OPERATIONS</b>
              </div>
            </div>
            {/* Map over fuelentries and create rows */}
            {fuelentries.map((fuelentry) => (
              <div className="frame-parent2" key={fuelentry.id}>
                <div className="vehicle-id-wrapper">
                  <div className="search">{fuelentry.vehicle_id}</div>
                </div>
                <div className="cost-wrapper">
                  <div className="search">{fuelentry.fuel_quantity}</div>
                </div>
                <div className="inner">
                  <div className="search">{fuelentry.fuel_type}</div>
                </div>
                <div className="cost-wrapper">
                  <div className="search">{fuelentry.fuel_date}</div>
                </div>
                <div className="cost-wrapper">
                  <div className="search">{fuelentry.fuel_cost}</div>
                </div>
                <div className="cost-wrapper">
                  <div className="search">{fuelentry.vehicle_milage}</div>
                </div>
                <div className="frame-wrapper3">
                
                  <div className="edit-1-2-parent">
                    <Link to={`/fuel/fuelentry/updateFuelentry/${fuelentry.vehicle_id}`} state={{ fuelentryData: fuelentry }}>
                      <img className="trash-2-2-icon" alt="" src="/edit.png" />
                    </Link>
                    <Link to={`/fuel/fuelentry/uniqueFuelentry/${fuelentry.vehicle_id}`} state={{ fuelentryData: fuelentry }}>
                      <img className="trash-2-2-icon" alt="" src="/view.png" />
                    </Link>
                    <Link onClick={() => handleDelete(fuelentry.vehicle_id)}>
                      <img className="trash-2-2-icon" alt="" src="/delete.png" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="div6">
            <div className="show-parent">
              <div className="previous">Previous</div>
              <div className="wrapper2">
                <div className="div7">1</div>
              </div>
              <div className="wrapper3">
                <div className="div7">2</div>
              </div>
              <div className="wrapper3">
                <div className="div7">3</div>
              </div>
              <div className="previous">Next</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fuelentry;
