import React, {useState, useEffect} from "react";
import axios from "axios";

export default function AllSuppliers(){

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
                Supplier ID: {supplier.supplier_id}<br/>
                Supplier Name: {supplier.supplier_name}<br />
                Supplier NIC: {supplier.supplier_NIC}<br />
                Phone Number: {supplier.phone_number}<br/>
                Supplier Possition: {supplier.supplier_position}<br/>
                Email: {supplier.email}<br />
                Company Name: {supplier.company_name}<br/>
                Item Type: {supplier.item_type}<br />
                Item Size: {supplier.item_size}<br/>
                Item Code: {supplier.item_code}<br/>
                Brand: {supplier.brand}<br />
                Quantity: {supplier.quntity}<br />
                Unit Price: {supplier.unit_price}<br/>
                Total Price: {supplier.total_price}<br/>
                Ordered Date: {supplier.orderd_date}<br />
                Manufactured Date: {supplier.manufatured_date}<br/>
                Invoice Number: {supplier.invoice_number}<br />
               
              </li>
            ))}
          </ul>
        </div>
      );
    }

