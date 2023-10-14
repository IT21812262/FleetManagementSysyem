import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from 'yup'; // Import yup for validation
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { tokens } from "../../theme";
import { useTheme} from "@mui/material";




const UniqueFuelstock = ({ onClose }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const [fuelstock, setFuelstock] = useState(null);

  const validationSchema = yup.object().shape({
    invoice_no: yup
      .string()
      .required("Invoice No is required") // Specify the error message
      .matches(/^[0-9a-zA-Z]{6}$/, "Invoice No must be 6 characters"), // Specify the regex pattern and error message
  });

  useEffect(() => {
    const fetchFuelstockData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8411/fuelstock/get/${id}`);
          setFuelstock(response.data.fuelstock);
        }
      } catch (error) {
        alert('Error fetching fuel stock:', error.message);
      }
    };

    fetchFuelstockData();
  }, [id]);

  const handleDelete = async (invoiceNo) => {
    try {
      await axios.delete(`http://localhost:8411/fuelstock/delete/${invoiceNo}`);
      alert('Fuel stock deleted successfully.');
      // Navigate to All Fuel entry page
      window.location.href = "/fuel/fuelstock";
    } catch (error) {
      alert('Error deleting fuel stock:', error.message);
    }
  };

  const handleSubmit = async (values, actions) => {
    const { invoice_no } = values;
    try {
      const response = await axios.get(`http://localhost:8411/fuelstock/get/${invoice_no}`);
      setFuelstock(response.data.fuelstock);
    } catch (error) {
      alert('Error fetching fuel stock:', error.message);
    } finally {
      actions.setSubmitting(false); // Finish form submission
    }
  };
  const navigate = useNavigate();

  // Use navigate function to programmatically navigate to a different route
  const handleButtonClick = () => {
    navigate('/fuel/fuelstock');
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  

  return (
    <Box m="20px">
    <Formik
      initialValues={{ invoice_no: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {fuelstock && (
            <Header
              title={`UNIQUE FUEL STOCK FOR ${fuelstock.invoice_no}`}
              subtitle="View a unique fuel stock data"
            />
          )}
          <Box mt={2}>
            <Field
              as={TextField}
              fullWidth
              variant="filled"
              label="ENTER INVOICE NO"
              name="invoice_no"
              error={false}
            />
            <ErrorMessage name="invoice_no">
              {(msg) => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
          </Box>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={isSubmitting}
            >
              FETCH FUEL STOCK DATA
            </Button>
            <Button
              type="button"
              color="secondary"
              variant="contained"
              onClick={handleButtonClick}
              disabled={isSubmitting}
            >
              CANCEL
            </Button>
          </Box>

          {fuelstock ? (
             <Paper elevation={3} style={{ marginTop: '20px', padding: '20px', backgroundColor: colors.primary[400] }}>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Invoice No" secondary={fuelstock.invoice_no} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Stocked Fuel Type" secondary={fuelstock.stocked_fuel_type} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Stocked Fuel Quantity" secondary={fuelstock.stocked_fuel_quantity} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Per Leter Cost" secondary={fuelstock.per_leter_cost} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Total Cost" secondary={fuelstock.total_cost} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Stocked Fuel Date" secondary={formatDate(fuelstock.stocked_fuel_date)} />
                    </ListItem>
                  </List>
                  
                </Grid>
              </Grid>
              <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(fuelstock.invoice_no)}
                  >
                    Delete Fuel Stock
                  </Button>
            </Paper>
          ) : (
            <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
              No fuel stock found with the specified Vehicle Id.
            </Typography>
          )}
        </form>
      )}
    </Formik>
  </Box>
  );
};

export default UniqueFuelstock;
