import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddInventory from './AddInventory';
import "./index.css";


// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
// import React, { useState, useEffect } from "react";




const Inventory = () => {
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

  


  const [inventories, setInventories] = useState([]);


  const handleDelete = async (itemId) => {
    // Display a confirmation dialog to the user
    const userConfirmed = window.confirm("Do you want to delete the item?");
  
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:8411/inventory/delete/${itemId}`);
        // After successful deletion, update the inventories list to reflect the changes
        const updatedInventories = inventories.filter(
          (inventory) => inventory.pid !== itemId
        );
        setInventories(updatedInventories);
        alert("Item deleted successfully.");
        window.location.reload();
      } catch (error) {
        alert(`Error deleting item: ${error.message}`);
      }
    } else {
      // User clicked "No," do nothing
    }
  };
  const rows = inventories.map((inventory) => ({
    id: inventory.pid,
    pid: inventory.pid, // Update with the correct field name
    name: inventory.name,
    brand: inventory.brand,
    qty: inventory.qty,
    unit_price: inventory.unit_price,
    reorder_level: inventory.reorder_level,

  }));
  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };


  const columns = [
    
    {
      field: "pid",
      headerName: "PRODUCT ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "name",
      headerName: "PRODUCT NAME",
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
      field: "qty",
      headerName: "QUANTITY",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "unit_price",
      headerName: "UNIT PRICE",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "reorder_level",
      headerName: "REORDER LEVEL",
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
                to={`/invntory/uniqueinventory/${params.row.pid}`}
                state={{ inventoryData: params.row }}
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
          to={`/inventory/updateInventory/${params.row.pid}`}
          state={{ inventoryData: params.row }}
          style={linkStyle}
        >
            EDIT</Link>
          </Button>
          <Button onClick={() => handleDelete(params.row.pid)}
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

  const fetchInventories = async () => {
    try {
      const response = await fetch("http://localhost:8411/inventory/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInventories(data);
      // setFilteredRows(data);
    } catch (error) {
      console.error("Error fetching Inventories:", error);
    }
  };

  useEffect(() => {
    fetchInventories();
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
          title="SPARE PARTS MANAGER"
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
            ADD NEW SPARE PART
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddInventory onClose={closePopup} />
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

export default Inventory;
