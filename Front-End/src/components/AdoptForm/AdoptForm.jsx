import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getUserProfile, getAllUsers, getPetDetail, emailAdopt, patchUsuer, patchInterestedUsers } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import { notificationSwal } from "../../utils/notificationSwal.jsx";
import Swal from "sweetalert2";
import NavBar from "../NavBar/NavBar";

export default function AdoptForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.userProfile);
  const petDetail = useSelector((state) => state.petDetail);
  const usersArray = useSelector((state) => state.users);
  const petOwner = petDetail.user.email;


  const [input, setInput] = useState({
    owner_email: petOwner,
    adopter_name: loggedUser.first_name + " " + loggedUser.last_name,
    adopter_username: loggedUser.username,
    adopter_email: loggedUser.email,
    adopter_telephone: loggedUser.telephone,
    message: "",
    link: `https://happytails.vercel.app/users/${loggedUser._id}`,
    pet_name: petDetail.name,
    ownerId: petDetail.user._id,
    userId: loggedUser._id,
    petId: petDetail._id,
    pet_interesed: petDetail.user.interestedUsers
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handlerSubmit(ev) {
    ev.preventDefault();
    if (true) {
      Swal.fire({
        title: "¿Está seguro de que desea enviar el formulario de adopcion?",
        text: "El dueño recibirá una notificación",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Sí",
      })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(patchInterestedUsers(input)).then((e) => {
              if (e === "OK") {
                notificationSwal(
                  "¡Enhorabuena!",
                  "El dueño recibio tu mensaje éxitosamente 👌",
                  "success",
                  "Ok"
                );
              } else {
                notificationSwal(
                  "¡Ooops!",
                  "Ya mandaste una solicitud de adopcion",
                  "error",
                  "Aceptar"
                );
              }
            });
          } else {
            notificationSwal(
              "Operación cancelada",
              "La solicitud fue cancelada",
              "error",
              "Aceptar"
            );
          }
        })
        .then(() => navigate("/home", { replace: true }));
    }

  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full mt-15 m-auto py-8 shadow sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center mt-8 px-18 max-w-lg self-center">
          <form
            className="flex flex-col justift-content mt-5"
            onSubmit={handlerSubmit}
          >
            <div>
              <h3 className="text-2xl font-semibold text-center text-white">
                Envía una notificación al dueño mostrando tu interés
              </h3>
            </div>
            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded-md bg-opacity-50">
              <h3 className="  text-black">Nombre Completo:</h3>
              <h3 className="text-xl font-bold">
                {loggedUser.first_name + " " + loggedUser.last_name}{" "}
              </h3>
            </div>
            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded-md bg-opacity-50">
              <h3 className="  text-black">Usuario:</h3>
              <h3 className="text-xl font-bold">{loggedUser.username}</h3>
            </div>
            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded-md bg-opacity-50">
              <h3 className="  text-black">Email:</h3>
              <h3 className="text-xl font-bold">{loggedUser.email}</h3>
            </div>

            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded-md bg-opacity-50">
              <h3 className="  text-black">Telefono de contacto:</h3>
              <h3 className="text-xl font-bold">{loggedUser.telephone}</h3>
            </div>

            <div className="flex flex-col mt-5 px-3 py-3 text-white bg-gray-500 rounded-md bg-opacity-50">
              <h3 className="text-black pb-2">Tu Mensaje:</h3>

              <textarea
                className="rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent text-black resize-none"
                name="message"
                value={input.message}
                placeholder="Mensaje para el dueño de la mascota..."
                onChange={(ev) => handleChange(ev)}
                maxLength="255"
              ></textarea>
            </div>
            <div className="flex items-center ">
              <h3>¿Algun dato es incorrecto?</h3>
              <Link to="/updateuser">
                <button className="bg-yellow-900 ml-10 mr-1 mt-4 hover:bg-yellow-500 text-white font-bold py-2 px-2 border border-yellow-700 rounded-md">
                  Editar perfil→
                </button>
              </Link>
            </div>
            <div className="flex justify-content py-3">
              <button
                type="submit"
                className="bg-green-500 w-full hover:bg-yellow-500 text-white font-bold py-5 px-20 border border-yellow-700 rounded-md"
              >
                💌ENVIAR NOTIFICACIÓN DE CONTACTO💌
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
