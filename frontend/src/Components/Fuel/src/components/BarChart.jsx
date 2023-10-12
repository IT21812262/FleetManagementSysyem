import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';

export default function BasicBars() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
        const fetchMonthlyFuelCosts = async () => {
            try {
                const response = await fetch("/fuelstock/monthly-costs");
                const fetchedData = await response.json();
                console.log("Fetched Data:", fetchedData);  // Debugging line
                const transformedData = fetchedData.map(item => ({
                    month: `${item._id.month}-${item._id.year}`,
                    [item._id.fuelType]: item.totalCost
                }));
                console.log("Transformed Data:", transformedData);  // Debugging line
                setData(transformedData);
            } catch (error) {
                console.error("Error fetching monthly fuel costs:", error);
            }
        };
    
        fetchMonthlyFuelCosts();
    }, []);
  
    if (!data || data.length === 0) {
      return <div>No data available</div>;
    }
  
    const months = data.map(item => item.month);
    const petrolData = data.map(item => item.petrol);
    const dieselData = data.map(item => item.diesel);
  
    console.log("Months:", months); // Debugging line
    console.log("Petrol Data:", petrolData); // Debugging line
    console.log("Diesel Data:", dieselData); // Debugging line
  
    return (
        <BarChart
        sx={{
          flexGrow: 1,
          width: '100%',
          border: '1px solid divider',
          borderRadius: 2,
          padding: 2,
          "& .chartLabel": {
            color: 'text.primary',
            fontSize: '0.875rem'
          }
        }}
        xAxis={[{ scaleType: 'band', data: months }]}
        series={[
          { data: petrolData, name: 'Petrol' },
          { data: dieselData, name: 'Diesel' }
        ]}
        height={300}
      />
    );
  }

