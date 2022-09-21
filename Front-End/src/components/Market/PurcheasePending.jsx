import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Market.css";

export default function PurcheasePending() {
  return (
    <>
      <div id="pending-pay" className="fixed">
        <NavBar />
        <h1 className="pt-56">pago pendiente</h1>
      </div>
    </>
  );
}
