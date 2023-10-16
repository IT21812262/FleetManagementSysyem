import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton, } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import "./index.css";




const Fuelstock = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  


};

export default Fuelstock;
