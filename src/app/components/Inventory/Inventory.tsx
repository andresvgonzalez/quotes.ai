"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.scss";
import { Product } from "../../../types";

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<Product[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("/api/inventory");
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="inventory-page">
      <h1>Current Inventory</h1>
      <p>Take a look at the current products and their stock</p>
      <div className="inventory-page__table-container">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
