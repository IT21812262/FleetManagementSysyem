import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddRent from './AddRent';
import "./index.css";


// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
// import React, { useState, useEffect } from "react";




const Rent = () => {
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

  const [rents, setRents] = useState([]);


  const handleDelete = async (id) => {
    const confirmation = window.prompt("To confirm deletion, type 'CONFIRM' (case-sensitive):");

    if (confirmation === "CONFIRM") {
      try {
        await axios.delete(`http://localhost:8411/rent/delete/${id}`);
        alert("Rent record deleted successfully.");
        //window.location.reload();

        
      } catch (error) {
        alert("Error deleting rent record:", error.message);
      }
    } else {
      alert("Deletion cancelled. No changes were made.");
    }
  };
  const rows = rents.map((rent) => ({
    id:rent.vehicle_no,
    vehicle_no:rent.vehicle_no,
    brand:rent.brand,
    vehicle_model:rent.vehicle_model,
    milage:rent.milage,
    capacity:rent.capacity,
    description:rent.description,
    receive_date: formatDate(rent.receive_date),
  return_date: formatDate(rent.return_date),
    owner_name:rent.owner_name,
    owner_phone:rent.owner_phone,
    owner_email:rent.owner_email,
    rental:rent.rental,
    total_rental: rent.total_rental,

  }));
  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };


  const columns = [

    {
      field: "vehicle_no",
      headerName: "VEHICLE NO",
      headerAlign: "center",
      align: "center",
      width: 150,
    },  
  {
    field: "brand",
    headerName: "BRAND",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "vehicle_model",
    headerName: "VEHICLE MODEL",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "milage",
    headerName: "MILEAGE",
    headerAlign: "center",
    align: "center",
    type: "number",
    width: 150,
  },
  {
    field: "capacity",
    headerName: "CAPACITY",
    headerAlign: "center",
    align: "center",
    type: "number",
    width: 150,
  },
  {
    field: "description",
    headerName: "DESCRIPTION",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "receive_date",
    headerName: "RECEIVE DATE",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "return_date",
    headerName: "RETURN DATE",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "owner_name",
    headerName: "OWNER NAME",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "owner_phone",
    headerName: "OWNER PHONE",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "owner_email",
    headerName: "OWNER EMAIL",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "rental",
    headerName: "RENTAL",
    headerAlign: "center",
    align: "center",
    type: "number",
    width: 150,
  },
  {
    field: "total_rental",
    headerName: "TOTAL RENTAL",
    headerAlign: "center",
    align: "center",
    valueFormatter: (params) => (params.value ? params.value.toFixed(2) : "N/A"),
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
                to={`/rent/uniquerent/${params.row.vehicle_no}`}
                state={{ rentData: params.row }}
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
          to={`/rent/updateRent/${params.row.vehicle_no}`}
          state={{ rentData: params.row }}
          style={linkStyle}
        >
            EDIT</Link>
          </Button>
          <Button onClick={() => handleDelete(params.row.vehicle_no)}
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

  const fetchRents = async () => {
    try {
      const response = await fetch("http://localhost:8411/rent/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRents(data);
      // setFilteredRows(data);
    } catch (error) {
      console.error("Error fetching Rents:", error);
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);



  // search function

  // const [searchQuery, setSearchQuery] = useState("");
  // const [filteredRows, setFilteredRows] = useState({rows}); 


  // const handleSearch = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   // Filter rows based on the search query
  //   const filteredData = rows.filter((row) =>
  //     Object.values(row).some((value) =>
  //       String(value).toLowerCase().includes(query)
  //     )
  //   );
  //   setFilteredRows(filteredData);
  // };
// end of search function

// second handle search function

// const [searchQuery, setSearchQuery] = useState("");
// const [filteredRows, setFilteredRows] = useState({rows});


// const handleSearch = (e) => {
//   const query = e.target.value.toLowerCase();
//   setSearchQuery(query);

//   // Filter rows based on the search query
//   const filteredData = inventories.filter((inventory) =>
//     Object.values(inventory).some((value) =>
//       String(value).toLowerCase().includes(query)
//     )
//   );
//   setFilteredRows(filteredData);
// };


  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="RENT MANAGER"
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

        {/* <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          // ... other styling ...
        }}
      >
        <DataGrid rows={filteredRows} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box> */}

      {/* // end of search */}
        
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
            ADD NEW RENT VEHICLE
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddRent onClose={closePopup} />
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

export default Rent;
