import React from "react";
import { InventoryStatus } from "../../../types";

interface InventoryManagerProps {
  inventoryStatus: InventoryStatus[];
}

const InventoryManager: React.FC<InventoryManagerProps> = ({
  inventoryStatus,
}) => {
  return (
    <div className="rfqs-page__inventory">
      <h2>Inventory Status</h2>
      <ul>
        {inventoryStatus.map((product) => (
          <li key={product.id}>
            <p>
              - {product.name} | Requested: {product.requestedQuantity},
              Available: {product.quantity}, Price: ${product.price} -{" "}
              {product.available ? "In Stock" : "Out of Stock"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManager;
