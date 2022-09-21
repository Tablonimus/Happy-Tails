import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Market.css"

export default function PurcheaseCancelled(){
  return (
    <>
      <div id="fail-pay" className="fixed">
        <NavBar />
        <h1 className="pt-56">pago fallado</h1>
      </div>
    </>
  )
}