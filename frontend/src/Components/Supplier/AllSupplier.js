import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllSupplier.css";


export default function AllSuppliers() {

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:8411/supplier/');
        setSuppliers(response.data);
      } catch (error) {
        alert('Error fetching suppliers:', error.message);
      }
    };

    getSuppliers();
  }, []);

  return (
    <div className="container">
      <h1>All Suppliers</h1>
    
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            Supplier ID: {supplier.supplier_id}<br />
            Supplier Name: {supplier.supplier_name}<br />
            Item Type: {supplier.item_type}<br />
            Quantity: {supplier.quntity}<br />
            <Link to={`/supplier/updateSupplier/${supplier.supplier_id}`} state={{ supplierData: supplier }}>
              <button>Update</button>
            </Link>
            <Link to={`/supplier/uniqueSupplier/${supplier.supplier_id}`} state={{ supplierData: supplier }}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
