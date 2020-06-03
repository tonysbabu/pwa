import React from "react";
import "./styles.css";

export default function LoadingIndicator() {
  return (
    <div className="loading-indicator-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
