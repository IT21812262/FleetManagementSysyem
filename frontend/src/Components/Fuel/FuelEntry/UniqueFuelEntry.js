import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./UniqueFuelentry.css"; // Import the CSS file
import Sidebar from "../Sidebar"; // Import the Sidebar component

export default function UniqueFuelentry() {
  const { id } = useParams();
  const [fuelentry, setFuelentry] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    const fetchFuelentryData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/fuelentry/get/${id}`);
          setFuelentry(response.data.fuelentry);
        }
      } catch (error) {
        alert('Error fetching fuel entry:', error.message);
      }
    };

    fetchFuelentryData();
  }, [id]);

  const handleSearchQ = (e) => {
    setSearchQ(e.target.value);
  };

  const fetchFuelentryDataBySearch = async () => {
    try {
      if (searchQ) {
        const response = await axios.get(`http://localhost:8411/fuelentry/get/${searchQ}`);
        setFuelentry(response.data.fuelentry);
      }
    } catch (error) {
      alert('Error fetching fuel entry:', error.message);
    }
  };

  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8411/fuelentry/delete/${vehicleId}`);
      alert('Fuel entry deleted successfully.');
      // Navigate to All Fuel entry page
      window.location.href = "/fuel/allFuelentry";
    } catch (error) {
      alert('Error deleting fuel entry:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFuelentryDataBySearch();
  };

  return (
    <div className="addfuelentry1"> {/* Apply the mcontainer1 CSS class */}
      <Sidebar /> {/* Render the Sidebar component */}
      <div className="contentbg"> {/* Apply the content background CSS class */}
        <div className="contentbg-item"> {/* Apply the content background item CSS class */}
          <div className="container1m">
            <h1 className="h1m">Unique Fuel Entry</h1>

            <form className="form1m" onSubmit={handleSubmit}>
              <input className="inputm"
                type="text"
                value={searchQ}
                onChange={handleSearchQ}
                placeholder="Enter Vehicle Id"
              />
              <button className="buttonm" type="submit">Fetch Fuel Entry Data</button>
              <Link to="/fuel/allFuelentries">
                <button className="buttonm" type="button">Cancel</button>
              </Link>
            </form>

            {fuelentry ? (
              <ul className="ulm">
                <li className="lim" key={fuelentry.id}>
                  Vehicle ID: {fuelentry.vehicle_id}<br />
                  Fuel Date: {fuelentry.fuel_date}<br />
                  Fuel Type: {fuelentry.fuel_type}<br />
                  Fuel Quantity: {fuelentry.fuel_quantity}<br />
                  Fuel Cost: {fuelentry.fuel_cost}<br />
                  Vehicle Milage: {fuelentry.vehicle_milage}<br />

                  <button className="buttonm" onClick={() => handleDelete(fuelentry.vehicle_id)}>Delete Fuel Entry</button>
                </li>
              </ul>
            ) : (
              <p>No fuel entry found with the specified Vehicle Id.</p>
            )}

            {/* Link to All Fuel Entry page */}
            <Link to="/fuel/fuelentry/allfuelentries">All Fuel Entries</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
