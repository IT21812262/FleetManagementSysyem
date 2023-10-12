// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

<<<<<<< HEAD
import Root from './Root';
=======


//Supplier Management System
import Root from './Root'
>>>>>>> main
import Supplier from './Components/Supplier/Supplier';
import AddSupplier from './Components/Supplier/AddSupplier';
import AllSuppliers from './Components/Supplier/AllSupplier';

import UniqueSupplier from './Components/Supplier/UniqueSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';

<<<<<<< HEAD
import Trip from './Components/Trip/Trip'; // Import Trip component
import AddTrip from './Components/Trip/AddTrip'; // Import AddTrip component
import AllTrip from './Components/Trip/AllTrip'; // Import AllTrips component
import UniqueTrip from './Components/Trip/UniqueTrip'; // Import UniqueTrip component
import UpdateTrip from './Components/Trip/UpdateTrip'; // Import UpdateTrip component
=======
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

>>>>>>> main

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
<<<<<<< HEAD
=======

>>>>>>> main
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
<<<<<<< HEAD
        path: "/trip",
=======
        path: "/rent", // Add Rent route
>>>>>>> main
        element: <Outlet />,
        children: [
          {
            path: "",
<<<<<<< HEAD
            element: <Trip />,
          },
          {
            path: "addTrip",
            element: <AddTrip />
          },
          {
            path: "allTrip",
            element: <AllTrip />
          },
          {
            path: "uniqueTrip",
            element: <UniqueTrip />
          },
          {
            path: "updateTrip",
            element: <UpdateTrip />
          },
          {
            path: "/trip/updateTrip/:id",
            element: <UpdateTrip />
          },
          {
            path: "/trip/uniqueTrip/:id",
            element: <UniqueTrip />
          },
        ]
      },
    ],
  },
]);

=======
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
  
>>>>>>> main
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
<<<<<<< HEAD
);
=======
);
>>>>>>> main
