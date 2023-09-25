// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';


//Supplier Management System
import Root from './Root'
import Supplier from './Components/Supplier/Supplier';
import AddSupplier from './Components/Supplier/AddSupplier';
import AllSuppliers from './Components/Supplier/AllSupplier';

import UniqueSupplier from './Components/Supplier/UniqueSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';

//Rent Management System

import Rent from './Components/Rent/Rent'; // Add this import
import AddRent from './Components/Rent/AddRent'; // Add this import
import AllRent from './Components/Rent/AllRent'; // Add this import
import UpdateRent from './Components/Rent/UpdateRent';
import UniqueRent from './Components/Rent/UniqueRent';

// Fuel Management System
import Fuel from './Components/Fuel/Fuel';

  //Fuel Stock
  import Fuelstock from './Components/Fuel/Fuelstock/Fuelstock';

  import AddFuelstock from './Components/Fuel/Fuelstock/AddFuelstock';
  import AllFuelstocks from './Components/Fuel/Fuelstock/AllFuelstock';
  import UniqueFuelstock from './Components/Fuel/Fuelstock/UniqueFuelstock';
  import UpdateFuelstock from './Components/Fuel/Fuelstock/UpdateFuelstock';

  //Fuel Entry
  import Fuelentry from './Components/Fuel/Fuelentry/Fuelentry';

  import AddFuelentry from './Components/Fuel/Fuelentry/AddFuelentry';
  import AllFuelentries from './Components/Fuel/Fuelentry/AllFuelentry';
  import UniqueFuelentry from './Components/Fuel/Fuelentry/UniqueFuelentry';
  import UpdateFuelentry from './Components/Fuel/Fuelentry/UpdateFuelentry';


  //Employee

  import Employee from './Components/Employee/Employee';

  import AddEmployee from './Components/Employee/AddEmployee';
  import AllEmployees from './Components/Employee/AllEmployee';
  import UpdateEmployee from './Components/Employee/UpdateEmployee';


  // Inventory

  import Inventory from './Components/Inventory/Inventory';
  
  import AddInventory from './Components/Inventory/AddInventory';
  import AllInventory from './Components/Inventory/AllInventory';
  import UniqueInventory from './Components/Inventory/UniqueInventory';
  import UpdateInventory from './Components/Inventory/UpdateInventory';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [

      {
        path: "/supplier",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Supplier />,
          },
          {
            path: "addsupplier",
            element: <AddSupplier />
          },
          {
            path: "allSuppliers",
            element: <AllSuppliers />
          },
          {
            path: "uniqueSupplier",
            element: <UniqueSupplier />
          },
          {
            path: "updateSupplier",
            element: <UpdateSupplier />
          },
          {
            path: "/supplier/updateSupplier/:id",
            element: <UpdateSupplier />
          },
          {
            path: "/supplier/uniqueSupplier/:id",
            element: <UniqueSupplier />
          },
        ]
      },
      {
        path: "/rent", // Add Rent route
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Rent />,
          },
          {
            path: "addRent",
            element: <AddRent />,
          },
          {
            path: "allRent",
            element: <AllRent />,
          },
          {
            path: "updateRent",
            element: <UpdateRent />,
          },
          {
            path: "uniqueRent",
            element: <UniqueRent />
          },
          {
            path: "updateRent/:id", // Add the ":id" parameter
            element: <UpdateRent />,
          },
          {
            path: "/rent/uniqueRent/:id",
            element: <UniqueRent />
          },
          
        ],
      },

      {
        path: '/fuel',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <Fuel />,
          },

          {
            path: "fuelstock",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <Fuelstock />,
              },
              {
                path: 'addFuelstock',
                element: <AddFuelstock />,
              },
              {
                path: 'allFuelstocks',
                element: <AllFuelstocks />,
              },
              {
                path: 'uniqueFuelstock',
                element: <UniqueFuelstock />,
              },
              {
                path: 'updateFuelstock',
                element: <UpdateFuelstock />,
              },
              {
                path: '/fuel/fuelstock/updateFuelstock/:id',
                element: <UpdateFuelstock />,
              },
              {
                path: '/fuel/fuelstock/uniqueFuelstock/:id',
                element: <UniqueFuelstock />,
              },

            ],
          },

          {
            path: 'fuelentry',
            element: <Outlet />,
            children: [

              {
                path: "",
                element: <Fuelentry />,
              },
              {
                path: 'addFuelentry',
                element: <AddFuelentry />,
              },
              {
                path: 'allFuelentries',
                element: <AllFuelentries />,
              },
              {
                path: 'uniqueFuelentry',
                element: <UniqueFuelentry />,
              },
              {
                path: 'updateFuelentry',
                element: <UpdateFuelentry />,
              },
              {
                path: '/fuel/fuelentry/updateFuelentry/:id',
                element: <UpdateFuelentry />,
              },
              {
                path: '/fuel/fuelentry/uniqueFuelentry/:id',
                element: <UniqueFuelentry />,
              },
              
            ],
          },
          
        ],
      },

      {
        path: "/employee",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Employee />,
          },
          {
            path: "addemployee",
            element: <AddEmployee />
          },
          {
            path: "allEmployees",
            element: <AllEmployees />
          },
          
          {
            path: "updateEmployee",
            element: <UpdateEmployee />
          },
          {
            path: "/employee/updateEmployee/:id",
            element: <UpdateEmployee />
          },
          
        ]
      },

      {
        path: "/inventory",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Inventory />,
          },
          {
            path: "addInventory",
            element: <AddInventory />
          },
          {
            path: "allInventory",
            element: <AllInventory />
          },
          {
            path: "uniqueInventory",
            element: <UniqueInventory />
          },
          {
            path: "updateInventory",
            element: <UpdateInventory />
          },
          {
            path: "/inventory/uniqueInventory/:id",
            element: <UniqueInventory />
          },
          {
            path: "/inventory/updateInventory/:id",
            element: <UpdateInventory />
          },
          /*{
            path: "/inventory/uniqueInventory/:id",
            element: <UniqueInventoryForView />
         },*/ 
          
        ]
      },

    ],
  },
]);
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);