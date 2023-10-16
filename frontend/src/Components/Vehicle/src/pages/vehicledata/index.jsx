import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddVehicle from "./AddVehicle";
import SearchIcon from "@mui/icons-material/Search";

const Vehicle = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleDelete = (id) => {
    setSelectedVehicleId(id);
    setConfirmationDialogOpen(true);
  };

  const confirmDelete = () => {
    setConfirmationDialogOpen(false);
    axios
      .delete(`http://localhost:8411/vehicle/delete/${selectedVehicleId}`)
      .then((response) => {
        setVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle._id !== selectedVehicleId)
          
        );
        alert(response.data.status);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const columns = [
    {
      field: "vehicleid",
      headerName: "VEHICLE ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "vehicletype",
      headerName: "VEHICLE TYPE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "fueltype",
      headerName: "FUEL TYPE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "manufactureyear",
      headerName: "MANUFACTURE YEAR",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "mileage",
      headerName: "MILEAGE",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "transactiontype",
      headerName: "TRANSACTION TYPE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "vehiclestatus",
      headerName: "VEHICLE STATUS",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    // {
    //   field: "licenseplate",
    //   headerName: "LICENSE PLATE",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 150,
    // },
    {
      field: "location",
      headerName: "LOCATION",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "vehiclecolor",
      headerName: "VEHICLE COLOR",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      headerName: "OPERATIONS",
      headerAlign: "center",
      align: "center",
      width: 300,
      renderCell: (params) => (
        <div className="edit-1-2-parent">
          <Button
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
            <Link
              to={`/vehicle/uniquevehicle/${params.row.vehicleid}`}
              state={{ vehicleData: params.row }}
              style={linkStyle}
            >
              VIEW
            </Link>
          </Button>
          <Button
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
            <Link
              to={`/vehicle/updateVehicle/${params.row.vehicleid}`}
              state={{ vehicleData: params.row }}
              style={linkStyle}
            >
              EDIT
            </Link>
          </Button>
          <Button
            onClick={() => handleDelete(params.row.vehicleid)}
            sx={{
              backgroundColor: "#FF0000",
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

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:8411/vehicle/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching Vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Custom getRowId function to ensure unique row IDs
  const getRowId = (vehicle) => vehicle._id;

  // Filter rows based on the searchText state
  const filteredRows = vehicles.filter(
    (vehicle) =>
      vehicle.vehicleid.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.vehicletype.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="VEHICLE MANAGER"
          subtitle="Welcome to LogiX Fleet Management System"
        />

        {/* Search box */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>

        <Button
          onClick={() => setPopupVisible(true)}
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
          ADD NEW VEHICLE
        </Button>
        {isPopupVisible && (
          <div className="overlay">
            <AddVehicle onClose={() => setPopupVisible(false)} />
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
        <DataGrid
          rows={filteredRows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId} // Specify the custom getRowId function
        />
      </Box>
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this vehicle record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmationDialogOpen(false)}
            color="primary"
            sx={{ color: "white" }}
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" sx={{ color: "white" }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Vehicle;
