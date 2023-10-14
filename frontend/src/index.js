// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';




import Root from './Root'
//Supplier Management System
import IndexSupplier from './Components/Supplier/src/App';
import Supplier from './Components/Supplier/src/pages/supplierdata/index';
import Notifications from './Components/Supplier/src/pages/notifications/index';

import UniqueSupplier from "./Components/Supplier/src/pages/supplierdata/UniqueSupplier";
import UpdateSupplier  from "./Components/Supplier/src/pages/supplierdata/UpdateSupplier";

import UniqueNotification from "./Components/Supplier/src/pages/notifications/UniqueNotification";

//Rent Management System

import Rent from './Components/Rent/Rent'; // Add this import
import AddRent from './Components/Rent/AddRent'; // Add this import
import AllRent from './Components/Rent/AllRent'; // Add this import
import UpdateRent from './Components/Rent/UpdateRent';
import UniqueRent from './Components/Rent/UniqueRent';

// Fuel Management System
import Index from './Components/Fuel/src/App';
import Fuelstock from './Components/Fuel/src/pages/fuelstock/index';
import Fuelentry from './Components/Fuel/src/pages/fuelentry/index';
import Fuelconsumtion from './Components/Fuel/src/pages/fuelconsumtion/index';
import Fuelinvoices from './Components/Fuel/src/pages/invoices/index';
import Fuelanalytics from './Components/Fuel/src/pages/faq/index';

import UniqueFuelentry from "./Components/Fuel/src/pages/fuelentry/UniqueFuelentry";
import UpdateFuelentry  from "./Components/Fuel/src/pages/fuelentry/UpdateFuelentry";

import UniqueFuelstock from "./Components/Fuel/src/pages/fuelstock/UniqueFuelstock";
import UpdateFuelstock  from "./Components/Fuel/src/pages/fuelstock/UpdateFuelstock";


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

  //Maintanence
import AddCorrectiveMaintenance from './Components/Maintenance/AddMaintenance';
import Maintenance from './Components/Maintenance/Maintenance';
import AllCorrectiveMaintenance from './Components/Maintenance/AllMaintenance';
import UniqueMaintenance from './Components/Maintenance/UniqueMaintenance';
import UpdateMaintenance from './Components/Maintenance/UpdateMaintenance';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [

      {
        path: '/supplier',
        element: <Outlet />,
        children: [

          {
            path: "",
            element: <IndexSupplier />,
            children: [
              {
                path: "/supplier/supplierdata",
                element: <Supplier />,
              },
              {
                path: "/supplier/notifications",
                element: <Notifications />,
              },
              
              {
                path: "/supplier/uniquesupplier/:id",
                element: <UniqueSupplier />
              },
              {
                path: "/supplier/updatesupplier/:id",
                element: <UpdateSupplier />
              },
              {
                path: "/supplier/uniquenotification/:id",
                element: <UniqueNotification />,
              },
            ],
          },
        ],
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
            element: <Index />,
            children: [
              {
                path: "/fuel/fuelstock",
                element: <Fuelstock />,
              },
              {
                path: "/fuel/fuelentry",
                element: <Fuelentry />,
              },
              {
                path: "/fuel/fuelconsumtion",
                element: <Fuelconsumtion />,
              },
              {
                path: "/fuel/invoices",
                element: <Fuelinvoices />,
              },
              {
                path: "/fuel/faq",
                element: <Fuelanalytics />,
              },
              {
                path: "/fuel/uniquefuelentry/:id",
                element: <UniqueFuelentry />,
              },
              {
                path: "/fuel/updatefuelentry/:id",
                element: <UpdateFuelentry />,
              },
              {
                path: "/fuel/uniquefuelstock/:id",
                element: <UniqueFuelstock />,
              },
              {
                path: "/fuel/updatefuelstock/:id",
                element: <UpdateFuelstock />,
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
      {
        path: "/maintenance",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <AllCorrectiveMaintenance/>,
          },
          {
            path: "addmaintenance",
            element: <AddCorrectiveMaintenance />
          },
          {
            path: "allmaintenance",
            element: <AllCorrectiveMaintenance />
          },
          {
            path: "uniquemaintenance",
            element: <UniqueMaintenance />
          },
          {
            path: "updateSupplier",
            element: <UpdateSupplier />
          },
          {
            path: "/maintenance/viewJob/:id",
            element: <UniqueMaintenance/>
          },
          {
            path: "/maintenance/viewJob/:id/maintenance/update/:id",
            element: <UpdateMaintenance />
          },
    
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