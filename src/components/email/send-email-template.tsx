import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div style={styles.container}>
    <h1 style={styles.header}>{name}</h1>
    <h2 style={styles.subHeader}>{email}</h2>
    <p style={styles.message}>{message}</p>
  </div>
);

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "10px",
  },
  subHeader: {
    fontSize: "22px",
    color: "#555",
    marginBottom: "15px",
  },
  message: {
    fontSize: "18px",
    color: "#666",
    lineHeight: "1.6",
  },
};
