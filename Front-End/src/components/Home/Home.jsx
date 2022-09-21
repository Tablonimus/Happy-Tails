import React from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "./Cards";
import SideBar from "../SideBar/SideBar";
import "./../LandingPage.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBarHome from "../NavBar/NavBarHome";
import chatt from "../../assets/images/chatt.png";
import FooterComponent from "../FooterComponent";

export default function Home() {
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.userProfile);

  const verifyData = () => {
    if (!loggedUser?.telephone || !loggedUser.username) {
      Swal.fire({
        title: "DATOS",
        icon: "question",
        text: "Por favor completa tus datos",
      }).then(() => navigate("/missingdata", { replace: true }));
    }
  };

  function handley(e) {
    setTimeout(verifyData(), 5000);
    ///FUNCION DE CHRIS↑↑↑
  }
  return (
    <section
      onClick={(e) => handley(e)}
      className="flex flex-col h-full"
    >
      <NavBar />
      <NavBarHome /> {/* NUEVA SIDEBAR TUGLE LU GULU */}
      <div className="mt-14 flex w-screen h-screen justify-center">
        <Cards />
      </div>
        
    </section>
  );
}
