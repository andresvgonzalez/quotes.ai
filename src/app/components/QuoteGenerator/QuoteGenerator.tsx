import React from "react";
import { InventoryStatus, Quote } from "../../../types";

interface QuoteGeneratorProps {
  rfqData: Quote;
  inventoryStatus: InventoryStatus[];
  onGenerateQuote: () => void;
  loading: boolean;
}

const QuoteGenerator: React.FC<QuoteGeneratorProps> = ({
  rfqData,
  inventoryStatus,
  onGenerateQuote,
  loading,
}) => {
  const calculateQuotePrice = () => {
    return inventoryStatus.reduce(
      (total, product) =>
        total + product.requestedQuantity * (product.price ?? 0),
      0
    );
  };

  const generateQuote = () => {
    const availableProducts = inventoryStatus.filter(
      (product) => product.available
    );
    const totalPrice = calculateQuotePrice();

    const quote: Quote = {
      id: generateUniqueId(),
      customer: rfqData.customer || "Not specified",
      products: availableProducts,
      totalPrice,
      dueDate: rfqData.dueDate,
      shippingRestrictions: rfqData.shippingRestrictions,
      status: "draft",
    };

    onGenerateQuote();
  };

  const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div>
      <button className="primary" onClick={generateQuote}>
        {loading ? "Processing..." : "Generate Pre-Saved Quote"}
      </button>
    </div>
  );
};

export default QuoteGenerator;
