import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reportPet } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import { notificationSwal } from "../../utils/notificationSwal";
import Swal from "sweetalert2";
import "./Reports.css";

export default function ReportPet() {
  const [input, setInput] = useState(""); //si le llegamos a agregar mas campos al formulario, convertir input a objeto como siempre
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const reported_pet_id = useSelector((state) => state.petDetail._id);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "¿Está seguro de que desea denunciar esta publicación?",
      text: "Esta publicación será denunciada",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          reportPet({
            informerId: id,
            reportedPetId: reported_pet_id,
            reason: input,
          })
        ).then((e) => {
          if (e === "OK") {
            notificationSwal(
              "Denuncia exitosa",
              "Un administrador revisará la publicación",
              "success",
              "Ok"
            );
            navigate("/home");
          } else {
            notificationSwal(
              "¡Ooops!",
              "No se pudo denunciar la publicación, intente mas tarde",
              "error",
              "Aceptar"
            );
          }
        });
      } else {
        notificationSwal(
          "Operación cancelada",
          "Publicación no denunciada",
          "error",
          "Aceptar"
        );
      }
    });
  }

  return (
    <div id="reportPet" className="fixed">
      <NavBar />
      <div className="flex flex-col w-full mt-15 m-auto py-8 rounded-lg sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-1 mt-14 text-xl font-normal text-white sm:text-2xl dark:text-white">
          ¿Por qué desea reportar esta publicación?
        </div>


        <div className="flex flex-col justify-items-center self-center mt-8 w-1/3 bg-yellow-500 p-4 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <div className="flex flex-col">
                <div className="self-center text-xl font-light sm:text-2xl text-white py-10">
                  Comenta el motivo de tu denuncia
                </div>
                <div className="flex justify-center items-center mt-1 w-full">
                  <textarea
                    name="description"
                    value={input}
                    maxLength="255"
                    placeholder="Describa el motivo de su denuncia"
                    onChange={(e) => handleChange(e)}
                    className="flex justify-center items-center w-2/3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center mt-1 w-full pb-10">
                <button
                  type="submit"
                  className="mt-2 py-2 w-2/3 bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Enviar reporte de publicación
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
