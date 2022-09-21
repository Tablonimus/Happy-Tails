import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPetDetail, patchPet } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import { notificationSwal } from "../../utils/notificationSwal.jsx";
import Swal from "sweetalert2";
import "../LandingPage.css";
import { Card, Dropdown } from "flowbite-react/lib/esm/components";
import { Tooltip } from "flowbite-react/lib/esm/components";

export default function OwnedPet({
  idUser,
  idPet,
  namePet,
  imagePet,
  isAdopted,
  isDeleted,
  interestedUsers,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.userProfile);
  const userDetail = useSelector((state) => state.userDetail);

  //---------------------------------------------------handler Cambiar Botones----------------------------------------------
  const [adopt, setAdopt] = useState({
    id: idPet,
    name: namePet,
    isAdopted: isAdopted,
  });

  let payload = {
    id: idPet,
    name: namePet,
    isAdopted: isAdopted,
  };
  function patchAdoptionHandler(e) {
    e.preventDefault();

    if (adopt.isAdopted === true) {
      payload = { id: idPet, name: namePet, isAdopted: false };
      setAdopt({ id: idPet, name: namePet, isAdopted: false });
    } else {
      payload = { id: idPet, name: namePet, isAdopted: true };
      setAdopt({ id: idPet, name: namePet, isAdopted: true });
    }
    dispatch(patchPet(payload));
  }

  //-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-DELETE-x-x-x-x-x-x-x--x-x-x-x-x-x-x-x-x-x-x-x-x-

  const [deleted, setDeleted] = useState({
    id: idPet,
    deleted: isDeleted,
  });
  let payloadDelete = {
    id: idPet,
    deleted: isDeleted,
  };

  function deleteHandler(e) {
    e.preventDefault();
    setDeleted({
      id: idPet,
      deleted: true,
    });
    payloadDelete = {
      id: idPet,
      deleted: true,
    };

    if (true) {
      Swal.fire({
        title: "¿Está seguro de que desea eliminar esta mascota?",
        text: "Esta mascota se eliminará",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Sí",
      })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(patchPet(payloadDelete)).then((e) => {
              if (e === "OK") {
                notificationSwal(
                  "¡Enhorabuena!",
                  "Mascota eliminada con éxito",
                  "success",
                  "Ok"
                );
              } else {
                notificationSwal(
                  "¡Ooops!",
                  "No se pudo eliminar la mascota, intente mas tarde",
                  "error",
                  "Aceptar"
                );
              }
            });
          } else {
            notificationSwal(
              "Operación cancelada",
              "Mascota no eliminada",
              "error",
              "Aceptar"
            );
          }
        })
        .then(() => navigate(`/home`, { replace: true }));
    } //oponer sweet
  }
  //editar handler--------------------------------------------------------------
  function fillUpdateHandler(e) {
    e.preventDefault();
    dispatch(getPetDetail(idPet)).then(() =>
      navigate(`/updatepet`, { replace: true })
    );
  }

  return (
    <div className="flex flex-col items-center py-4 px-5 ">
      <div className="">
        <Card class="block opacity-90 max-w-sm bg-yellow-800 rounded-lg border border-yellow-900 shadow-md hover:opacity-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex justify-end">
            {loggedUser._id === userDetail._id ? (
              <Dropdown inline={true} label="">
                <Dropdown.Item>
                  {loggedUser._id === userDetail._id ? (
                    <div className="flex justify-center p-1">
                      <Tooltip content="Editar mascota" placement="top">
                        <button
                          onClick={(e) => fillUpdateHandler(e)}
                          className="block py-2 px-4 text-sm text-black-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Editar
                        </button>
                      </Tooltip>
                    </div>
                  ) : (
                    <></>
                  )}
                </Dropdown.Item>

                <Dropdown.Item>
                  {loggedUser._id === userDetail._id ? (
                    <div className="flex justify-center p-1">
                      <Tooltip content="Borrar mascota" placement="bottom">
                        <button
                          onClick={(e) => deleteHandler(e)}
                          className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Eliminar
                        </button>
                      </Tooltip>
                    </div>
                  ) : (
                    <></>
                  )}
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <></>
            )}
          </div>
          <Link to={`/pet/${idPet}`}>
            <div className="flex flex-col items-center">
              <img
                className="mb-3 h-24 w-24 object-cover rounded-full shadow-lg"
                src={imagePet}
                alt="imagen de la la mascota"
              />
              <h5 className="mb-1 lg:text-xl font-medium text-gray-900 dark:text-white">
                {namePet}
              </h5>

              <div className=" flex space-x-3">
                {loggedUser._id === userDetail._id ? (
                  adopt.isAdopted === false && deleted.deleted === false ? (
                    <div className="flex flex-col justify-content items-center">
                      <div className="flex  justify-content items-center"></div>
                      <div className="flex">
                        <button
                          onClick={(e) => patchAdoptionHandler(e)}
                          className="bg-red-900 mt-4 hover:bg-red-600 text-white font-bold py-2 px-3 border border-yellow-700 rounded"
                        >
                          ⛔ PARAR ADOPCION
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-content items-center">
                      <button
                        onClick={(e) => patchAdoptionHandler(e)}
                        className="bg-yellow-900 mt-4 hover:bg-green-600 opacity-80 text-white font-bold py-2 px-3 border border-yellow-700 rounded"
                      >
                        ✔️ INICIAR ADOPCIÓN
                      </button>
                    </div>
                  )
                ) : loggedUser._id !== userDetail._id &&
                  adopt.isAdopted === false &&
                  deleted.deleted === false ? (
                  <div className="flex flex-col items-center">
                    <Link to={`/pet/${idPet}`}>
                      {/* link de mierda -------------------------------------------------------------------------*/}
                      <button className="bg-green-900 mr-4 mt-3 hover:bg-green-600 text-white font-bold  px-4 border border-yellow-700 rounded">
                        <h2 className="font-semibold"> ¡Mascota en adopcion!</h2>
                        <h2 className=""> VER PERFIL</h2>
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Link to={`/pet/${idPet}`}>
                    <button className="bg-yellow-900 mt-4 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
                      VER PERFIL
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
}
