import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make an API request to fetch trip data from your server
    fetch("http://your-api-endpoint/trips")
      .then((response) => response.json())
      .then((data) => {
        setTrips(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      });
  }, []);

  return (
    <Box m="20px">
      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header
          title="TRIP REGISTRY SYSTEM"
          subtitle="Welcome to LogiX Fleet Management System"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
          <Box
            width="100%"
            height="300px"
            backgroundColor={colors.primary[400]}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding="20px"
            borderRadius="15px"
          >
            <Typography variant="h4" color="textPrimary">
              On-Going Trips
            </Typography>
            {isLoading ? (
              <p>Loading trips...</p>
            ) : trips.length > 0 ? (
              <table className="trip-table">
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Trip Name</th>
                    <th>Trip Duration</th>
                    <th>Trip Distance</th>
                    <th>Vehicle Number</th>
                    <th>Driver ID</th>
                    <th>Starting Point</th>
                    <th>Destination</th>
                    <th>Trip Goods</th>
                    <th>Arrival Time</th>
                    <th>Departure Time</th>
                    <th>Starting Fuel</th>
                    <th>End Fuel</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip.tripid}>
                      <td>{trip.tripid}</td>
                      <td>{trip.tripname}</td>
                      <td>{trip.tripduration}</td>
                      <td>{trip.tripdistance}</td>
                      <td>{trip.vehicleno}</td>
                      <td>{trip.driverid}</td>
                      <td>{trip.startpoint}</td>
                      <td>{trip.destination}</td>
                      <td>{trip.tripgoods}</td>
                      <td>{trip.arrivaltime}</td>
                      <td>{trip.departuretime}</td>
                      <td>{trip.startfuel}</td>
                      <td>{trip.endfuel}</td>
                      <td>
                        {/* Add your action buttons here */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No trips found.</p>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
