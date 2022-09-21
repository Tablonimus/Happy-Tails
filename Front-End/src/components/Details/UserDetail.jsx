import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "flowbite-react/lib/esm/components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  getUserDetail,
  clearState,
  getPetDetail,
  chatWithUser,
  handleAdmin,
  handleUser,
} from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import OwnedPet from "./OwnedPet";
import Loader from "./../Loaders/Loader";
import "./userDetailStyle.css";
import mapboxgl from "mapbox-gl";
import Swal from "sweetalert2";
import { notificationSwal } from "../../utils/notificationSwal";
import Error404 from "../Loaders/Error404.jsx";
import portada from "./../../assets/images/Background2.png";
import FooterComponent from "../FooterComponent";

export default function UserDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearState());
    dispatch(getUserDetail(id));
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  const loggedUser = useSelector((state) => state.userProfile);
  const userDetail = useSelector((state) => state.userDetail);
  const mapDiv = useRef(null);

  useLayoutEffect(() => {
    createNewMap(userDetail.place_longitude, userDetail.place_latitude);
  }, [userDetail.place_latitude, userDetail.place_longitude]);

  function createNewMap(long, lat) {
    if (userDetail.place_latitude && userDetail.place_longitude) {
      new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [long, lat], // starting position [lng, lat]
        zoom: 12, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
    }
  }

  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  function chat() {
    dispatch(
      chatWithUser({ senderId: loggedUser._id, receiverId: userDetail._id })
    ).then((e) => {
      navigate("/chat");
    });
  }

  mapboxgl.accessToken =
    "pk.eyJ1IjoicG9saW5vIiwiYSI6ImNsN2FtdWNybTB0bmk0MHNqZXZxMzM0OTYifQ.O2Y9sZnF-K1k_KhC8MzJbA";

  function handleAdminSet(id) {
    Swal.fire({
      title: "¿Está seguro de que desea nombrar administrador a este usuario?",
      text: "Tendrá control total del sitio",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleAdmin({ id: id, isAdmin: true })).then((e) => {
          if (e === "OK") {
            notificationSwal(
              "¡Enhorabuena!",
              "El usuario ahora es administrador",
              "success",
              "Ok"
            );
            navigate("/home");
          } else {
            notificationSwal(
              "¡Ooops!",
              "No se poner al usuario como administrador, intente mas tarde",
              "error",
              "Aceptar"
            );
          }
        });
      } else {
        notificationSwal(
          "Operación cancelada",
          "Usuario sigue siendo usuario",
          "error",
          "Aceptar"
        );
      }
    });
  }

  function handleAdminUnset(id) {
    Swal.fire({
      title:
        "¿Está seguro de que desea descender a usuario a este administrador?",
      text: "Dejará de tener el control del sitio",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleAdmin({ id: id, isAdmin: false })).then((e) => {
          if (e === "OK") {
            notificationSwal(
              "¡Enhorabuena!",
              "El administrador fue descendido usuario",
              "success",
              "Ok"
            );
            navigate("/home");
          } else {
            notificationSwal(
              "¡Ooops!",
              "No se pudo descender al administrador a usuario, intente mas tarde",
              "error",
              "Aceptar"
            );
          }
        });
      } else {
        notificationSwal(
          "Operación cancelada",
          "El administrador sigue siendo administrador",
          "error",
          "Aceptar"
        );
      }
    });
  }

  function handleDeleteUser(id) {
    Swal.fire({
      title: "¿Está seguro de que desea deshabilitar este usuario?",
      text: "Este usuario se deshabilitará",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handleUser({ id: id, ban: true })).then((e) => {
          if (e === "OK") {
            notificationSwal(
              "¡Enhorabuena!",
              "Usuario borrado con éxito",
              "success",
              "Ok"
            );
            navigate("/home");
          } else {
            notificationSwal(
              "¡Ooops!",
              "No se pudo borrar el usuario, intente mas tarde",
              "error",
              "Aceptar"
            );
          }
        });
      } else {
        notificationSwal(
          "Operación cancelada",
          "Usuario no borrado",
          "error",
          "Aceptar"
        );
      }
    });
  }

  if (userDetail === "") {
    return (
      <div>
        <NavBar />
        <Error404 />
      </div>
    );
  } else if (Object.keys(userDetail).length) {
    return (
      <>
        <NavBar />

        <Modal
          show={show}
          popup={true}
          onClose={onClose}
          class="bg-gray-800 bg-opacity-500"
        >
          <div className="pl-2 p-3 bg-yellow-600 rounded-md">
            <Modal.Header>
              <p className="text-white">
                {userDetail?.first_name} {userDetail?.last_name}
              </p>
            </Modal.Header>
          </div>
          <Modal.Body class="p-6">
            <div className="space-y-6">
              <div>
                <div>
                  <div className="h-80">
                    <div className="h-1/4 flex items-center justify-center flex-col">
                      <div className="bg-white flex justify-center">
                        <h2 className="text-xl font-semibold">
                          📩 Email: {userDetail?.email}
                        </h2>
                      </div>
                    </div>
                    <div className="h-1/4 flex items-center justify-center flex-col">
                      <div className="bg-white flex justify-center">
                        <h2 className="text-xl font-semibold">
                          📞Telefono:{" "}
                          {userDetail?.telephone
                            ? userDetail?.telephone
                            : "No hay informaci贸n detallada"}
                        </h2>
                      </div>
                    </div>
                    <div className="h-1/4 flex items-center justify-center flex-col">
                      <div className="bg-white flex justify-center">
                        <h2 className="text-xl font-semibold">
                          📍 Ubicación: {userDetail?.place}
                        </h2>
                      </div>
                    </div>
                    <div className="h-1/4 flex items-center justify-center flex-col">
                      <div className="bg-white flex justify-center">
                        <h2 className="text-xl font-semibold">
                          Cuenta creada el: {userDetail?.createdAt.slice(0, 10)}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <div className=" lg:h-5/6 w-screen rounded-xl bg-yellow-800 ring-2 ring-[#e1a13f]">
          <div className="lg:h-2/3">
            <div className="flex w-screen">
              <img
                src={portada}
                alt=""
                className="w-screen lg:h-72 object-cover rounded-t-xl"
              />
              <div className="absolute lg:mt-4 lg:ml-4 mt-20 ml-4">
                <img
                  src={userDetail?.image}
                  alt=""
                  className="w-32 h-32 lg:w-80 lg:h-80 object-cover lg:mt-14 border-solid border-2 border-[#e1a13f] rounded-full"
                />
              </div>
            </div>
            <div className="lg:h-1/2 flex">
              <div className="lg:w-1/3"></div>
              <div className="w-2/3 flex">
                <div className="w-1/2 flex flex-col justify-around">
                  <div>
                    <h3 className="text-5xl lg:mt-4 text-white font-semibold">
                      {userDetail?.first_name} {userDetail?.last_name}
                    </h3>
                    <p className="font-semibold text-white">
                      "{userDetail?.username}"
                    </p>
                  </div>
                  <div className="w-screen lg:w-96">
                    <h3 className="ml-5 lg:m-0 text-xl font-semibold text-[#e1a13f] ">
                      {" "}
                      {userDetail?.about
                        ? userDetail?.about
                        : "Este usuario no ha aportado descripción aún"}
                    </h3>
                  </div>
                </div>

                <div className="w-96 h-96 m-20 lg:w-3/4 lg:h-3/4 lg:m-8">
                  {userDetail?.place_latitude && userDetail?.place_longitude ? (
                    <div
                      ref={mapDiv}
                      className="ring-[#f19d3d] ring-2 h-36  w-36 lg:h-60 lg:w-96  rounded-xl"
                    />
                  ) : null}
              <button
                onClick={() => {
                  onClick();
                }}
                className="py-2 px-4 mt-5 bg-yellow-600 hover:bg-yellow-300 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Más información
              </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-1/3 pt-5 flex">
            <div className="w-full flex justify-center items-center mt-10">
              {loggedUser._id !== userDetail._id ? (
                <div className="flex flex-row items-center justify-center mb-5">
                  <button
                    className="py-2 px-4 m-1 bg-yellow-600 hover:bg-green-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    onClick={() => chat()}
                  >
                    Enviar mensaje
                  </button>
                  <Link to={`/reportuser`}>
                    <button className="py-2 px-4 m-1 bg-yellow-600 hover:bg-red-600 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      Denunciar
                    </button>
                  </Link>
                </div>
              ) : (
                <></>
              )}

              {loggedUser?._id === userDetail?._id ? (
                <div className="flex flex-row items-center justify-center mb-5">
                  <Link to="/updateuser">
                    <button className="py-2 px-4 m-1 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      ✏️Editar Perfil
                    </button>
                  </Link>

                  <Link to="/market/create">
                    <button className="py-2 px-4 m-1 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      Vender un producto
                    </button>
                  </Link>
                </div>
              ) : (
                false
              )}
            </div>
            {loggedUser?.isAdmin && !userDetail?.isAdmin ? (
              <button
                onClick={() => {
                  handleAdminSet(userDetail?._id);
                }}
                className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                NOMBRAR ADMINISTRADOR
              </button>
            ) : null}
            {loggedUser?.isAdmin &&
            userDetail?.isAdmin &&
            loggedUser?._id !== userDetail?._id ? (
              <button
                onClick={() => {
                  handleAdminUnset(userDetail._id);
                }}
                className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                DESCENDER A USUARIO
              </button>
            ) : null}
            {loggedUser?.isAdmin && loggedUser?._id !== userDetail?._id ? (
              <button
                onClick={() => {
                  handleDeleteUser(userDetail?._id);
                }}
                className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                DESHABILITAR USUARIO
              </button>
            ) : null}
            <div className="lg:w-3/4 lg:flex lg:items-center lg:mt-14 bg-yellow-800 rounded-xl"></div>
          </div>

          <div className="lg:w-3/4 lg:flex lg:items-center lg:mt-14 bg-yellow-800 rounded-xl"></div>
        </div>

        <hr />

        <div className="bg-yellow-600 ring-2 ring-yellow-900 my-5 rounded-xl">
          <div className="w-full py-4">
            <h3 className="text-2xl font-semibold text-white text-center">
              Mascotas del usuario
            </h3>
          </div>
          <div
            id="editPet"
            className="flex flex-col lg:flex-row place-content-center"
          >
            {loggedUser?._id === userDetail?._id ? (
              <div className="flex flex-col justify-center items-center p-2">
                <Link to="/interestedtraders">
                  <button className="py-2 gap-1 px-4 bg-yellow-900 hover:bg-green-600 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    Traspaso de mascotas
                  </button>
                </Link>
                <Link to="/petregister">
                  <button className="py-2 mt-2 px-4 bg-yellow-900 hover:bg-green-600 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    Crear mascota
                  </button>
                </Link>
              </div>
            ) : (
              false
            )}
            {userDetail?.pets?.length ? (
              userDetail?.pets.map((pets) => (
                <OwnedPet
                  key={pets._id}
                  idUser={userDetail._id}
                  idPet={pets._id}
                  namePet={pets.name}
                  imagePet={pets.image}
                  isAdopted={pets.isAdopted}
                  pets={userDetail.pets}
                  isDeleted={pets.deleted}
                  interestedUsers={userDetail.interestedUsers}
                />
              ))
            ) : (
              <div className="h-50">
                <h3 className="text-2xl font-semibold text-white m-5 text-center">
                  No hay mascotas que mostrar...
                </h3>
              </div>
            )}
          </div>
        </div>

        <FooterComponent />
      </>
    );
  } else {
    <>
      <NavBar />
      <Loader />
      <FooterComponent />
    </>;
  }
}
