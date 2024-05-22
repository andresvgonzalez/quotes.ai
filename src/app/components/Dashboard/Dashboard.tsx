"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Quote, Product, InventoryStatus } from "../../../types";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<string>("");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("/api/quotes");
        setQuotes(response.data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  const resetForms = () => {
    setEditingQuote(null);
    setNewPrice(null);
    setCustomerName("");
    setRelatedProducts("");
    setSelectedEmail(null);
  };

  const handleSendQuote = async (quote: Quote) => {
    try {
      const { emailData, inStock } = generateEmailData(quote, relatedProducts);
      await axios.post("/api/save-email", {
        quoteId: quote.id,
        emailData,
        inStock,
      });
      await axios.post("/api/send-quote", { quoteId: quote.id });
      setQuotes(
        quotes.map((q) => (q.id === quote.id ? { ...q, status: "sent" } : q))
      );
      alert("Quote saved and sent successfully!");
    } catch (error) {
      console.error("Error sending quote:", error);
    }
  };

  const handleEditQuote = (quote: Quote) => {
    setEditingQuote(quote);
    setNewPrice(quote.totalPrice);
    setCustomerName(quote.customer);
    setRelatedProducts(quote.relatedProducts || "");
  };

  const handleSaveQuote = async () => {
    if (editingQuote && newPrice !== null && customerName !== "") {
      const updatedQuote = {
        ...editingQuote,
        totalPrice: newPrice,
        customer: customerName,
        relatedProducts: relatedProducts,
      };
      try {
        await axios.post("/api/update-quote", updatedQuote);
        setQuotes(
          quotes.map((quote) =>
            quote.id === editingQuote.id ? updatedQuote : quote
          )
        );
        resetForms();
        alert("Quote updated successfully!");
      } catch (error) {
        console.error("Error updating quote:", error);
      }
    }
  };

  const handleRemoveQuote = async (quoteId: string) => {
    try {
      await axios.post("/api/remove-quote", { quoteId });
      const updatedQuotes = quotes.filter((quote) => quote.id !== quoteId);
      setQuotes(updatedQuotes);
      alert("Quote removed successfully!");
      resetForms();
    } catch (error) {
      console.error("Error removing quote:", error);
    }
  };

  const handleViewEmail = async (quoteId: string) => {
    try {
      const response = await axios.get(`/api/get-email/${quoteId}`);
      setSelectedEmail(response.data.emailContent);
    } catch (error) {
      console.error("Error fetching email content:", error);
    }
  };

  const generateEmailData = (quote: Quote, relatedProducts: string) => {
    const inventory: Product[] = require("/inventory.json");

    const allProducts: InventoryStatus[] = quote.products.map(
      (requestedProduct) => {
        const inventoryProduct = inventory.find(
          (product) => product.name === requestedProduct.name
        );
        if (inventoryProduct) {
          return {
            ...inventoryProduct,
            requestedQuantity: requestedProduct.quantity,
            available: inventoryProduct.quantity >= requestedProduct.quantity,
          };
        } else {
          return {
            id: Math.random(), // Generate a random ID for non-existent products
            name: requestedProduct.name,
            price: 0,
            quantity: 0,
            requestedQuantity: requestedProduct.quantity,
            requestedDimensions: requestedProduct.requestedDimensions,
            available: false,
            materialSpecifications: requestedProduct.materialSpecifications,
            dimensions: requestedProduct.dimensions,
          };
        }
      }
    );

    const outOfStockProducts = allProducts.filter(
      (product) => !product.available
    );

    const emailData = {
      customer: quote.customer,
      products: allProducts,
      outOfStockProducts: quote.outOfStockProducts?.length
        ? [...outOfStockProducts, ...quote.outOfStockProducts]
        : outOfStockProducts,
      totalPrice: quote.totalPrice,
      relatedProducts: quote.relatedProducts
        ? quote.relatedProducts.split("\n")
        : relatedProducts
        ? relatedProducts.split("\n")
        : null,
    };

    const inStock = allProducts.some((product) => product.available);

    return {
      emailData,
      inStock,
    };
  };

  const mapProductsInOrder = (editingQuote: Quote): InventoryStatus[] => {
    if (editingQuote.outOfStockProducts?.length)
      return [...editingQuote.products, ...editingQuote.outOfStockProducts];
    return [...editingQuote.products];
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <h1>Quotes Dashboard</h1>
        <p>
          Here you will find all the quotes that have been processed from RFQs
          emails.
        </p>
      </div>

      <div className="dashboard-page__draft-quotes">
        <h2 className="subtitle">Draft Quotes</h2>
        <ul>
          {quotes
            .filter((quote) => quote.status === "draft")
            .map((quote) => (
              <li key={quote.id}>
                <div>
                  <span>
                    <strong>Customer name:</strong>
                  </span>{" "}
                  <span>{quote.customer}</span>
                  {" | "}
                  <span>
                    <strong>Quote total:</strong>
                  </span>{" "}
                  <span>${quote.totalPrice}</span>
                  {" | "}
                  <span>
                    <strong>Due date:</strong>
                  </span>{" "}
                  <span>{quote.dueDate || "Not specified"}</span>
                </div>
                <div className="dashboard-page__draft-quotes__buttons">
                  <button
                    className="secondary"
                    onClick={() => handleEditQuote(quote)}
                  >
                    Finalize
                  </button>
                  <button
                    className="primary"
                    onClick={() => handleSendQuote(quote)}
                  >
                    Send
                  </button>
                  <button
                    className="remove"
                    onClick={() => handleRemoveQuote(quote.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {editingQuote && (
        <div className="dashboard-page__editing-quote">
          <h2 className="subtitle">
            Finalize quote #{editingQuote.id} for {editingQuote.customer}
          </h2>
          <div>
            <div className="col">
              <span>Customer:</span>
              <p>{editingQuote.customer}</p>
              <span>Total Price:</span>
              <p>${editingQuote.totalPrice}</p>
              <span>Due Date:</span>
              <p>{editingQuote.dueDate || "Not specified"}</p>
              <span>Products in this order:</span>
              <ul>
                {mapProductsInOrder(editingQuote).map(
                  (item: InventoryStatus) => {
                    return (
                      <li key={item.name.replace(" ", "")}>
                        <p>
                          - {item.name} | {item.requestedQuantity} units of{" "}
                          {item.quantity} left @ ${item.price} each{" "}
                          {item.available ? "(In Stock)" : "(Out of stock)"}
                        </p>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
            <div className="col">
              <label>
                <span>Edit Customer Name:</span>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </label>
              <br />
              <label>
                <span>Set New Quote Price: $</span>
                <input
                  type="number"
                  value={newPrice ?? editingQuote.totalPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                />
              </label>
              <br />
              <label>
                <span>Suggested Products:</span>
                <textarea
                  rows={4}
                  cols={50}
                  value={relatedProducts}
                  onChange={(e) => setRelatedProducts(e.target.value)}
                />
              </label>
              <br />
              <button className="primary" onClick={handleSaveQuote}>
                Save
              </button>
              <button
                className="secondary"
                onClick={() => setEditingQuote(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-page__sent-quotes">
        <h2 className="subtitle">Sent Quotes</h2>
        <ul>
          {quotes
            .filter((quote) => quote.status === "sent")
            .map((quote) => (
              <li key={quote.id}>
                <div>
                  <span>
                    <strong>Customer name:</strong>
                  </span>{" "}
                  <span>{quote.customer}</span>
                  {" | "}
                  <span>
                    <strong>Quote total:</strong>
                  </span>{" "}
                  <span>${quote.totalPrice}</span>
                  {" | "}
                  <span>
                    <strong>Due date:</strong>
                  </span>{" "}
                  <span>{quote.dueDate || "Not specified"}</span>
                  <span> (sent)</span>{" "}
                </div>
                <div className="dashboard-page__sent-quotes__buttons">
                  <button
                    className="primary"
                    onClick={() => handleViewEmail(quote.id)}
                  >
                    View Quote
                  </button>
                  <button
                    className="remove"
                    onClick={() => handleRemoveQuote(quote.id)}
                  >
                    Remove Quote
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {selectedEmail && (
        <div className="dashboard-page__quote-email">
          <h2 className="subtitle">Email Content</h2>
          <pre>{selectedEmail}</pre>
          <button onClick={() => setSelectedEmail(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
