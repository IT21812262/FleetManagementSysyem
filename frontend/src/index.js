import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Root from './Root';
import Supplier from './Components/Supplier/Supplier';
import AddSupplier from './Components/Supplier/AddSupplier';
import AllSuppliers from './Components/Supplier/AllSupplier';
import UniqueSupplier from './Components/Supplier/UniqueSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';

import Trip from './Components/Trip/Trip'; // Import Trip component
import AddTrip from './Components/Trip/AddTrip'; // Import AddTrip component
import AllTrip from './Components/Trip/AllTrip'; // Import AllTrips component
import UniqueTrip from './Components/Trip/UniqueTrip'; // Import UniqueTrip component
import UpdateTrip from './Components/Trip/UpdateTrip'; // Import UpdateTrip component

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
        path: "/trip",
        element: <Outlet />,
        children: [
          {
            path: "",
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
