import React, { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddTrip from './AddTrip';
import "./index.css";

const Tripdata = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isPopupVisible, setPopupVisible] = useState(false);
  
  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const [trips, setTrips] = useState([]);

  const handleDelete = async (tripId) => {
    try {
      await axios.delete(`http://localhost:8411/trip/delete/${tripId}`);
      alert('Trip deleted successfully.');
      window.location.reload();
    } catch (error) {
      alert('Error deleting trip:', error.message);
    }
  };

  // Generate unique IDs for each row
  const rows = trips.map((trip, index) => ({
    id: index + 1, // You can use any method to generate unique IDs
    tripid: trip.tripid,
    tripname: trip.tripname,
    tripduration: parseFloat(trip.tripduration),
    tripdistance: parseFloat(trip.tripdistance),
    vehicleno: trip.vehicleno,
    driverid: trip.driverid,
    startpoint: trip.startpoint,
    destination: trip.destination,
    tripgoods: trip.tripgoods,
    arrivaltime: parseFloat(trip.arrivaltime),
    departuretime: parseFloat(trip.departuretime),
    startfuel: parseFloat(trip.startfuel),
    endfuel: parseFloat(trip.endfuel),
  }));

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const columns = [
    {
      field: "tripid",
      headerName: "Trip ID",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "tripname",
      headerName: "Trip Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "tripduration",
      headerName: "Trip Duration",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "tripdistance",
      headerName: "Trip Distance",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "vehicleno",
      headerName: "Vehicle No",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "driverid",
      headerName: "Driver ID",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "startpoint",
      headerName: "Start Point",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "destination",
      headerName: "Destination",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "tripgoods",
      headerName: "Trip Goods",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "arrivaltime",
      headerName: "Arrival Time",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "departuretime",
      headerName: "Departure Time",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "startfuel",
      headerName: "Start Fuel",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "endfuel",
      headerName: "End Fuel",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      headerName: "OPERATIONS",
      headerAlign: "center",
      align: "center",
      width: 300,
      renderCell: (params) => (
        <div className="edit-1-2-parent">
          <Link 
            to={`/trip/uniqueTrip/${params.row.tripid}`}
            state={{ tripData: params.row }}
            style={linkStyle}
          >
            <Button 
              onClick={() => {}}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "2px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#141B2D",
                },
              }}
            >
              VIEW
            </Button>
          </Link>

          <Link 
            to={`/trip/updateTrip/${params.row.tripid}`}
            state={{ tripData: params.row }}
            style={linkStyle}
          >
            <Button
              onClick={() => {}}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "2px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#141B2D",
                },
              }}
            >
              EDIT
            </Button>
          </Link>

          <Button onClick={() => handleDelete(params.row.tripid)}
            sx={{
              backgroundColor: '#FF0000',
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "3px",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#141B2D",
              },
            }}
          >
            DELETE
          </Button>
        </div>
      ),
    },
  ];

  const fetchTrips = async () => {
    try {
      const response = await fetch("http://localhost:8411/trip");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="TRIP MANAGER"
          subtitle="Welcome to LogiX Trip Management System"
        />
        
        <Button 
          onClick={openPopup}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#1F2A40",
            },
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          ADD NEW TRIP
        </Button>
        {isPopupVisible && (
          <div className="overlay">
            <AddTrip onClose={closePopup} />
          </div>
        )}
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Tripdata;
