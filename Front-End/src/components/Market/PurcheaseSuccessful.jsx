import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Market.css";

export default function PurcheaseSuccessful() {
  return (
    <>
      <div id="sucess-pay" className="fixed">
        <NavBar />
        < h1 className="pt-56">PAGO REALIZADO CON EXITO</h1>
      </div>
    </>
  );
}
