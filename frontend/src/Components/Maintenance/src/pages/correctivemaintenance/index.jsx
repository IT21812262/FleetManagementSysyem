import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddFuelstock from './AddMaintenance';
import "./index.css";




const Maintenance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();
  const [job, setJob] = useState(null);
  
/* 
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }; */

  const [isPopupVisible, setPopupVisible] = useState(false);
  
  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  
  const [selectedRow, setSelectedRow] = useState(null);

  
  const [maintenanceJobs, setMaintenanceJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getMaintenanceJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8411/corrective/display");
        setMaintenanceJobs(response.data);
      } catch (error) {
        alert("Error fetching maintenance jobs:", error.message);
      }
    };

    getMaintenanceJobs();
  }, []);

  //Fiter changes
  const filterMaintenanceJobs = () => {
    return maintenanceJobs.filter((job) => {
      return (
        job.jobID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const handleDelete = async (jobID) => {
    // Display a confirmation dialog before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this maintenance job?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8411/corrective/delete/${jobID}`);
        alert('Maintenance job deleted successfully.');
        window.location.href = "/maintenance";
      } catch (error) {
        alert('Error deleting maintenance job:', error.message);
      }
    }
  };
  const rows = maintenanceJobs.map((job) => ({
    id: job.jobID,
    jobID: job.jobID,
    priority: job.priority, // Update with the correct field name
    vehicleNo: job.vehicleNo,
  }));
  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };


  const columns = [
    
    {
      field: "jobID",
      headerName: "JOB ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "priority",
      headerName: "PRIORITY",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "vehicleNo",
      headerName: "VEHICLE NO",
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
    to={`/maintenance/uniqueMaintenance/${params.row.jobID}`}
    
    state={{ jobsData: params.row }}
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
    to={`maintenance/update/${params.row.invoice_no}`}
    state={{ jobsData: params.row }}
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

          <Button onClick={() => handleDelete(params.row.jobID)}
            sx={{
              backgroundColor: '#FF0000',
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "3px",
              transition: "background-color 0.3s", // Add a transition for smooth color change
                "&:hover": {
                backgroundColor: "#141B2D", // Red color on hover
              },
            }}
          >
            DELETE
          </Button>
        </div>
      ),
    },
  ];

  const fetchJobData = async () => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:8411/corrective/get/${id}`);
        setJob(response.data.correctiveMaintence);
      }
    } catch (error) {
      alert('Error fetching maintenance job:', error.message);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);


  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="MAINTENANCE MANAGER"
          subtitle="Welcome to LogiX Maintenance Management System"
        />
        
        <Button 
            onClick={openPopup}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              transition: "background-color 0.3s", // Add a transition for smooth color change
                "&:hover": {
                backgroundColor: "#1F2A40", // Red color on hover
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
           CREATE JOB
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddFuelstock onClose={closePopup} />
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

export default Maintenance;
