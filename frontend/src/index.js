// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Root from './Root'
import Supplier from './Components/Supplier/Supplier';
import AddSupplier from './Components/Supplier/AddSupplier';
import AllSuppliers from './Components/Supplier/AllSupplier';
<<<<<<< HEAD
import Rent from './Components/Rent/Rent'; // Add this import
import AddRent from './Components/Rent/AddRent'; // Add this import
import AllRent from './Components/Rent/AllRent'; // Add this import
import UpdateRent from './Components/Rent/UpdateRent';
import UniqueRent from './Components/Rent/UniqueRent';

=======
import UniqueSupplier from './Components/Supplier/UniqueSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';
>>>>>>> 20427a952b65137bd39b1de368adedd2a9c2ebd7

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
<<<<<<< HEAD
      {
        path: "/supplier",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Supplier />,
          },
          {
            path: "addSupplier",
            element: <AddSupplier />,
          },
          {
            path: "allSuppliers",
            element: <AllSuppliers />,
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
            path: "updateRent/:id", // Add the ":id" parameter
            element: <UpdateRent />,
          },
          {
            path: "/rent/uniqueRent/:id",
            element: <UniqueRent />
          },
          
        ],
      },
    ],
  },
]);

=======
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
>>>>>>> 20427a952b65137bd39b1de368adedd2a9c2ebd7
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
