import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from '../Sidebar'; // Import your Sidebar component
import "./Fuelstock.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Fuelstock = () => {
  const [fuelstocks, setFuelstocks] = useState([]);

  const handleDelete = async (invoiceNo) => {
    try {
      await axios.delete(`http://localhost:8411/fuelstock/delete/${invoiceNo}`);
      alert('Fuel stock deleted successfully.');
      // Navigate to All Fuel stock page
      window.location.href = "/fuel/fuelstock";
    } catch (error) {
      alert('Error deleting fuel stock:', error.message);
    }
  };

  useEffect(() => {
    const getFuelstocks = async () => {
      try {
        const response = await axios.get('http://localhost:8411/fuelstock/');
        setFuelstocks(response.data);
      } catch (error) {
        alert('Error fetching fuel stocks:', error.message);
      }
    };

    getFuelstocks();
  }, []);
  const generatePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const columns = [
      "Invoice No",
      "Fuel Type",
      "Quantity",
      "Per Liter Cost",
      "Total Cost",
      "Stocked Fuel Date",
    ];

    const rows = fuelstocks.map((fuelstock) => [
      fuelstock.invoice_no,
      fuelstock.stocked_fuel_type,
      fuelstock.stocked_fuel_quantity,
      fuelstock.per_leter_cost,
      fuelstock.total_cost,
      fuelstock.stocked_fuel_date,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("fuelstock_report.pdf");
  };
  
  return (
    <div className="fuelentry">
      <Sidebar />

      <div className="framfuelentry">
        <div className="backgroundfuelentry" />

        <div className="searchfuelentry">
          <img className="iconssearch" alt="" src="/iconssearch.svg" />
          <div className="search">Search Fuel Stock...</div>
        </div>
        <button className="btnpdf" onClick={generatePdf} type="button">Generate Report</button>
        <div className="addfuelentry">
          <div className="btnaddfuelentry">
            <Link to="addFuelstock">
              <button className="btnaddfuelentry">ADD NEW FUEL STOCK</button>
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
                <b className="vehicle-id">INVOICE NO</b>
              </div>
              <div className="type-parent">
                <b className="vehicle-id">FUEL TYPE</b>
              </div>
              <div className="quantity-parent">
                <b className="vehicle-id">QUANTITY</b>
              </div>
              <div className="cost-wrapper">
                <b className="vehicle-id">PER LETER COST</b>
              </div>
              <div className="date-parent">
                <b className="vehicle-id">DATE</b>
              </div>
              <div className="cost-wrapper">
                <b className="vehicle-id">MILAGE</b>
              </div>
              <div className="vehicle-id-wrapper">
                <b className="vehicle-id">OPERATIONS</b>
              </div>
            </div>
            {/* Map over fuelentries and create rows */}
            {fuelstocks.map((fuelstock) => (
              <div className="frame-parent2" key={fuelstock.id}>
                <div className="vehicle-id-wrapper">
                  <div className="search">{fuelstock.invoice_no}</div>
                </div>
                <div className="cost-wrapper">
                  <div className="search">{fuelstock.stocked_fuel_type}</div>
                </div>
                <div className="inner">
                  <div className="search">{fuelstock.stocked_fuel_quantity}</div>
                </div>
                <div className="cost-wrapper">
                  <div className="search">{fuelstock.per_leter_cost}</div>
                </div>
                <div className="cost-wrapper">
                  <div className="search">{fuelstock.total_cost}</div>
                </div>
                <div className="cost-wrapper">
                  <div className="search">{fuelstock.stocked_fuel_date}</div>
                </div>
                <div className="frame-wrapper3">
                
                  <div className="edit-1-2-parent">
                    <Link to={`/fuel/fuelstock/updateFuelstock/${fuelstock.invoice_no}`} state={{ fuelstockData: fuelstock }}>
                      <img className="trash-2-2-icon" alt="" src="/edit.png" />
                    </Link>
                    <Link to={`/fuel/fuelstock/uniqueFuelstock/${fuelstock.invoice_no}`} state={{ fuelstockData: fuelstock }}>
                      <img className="trash-2-2-icon" alt="" src="/view.png" />
                    </Link>
                    <Link onClick={() => handleDelete(fuelstock.invoice_no)}>
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

export default Fuelstock;
