import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create a PDFReport component for generating PDFs
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
    padding: "20px",
  },
  form: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  linkButton: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#ccc",
    color: "#333",
    textDecoration: "none",
    marginLeft: "10px",
  },
});

const PDFReport = ({ rent }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Calculate the total rental
  const calculateTotalRental = () => {
    if (rent && rent.receive_date && rent.return_date && rent.rental) {
      const receiveDate = new Date(rent.receive_date);
      const returnDate = new Date(rent.return_date);
      const rental = parseFloat(rent.rental);
      const timeDifference = returnDate - receiveDate; // Time difference in milliseconds
      const days = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
      const totalRental = days * rental;
      return totalRental.toFixed(2); // Round to two decimal places
    }
    return 0;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Rent Details</Text>
        {rent && (
          <View>
            <Text style={styles.listItem}>Vehicle Number: {rent.vehicle_no}</Text>
            <Text style={styles.listItem}>Brand: {rent.brand}</Text>
            <Text style={styles.listItem}>Vehicle Model: {rent.vehicle_model}</Text>
            <Text style={styles.listItem}>Mileage: {rent.milage}</Text>
            <Text style={styles.listItem}>Capacity: {rent.capacity}</Text>
            <Text style={styles.listItem}>Description: {rent.description}</Text>
            <Text style={styles.listItem}>Receive Date: {formatDate(rent.receive_date)}</Text>
            <Text style={styles.listItem}>Return Date: {formatDate(rent.return_date)}</Text>
            <Text style={styles.listItem}>Owner Name: {rent.owner_name}</Text>
            <Text style={styles.listItem}>Owner Phone: {rent.owner_phone}</Text>
            <Text style={styles.listItem}>Owner Email: {rent.owner_email}</Text>
            <Text style={styles.listItem}>Rental: {rent.rental}</Text>
            
            {/* Display the calculated total rental */}
            <Text style={styles.listItem}>Total Rental: Rs.{calculateTotalRental()}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};


export default function UniqueRent() {
  const { id } = useParams();
  const [rent, setRent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/rent/get/${id}`);
          setRent(response.data.rent);
        }
      } catch (error) {
        alert("Error fetching rent:", error.message);
      }
    };

    fetchRentData();
  }, [id]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value.toUpperCase());
  };

  const fetchRentDataBySearch = async () => {
    try {
      if (searchQuery) {
        const response = await axios.get(`http://localhost:8411/rent/get/${searchQuery}`);
        setRent(response.data.rent);
      }
    } catch (error) {
      alert("Error fetching rent:", error.message);
    }
  };

  const handleDelete = async (vehicle_no) => {
    const confirmation = window.prompt("To confirm deletion, type 'CONFIRM' (case-sensitive):");

    if (confirmation === "CONFIRM") {
      try {
        await axios.delete(`http://localhost:8411/rent/delete/${rent.vehicle_no}`);
        alert("Rent record deleted successfully.");

        navigate("/rent/allRent");
      } catch (error) {
        alert("Error deleting rent record:", error.message);
      }
    } else {
      alert("Deletion cancelled. No changes were made.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRentDataBySearch();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container" style={styles.container}>
      <h1>Unique Rent Record</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQuery}
          placeholder="Enter Vehicle Number"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Fetch Rent Data
        </button>
        <Link to="/rent/allRent" style={styles.linkButton}>
          Cancel
        </Link>
      </form>

      <PDFDownloadLink document={<PDFReport rent={rent} />} fileName="rent_report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF Report"
        }
      </PDFDownloadLink>

      {rent ? (
        <ul>
          <li key={rent.id}>
            Vehicle Number: {rent.vehicle_no}<br />
            Brand: {rent.brand}<br />
            Vehicle Model: {rent.vehicle_model}<br />
            Mileage: {rent.milage}<br />
            Capacity: {rent.capacity}<br />
            Description: {rent.description}<br />
            Receive Date: {formatDate(rent.receive_date)}<br />
            Return Date: {formatDate(rent.return_date)}<br />
            Owner Name: {rent.owner_name}<br />
            Owner Phone: {rent.owner_phone}<br />
            Owner Email: {rent.owner_email}<br />
            Rental: {rent.rental}<br />
            <button
              onClick={() => handleDelete(rent.vehicle_no)}
              style={{ backgroundColor: "red", color: "#fff" }} // Set the background color to red
            >
  Delete Rent Record
</button>

          </li>
        </ul>
      ) : (
        <p>No rent record found with the specified Vehicle Number.</p>
      )}

      {/* Link to All Rent page */}
      <Link to="/rent/allRent" style={styles.linkButton}>
        All Rent
      </Link>
    </div>
  );
}
