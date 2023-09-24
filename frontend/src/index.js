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
                path: 'updateFuelstock/:id',
                element: <UpdateFuelstock />,
              },
              {
                path: 'uniqueFuelstock/:id',
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
                path: 'updateFuelentry/:id',
                element: <UpdateFuelentry />,
              },
              {
                path: 'uniqueFuelentry/:id',
                element: <UniqueFuelentry />,
              },
              
            ],
          },
          
        ],
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