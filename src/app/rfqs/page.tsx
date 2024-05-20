"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InventoryStatus, Quote } from "../../types";
import InventoryManager from "../components/InventoryManager/InventoryManager";
import QuoteGenerator from "../components/QuoteGenerator/QuoteGenerator";
import "./Rfqs.scss";

const SubmitRFQ: React.FC = () => {
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [rfqData, setRFQData] = useState<Quote | null>(null);
  const [inventoryStatus, setInventoryStatus] = useState<InventoryStatus[]>([]);
  const [generatedQuote, setGeneratedQuote] = useState<Quote | null>(null);
  const router = useRouter();

  const handleEmailSubmit = async (emailContent: string) => {
    setLoading(true);

    try {
      const parsedData = await axios.post("/api/parse-email", { emailContent });

      if (parsedData.data) {
        setRFQData(parsedData.data);
        const inventoryStatusResponse = await axios.post(
          "/api/check-inventory",
          {
            requestedProducts: parsedData.data.products,
          }
        );

        setInventoryStatus(inventoryStatusResponse.data);
      }
    } catch (error) {
      console.error("Error submitting RFQ:", error);
      alert("Failed to process RFQ. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuote = async () => {
    setLoading(true);

    try {
      const quoteResponse = await axios.post("/api/generate-quote", {
        rfqData,
        inventoryStatus,
      });

      if (quoteResponse.data) {
        setGeneratedQuote(quoteResponse.data);
        alert("Quote generated successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error generating quote:", error);
      alert("Failed to generate quote. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rfqs-page">
      <h1>Submit RFQ</h1>
      <p>
        Parse any RFQ email with our revolutionary AI technology base on GPT-4
        in order to create a quote for your customers
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailSubmit(emailContent);
        }}
      >
        <textarea
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          placeholder="Paste the RFQ email content here"
          rows={10}
          cols={50}
          required
        />
        <br />
        <button className="primary" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit RFQ"}
        </button>
      </form>
      {rfqData && <InventoryManager inventoryStatus={inventoryStatus} />}
      {rfqData && inventoryStatus.length > 0 && (
        <QuoteGenerator
          rfqData={rfqData}
          inventoryStatus={inventoryStatus}
          onGenerateQuote={handleGenerateQuote}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SubmitRFQ;
