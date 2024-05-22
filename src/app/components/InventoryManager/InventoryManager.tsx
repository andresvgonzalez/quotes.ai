import React, { Fragment } from "react";
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
      <p style={{ marginTop: "5px" }}>
        Based in the email, we found matches for the following products in the
        inventory:
      </p>
      <ul>
        {inventoryStatus.map((product, index) => (
          <Fragment key={product.id}>
            <li>
              <p style={{ margin: "10px 0" }}>
                <strong>Requested Product:</strong>
                <br />
                Product name: {product.name} <br />
                Requested dimensions:{" "}
                {product.requestedDimensions || "Not specified"} <br />
                Requested units: {product.requestedQuantity}
                <br />
                <br />
                Available: <br />
                Product dimensions: {product.dimensions} / unit
                <br />
                Product availability: {product.quantity} units
                <br />
                Price: ${product.price} Per unit <br />
                {product.available ? "In Stock" : "Out of Stock"}
              </p>
              {index < inventoryStatus.length - 1 && "===="}
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManager;
