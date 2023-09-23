import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Root from './Root';
import Supplier from './Components/Supplier/Supplier';
import AddSupplier from './Components/Supplier/AddSupplier';
import AllSuppliers from './Components/Supplier/AllSupplier';
import UniqueSupplier from './Components/Supplier/UniqueSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';

// Fuel Management System

import Fuel from './Components/Fuel/Fuel';


//Fuel Entry
import FuelEntry from './Components/Fuel/FuelEntry/FuelEntry';
import AddFuelEntry from './Components/Fuel/FuelEntry/AddFuelEntry';
import AllFuelEntry from './Components/Fuel/FuelEntry/AllFuelEntry';
import UniqueFuelEntry from './Components/Fuel/FuelEntry/UniqueFuelEntry';
import UpdateFuelEntry from './Components/Fuel/FuelEntry/UpdateFuelEntry';

//Fuel Stock

import FuelStock from './Components/Fuel/FuelStock/FuelStock';
import AddFuelStock from './Components/Fuel/FuelStock/AddFuelStock';
import AllFuelStock from './Components/Fuel/FuelStock/AllFuelStock';
import UniqueFuelStock from './Components/Fuel/FuelStock/UniqueFuelStock';
import UpdateFuelStock from './Components/Fuel/FuelStock/UpdateFuelStock';

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
      path: "/Fuel",
      element: <Fuel />,
      children: [

        {
          path: "/FuelEntry",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <FuelEntry />,
            },
            {
              path: "addFuelentry",
              element: <AddFuelEntry />
            },
            {
              path: "allFuelEntry",
              element: <AllFuelEntry />
            },
            {
              path: "uniqueFuelEntry",
              element: <UniqueFuelEntry />
            },
            {
              path: "updateFuelEntry",
              element: <UpdateFuelEntry />
            },
            {
              path: "updateFuelEntry/:id",
              element: <UpdateFuelEntry />
            },
            {
              path: "uniqueFuelEntry/:id",
              element: <UniqueFuelEntry />
            },
          ]
        },
        {
          path: "/FuelStock",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <FuelStock />,
            },
            {
              path: "addFuelStock",
              element: <AddFuelStock />
            },
            {
              path: "allFuelStock",
              element: <AllFuelStock />
            },
            {
              path: "uniqueFuelStock",
              element: <UniqueFuelStock />
            },
            {
              path: "updateFuelStock",
              element: <UpdateFuelStock />
            },
            {
              path: "updateFuelStock/:id",
              element: <UpdateFuelStock />
            },
            {
              path: "uniqueFuelStock/:id",
              element: <UniqueFuelStock />
            },
          ]
        },
        
      ]

    },

  ],    
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


