import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddEmployee from './AddEmployee';
import "./index.css";


// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
// import React, { useState, useEffect } from "react";




const Employee = () => {
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
  
  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  
  const [selectedRow, setSelectedRow] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios
        .delete(`http://localhost:8411/employee/delete/${id}`)
        .then(() => {
          // Remove the deleted employee from the list
          setEmployees(employees.filter((employee) => employee._id !== id));
          setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== id));
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  
  const rows = employees.map((employee) => ({
    id: employee.eid,
    eid:employee.eid,
    ename:employee.ename,
    gender:employee.gender,
    address:employee.address,
    phone:employee.phone,
    email:employee.email,
    dob:employee.dob,
    jobroll:employee.jobroll,
    bsal:employee.bsal,

  }));
  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };


  const columns = [
    
    {
      field: "eid",
      headerName: "EMPLOYEE ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "ename",
      headerName: "EMPLOYEE NAME",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "gender",
      headerName: "GENDER",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "address",
      headerName: "ADDRESS",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "phone",
      headerName: "PHONE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "email",
      headerName: "EMAIL",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "dob",
      headerName: "DATE OF BIRTH",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "jobroll",
      headerName: "JOB ROLE",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "bsal",
      headerName: "BASIC SALARY",
      type: "number",
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
              transition: "background-color 0.3s", // Add a transition for smooth color change
                "&:hover": {
                backgroundColor: "#141B2D", // Red color on hover
              },
            }}
          >
            <Link 
                to={`/employee/uniqueEmployee/${params.row.id}`}
                state={{ employeeData: params.row }}
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
              transition: "background-color 0.3s", // Add a transition for smooth color change
                "&:hover": {
                backgroundColor: "#141B2D", // Red color on hover
              },
            }}
          ><Link
          to={`/employee/updateEmployee/${params.row.id}`}
          state={{ employeeData: params.row }}
          style={linkStyle}
        >
            EDIT</Link>
          </Button>
          <Button onClick={() => handleDelete(params.row.eid)}
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

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8411/employee/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
      // setFilteredRows(data);
    } catch (error) {
      console.error("Error fetching Employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);




  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EMPLOYEE MANAGER"
          subtitle="Welcome to LogiX Fleet Management System"
        />

{/* // Search box */}
<Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} 
          placeholder="Search"
          // value={searchQuery}
          // onChange={handleSearch}
          />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>
        
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
            ADD NEW EMPLOYEE
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddEmployee onClose={closePopup} />
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
        {/* <DataGrid rows={filteredRows} columns={columns} components={{ Toolbar: GridToolbar }} getRowId={(row) => row.pid}/> */}
      </Box>
    </Box>
  );
};

export default Employee;
