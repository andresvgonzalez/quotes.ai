import React from "react";

interface EmailParserProps {
  emailContent: string;
  setEmailContent: (content: string) => void;
  handleEmailSubmit: (content: string) => void;
  loading: boolean;
}

const EmailParser: React.FC<EmailParserProps> = ({
  emailContent,
  setEmailContent,
  handleEmailSubmit,
  loading,
}) => {
  return (
    <div>
      <h1>Submit RFQ</h1>
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
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit RFQ"}
        </button>
      </form>
    </div>
  );
};

export default EmailParser;
