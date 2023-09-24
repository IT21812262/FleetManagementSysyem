import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllRent() {
  const [originalRents, setOriginalRents] = useState([]);
  const [rents, setRents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const getRents = async () => {
      try {
        const response = await axios.get("http://localhost:8411/rent/");
        setOriginalRents(response.data);
        setRents(response.data);
      } catch (error) {
        alert("Error fetching rents: " + error.message);
      }
    };

    getRents();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);

    if (keyword === "") {
      // If the search input is empty, reset to show all information
      setRents(originalRents);
    } else {
      // Filter the rents array based on the keyword
      const filteredRents = originalRents.filter((rent) =>
        // Customize this condition based on your search requirements
        rent.brand.toLowerCase().includes(keyword)
      );
      setRents(filteredRents);
    }
  };

  return (
    <div className="container">
      <h1>All Rents</h1>

      {/* Search input field */}
      <div>
        <input
          type="text"
          placeholder="Search by brand"
          value={searchKeyword}
          onChange={handleSearch}
        />
      </div>

      <ul>
        {rents.map((rent) => (
          <li key={rent.vehicle_no}>
            Vehicle No: {rent.vehicle_no}<br />
            Brand: {rent.brand}<br />
            {/* Display other rent attributes here... */}
            <Link to={`/rent/updateRent/${rent.vehicle_no}`} state={{ rentDetails: rent }}>
              <button className="update-button">Update</button>
            </Link>
            <Link to={`/rent/uniqueRent/${rent.vehicle_no}`} state={{ rentDetails: rent }}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
