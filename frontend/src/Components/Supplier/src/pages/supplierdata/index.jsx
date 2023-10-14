import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddSupplier from "./AddSupplier";
import "./index.css";




const Supplier = () => {
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

  


  const [suppliers, setSuppliers] = useState([]);

  const handleDelete = async (supplierId) => {
    try {
      await axios.delete(`http://localhost:8411/supplier/delete/${supplierId}`);
      alert('Supplier deleted successfully.');
      // Navigate to All Suppliers page
      window.location.reload();
    } catch (error) {
      alert('Error deleting supplier:', error.message);
    }
  };


  /* const rows = filteredSuppliers.map((supplier) => [
    supplier.supplier_id,
    supplier.supplier_name,
    supplier.phone_number,
    supplier.supplier_possition,
    supplier.email,
    supplier.company_name,
    supplier.item_type,
    supplier.item_size,
    supplier.item_code,
    supplier.brand,
    supplier.quntity,
    supplier.unit_price,
    supplier.total_price,
    supplier.orderd_date,
    supplier.manufatured_date,
    supplier.invoice_number, 
  ]);*/
 

  const rows = suppliers.map((supplier) =>  ({
    id: supplier.supplier_id,
    supplier_id:supplier.supplier_id,
    supplier_name:supplier.supplier_name,
    phone_number:supplier.phone_number,
    supplier_possition:supplier.supplier_possition,
    email:supplier.email,
    company_name:supplier.company_name,
    item_type:supplier.item_type,
    item_size:supplier.item_size,
    item_code:supplier.item_code,
    brand:supplier.brand,
    quntity:supplier.quntity,
    unit_price:supplier.unit_price,
    total_price:supplier.total_price,
    orderd_date:supplier.orderd_date,
    manufatured_date:supplier.manufatured_date,
    invoice_number:supplier.invoice_number,
    
  }));

  const linkStyle = {
    textDecoration: "none", // Remove underline
    color: "white",       // Set text color to white
  };


  const columns = [
    
    {
      field: "supplier_id",
      headerName: "SUPPLIER ID",
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "supplier_name",
      headerName: "SUPPLIER NAME",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "phone_number",
      headerName: "PHONE  NUMBER",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "supplier_possition",
      headerName: "SUPPLOIER POSITION",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    {
      field: "email",
      headerName: "EMAIL",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 150,
    },
    /* {
      field: "stocked_fuel_date",
      headerName: "STOCKED FUEL DATE",
      type: "date",
      headerAlign: "center",
      align: "center",
      width: 150,
    }, */
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
                to={`/supplier/uniqueSupplier/${params.row.supplier_id}`}
                state={{ supplierData: params.row }}
                style={linkStyle}
            >
              VIEW

            </Link>
          </Button>
          <Link 
    to={`/supplier/updateSupplier/${params.row.supplier_id}`}
    state={{ supplierData: params.row }}
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
        
         
          <Button onClick={() => handleDelete(params.row.supplier_id)}
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

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:8411/supplier/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching Suplier:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);


  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="SUPPLIER MANAGER"
          subtitle="Welcome to LogiX Supplier Management System"
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
            ADD NEW SUPPLIER
          </Button>
          {isPopupVisible && (
            <div className="overlay">
              <AddSupplier onClose={closePopup} />
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

export default Supplier;
