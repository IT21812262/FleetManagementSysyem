// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Root from './Root'
import Supplier from './Components/Supplier/Supplier';
import AddSupplier from './Components/Supplier/AddSupplier';
import AllSuppliers from './Components/Supplier/AllSupplier';

import Rent from './Components/Rent/Rent'; // Add this import
import AddRent from './Components/Rent/AddRent'; // Add this import
import AllRent from './Components/Rent/AllRent'; // Add this import
import UpdateRent from './Components/Rent/UpdateRent';
import UniqueRent from './Components/Rent/UniqueRent';


import UniqueSupplier from './Components/Supplier/UniqueSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';

const router = createBrowserRouter([
  {
    path: '/',
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
    },],
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
