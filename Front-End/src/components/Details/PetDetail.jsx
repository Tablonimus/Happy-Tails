import React, { useLayoutEffect, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPetDetail, clearStatePet, handlePet } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import Loader from "./../Loaders/Loader";
import FooterComponent from "../FooterComponent";
import { Carousel, Footer } from "flowbite-react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import mapboxgl from "mapbox-gl";
import Swal from "sweetalert2";
import { notificationSwal } from "../../utils/notificationSwal";
import Error404 from "../Loaders/Error404.jsx";

export default function PetDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const petDetail = useSelector((state) => state.petDetail);
  const loggedUser = useSelector((state) => state.userProfile);
  const mapDiv = useRef(null);

  useEffect(() => {
    dispatch(clearStatePet());
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  useLayoutEffect(() => {
    createNewMap(petDetail.place_longitude, petDetail.place_latitude);
  }, [petDetail.place_latitude, petDetail.place_longitude]);

  function createNewMap(long, lat) {
    if (petDetail.place_latitude && petDetail.place_longitude) {
      new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [long, lat], // starting position [lng, lat]
        zoom: 12, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
    }
  }

  mapboxgl.accessToken =
    "pk.eyJ1IjoicG9saW5vIiwiYSI6ImNsN2FtdWNybTB0bmk0MHNqZXZxMzM0OTYifQ.O2Y9sZnF-K1k_KhC8MzJbA";

  function handleDeletePet(id) {
    Swal.fire({
      title: "¿Está seguro de que desea eliminar esta publicación?",
      text: "Esta publicación se eliminará",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handlePet({ id: id, ban: true })).then((e) => {
          if (e === "OK") {
            notificationSwal(
              "¡Enhorabuena!",
              "Publicación borrada con éxito",
              "success",
              "Ok"
            );
            navigate("/home");
          } else {
            notificationSwal(
              "¡Ooops!",
              "No se pudo borrar la publicación, intente mas tarde",
              "error",
              "Aceptar"
            );
          }
        });
      } else {
        notificationSwal(
          "Operación cancelada",
          "Publicación no borrada",
          "error",
          "Aceptar"
        );
      }
    });
  }

  if (petDetail === "") {
    return (
      <div>
        <NavBar />
        <Error404 />
      </div>
    );
  } else if (Object.keys(petDetail).length) {
    return (
      <div>
        <NavBar />
        <h2 className="flex pt-20 justify-center font-semibold text-3xl  text-white ">
          Detalles 🐶
        </h2>

        <div className="lg:px-32 pt-5">
          <div className="lg:flex rounded-lg ring-2 ring-yellow-600 w-full">
            <div className="bg-yellow-800 w-full rounded-lg ring-2 ring-yellow-600">
              <div className="flex">
                <div>
                  <FacebookShareButton
                    url={`https://happytails.vercel.app/pet/${petDetail._id}`}
                    quote={"Adoptá esta mascota"}
                    hashtag={"#AdopcionResponsable"}
                  >
                    <FacebookIcon size={40} />
                  </FacebookShareButton>
                </div>
                <div>
                  <EmailShareButton
                    subject="Quiero que me adoptes"
                    body={`Adoptame en https://www.happytails.com/pet/${petDetail._id}`}
                  >
                    <EmailIcon size={40} />
                  </EmailShareButton>
                </div>
              </div>

              <div className="w-full lg:flex">
                <div className="lg:w-1/2 flex flex-col items-center">
                  <div className="flex flex-col gap-10">
                    {loggedUser._id === petDetail.user._id ? (
                      <Link to="/updatepet">
                        <button className="py-2 mt-5 px-4 w-full bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                          📝Editar mascota
                        </button>
                      </Link>
                    ) : (
                      <></>
                    )}
                    <div className="block lg:ml-28 ml-14 mt-10 h-56 w-72 bg-yellow-900 rounded">
                      <Carousel className="rounded">
                        <img
                          src={petDetail?.image}
                          alt="imagen mascota"
                          // width="500px"
                          className="w-96"
                        />
                        {petDetail?.imagePool?.map((image) => (
                          <img
                            alt={image}
                            src={image}
                            className="w-96 rounded"
                          />
                        ))}
                      </Carousel>
                    </div>
                    <h2 className="font-semibold text-white text-lg text-center my-6">
                      Descripción: {petDetail.description}
                    </h2>
                  </div>
                  <div className="flex">
                    <div>
                      {loggedUser._id !== petDetail.user._id ? (
                        petDetail.isAdopted === true ? (
                          <div className="flex flex-col w-full my-5 gap-6">
                            {loggedUser.isAdmin ? (
                              <button
                                onClick={() => {
                                  handleDeletePet(petDetail._id);
                                }}
                                className="py-2 w-full px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                              >
                                ELIMINAR PUBLICACION
                              </button>
                            ) : null}
                            <Link to={`/reportpet`}>
                              <button className="py-2 w-full px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                DENUNCIAR PUBLICACION
                              </button>
                            </Link>
                            <Link to={`/users/${petDetail.user._id}`}>
                              <button className="py-2 w-full px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                PERFIL DEL DUEÑO
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center items-center w-full gap-5 mt-5">
                            <h2 className="font-semibold text-white my-5">
                              {" "}
                              ESTA MASCOTA ESTA BUSCANDO NUEVO DUEÑO!
                            </h2>
                            <div className="flex flex-col w-full gap-6">
                              {loggedUser.isAdmin ? (
                                <button
                                  onClick={() => {
                                    handleDeletePet(petDetail._id);
                                  }}
                                  className="py-2 w-full px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                >
                                  ELIMINAR PUBLICACION
                                </button>
                              ) : null}
                              <Link to={`/reportpet`}>
                                <button className="py-2 w-full px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                  DENUNCIAR PUBLICACION
                                </button>
                              </Link>
                              <Link to={`/users/${petDetail.user._id}`}>
                                <button className="py-2 w-full px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                  PERFIL DEL DUEÑO
                                </button>
                              </Link>
                              <Link to={`/adopt/${petDetail._id}`}>
                                <button className="py-2 w-full px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                  LO QUIERO!
                                </button>
                              </Link>
                            </div>
                          </div>
                        )
                      ) : (
                        <>
                          <h2 className="font-semibold text-white my-6">
                            ESTA MASCOTA TE PERTENECE! Quieres
                            {petDetail.isAdopted === false
                              ? " quitarla de adopción?"
                              : " ponerla en adopción?"}
                          </h2>

                          <Link to={`/users/${petDetail.user._id}`}>
                            <button className="py-2 px-3 my-4 mr-8  w-full bg-yellow-600 hover:bg-green-700 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                              📝 CAMBIAR ESTADO
                            </button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 flex flex-col items-center gap-10">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="font-semibold text-white text-3xl mt-5">
                      {petDetail.name}
                    </h2>
                    <h2 className="font-semibold text-white text-ls">
                      Dueño:{" "}
                      {petDetail.user.first_name +
                        " " +
                        petDetail.user.last_name}
                    </h2>
                    <h3 className="font-semibold text-white">{`En ${petDetail.place}`}</h3>
                    {petDetail.place_latitude &&
                      petDetail.place_longitude ? (
                      <div
                        ref={mapDiv}
                        style={{
                          height: "20vw",
                          width: "30vh",
                          borderRadius: "10px",
                        }}
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-5 border-t pt-3 mb-3">
                    <div>
                      <h1 className="font-semibold italic text-white text-2xl">
                        Información detallada
                      </h1>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-xl">
                        Tamaño:{" "}
                        {petDetail.size === "big"
                          ? "Grande"
                          : petDetail.size === "medium"
                            ? "Mediano"
                            : "Chico"}
                      </h3>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-xl">
                        ¿Está vacunado?:{" "}
                        {petDetail.vaccination === "yes"
                          ? "Sí"
                          : petDetail.vaccination === "no"
                            ? "No"
                            : "No se sabe"}
                      </h3>
                    </div>
                    <h3 className="font-semibold text-white text-xl">
                      Género:{" "}
                      {petDetail.gender === "female" ? "Hembra" : "Macho"}
                    </h3>
                    <div>
                      <h3 className="font-semibold text-white text-xl">
                        Edad: {petDetail.age} años
                      </h3>
                    </div>
                    <div>
                      <h3 className="font-semibold mr-10 text-white text-xl">
                        Castrado: {petDetail.castrated === true ? "Si" : "No"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterComponent />
      </div>
    );
  } else {
    <>
      <NavBar />
      <Loader />
    </>;
  }
}
