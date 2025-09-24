import React from "react";

// Reusable ProductCard component
function ProductCard({ name, price, status }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
      margin: "10px",
      width: "200px",
      textAlign: "center",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ fontWeight: "bold" }}>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div style={{
      border: "2px solid black",
      padding: "20px",
      margin: "20px",
      textAlign: "center"
    }}>
      <h2 style={{ marginBottom: "20px" }}>Products List</h2>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProductCard name="Wireless Mouse" price="25.99" status="In Stock" />
        <ProductCard name="Keyboard" price="45.50" status="Out of Stock" />
        <ProductCard name="Monitor" price="199.99" status="In Stock" />
      </div>
    </div>
  );
}

export default App;
