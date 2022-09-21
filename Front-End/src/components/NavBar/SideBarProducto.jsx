import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import cart from "../../assets/images/cart.png";
import {
  getUserProfile,
  viewing,
  filterByQuery,
  viewingLike,
} from "../../redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Dropdown, Avatar, Toast, Tooltip } from "flowbite-react";
import SideBar from "../SideBar/SideBar";
import { useState } from "react";
import SearchBar from "../SearchBars/SearchBar";
import add from "../../assets/images/add.png";

export default function SideBarProducto() {
  const dispatch = useDispatch();
  const [resetFilters, setResetFilters] = useState("false");
  const [filterParams, setFilterParams] = useState({
    age: "all",
    creation_date: "asc",
    vaccinated: "all",
    castrated: "all",
    location: "all",
    pet_type: "all",
    pet_size: "all",
    gender: "all",
    is_adopted: "all",
  });

  function reset() {
    if (resetFilters === "false") {
      setResetFilters("true");
    } else {
      setResetFilters("false");
    }
    dispatch(
      filterByQuery({
        age: "all",
        creation_date: "asc",
        vaccinated: "all",
        castrated: "all",
        location: "all",
        pet_type: "all",
        pet_size: "all",
        gender: "all",
        is_adopted: "all",
      })
    );
    setFilterParams({
      age: "all",
      creation_date: "asc",
      vaccinated: "all",
      castrated: "all",
      location: "all",
      pet_type: "all",
      pet_size: "all",
      gender: "all",
      is_adopted: "all",
    });
  }

  function handlerFilterIsAdopted(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        is_adopted: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      is_adopted: ev.target.value,
    });
  }
  function handlerFilterPublicationAge(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        creation_date: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      creation_date: ev.target.value,
    });
  }
  function handlerFilterVacciantion(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        vaccinated: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      vaccinated: ev.target.value,
    });
  }
  function handlerFilterCastraed(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        castrated: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      castrated: ev.target.value,
    });
  }

  function handlerFilterTypePet(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        pet_type: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      pet_type: ev.target.value,
    });
  }
  function handlerFilterBySize(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        pet_size: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      pet_size: ev.target.value,
    });
  }
  function handlerFilterByAge(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        age: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      age: ev.target.value,
    });
  }
  function handlerFilterByGender(ev) {
    ev.preventDefault();
    dispatch(
      filterByQuery({
        ...filterParams,
        gender: ev.target.value,
      })
    );
    setFilterParams({
      ...filterParams,
      gender: ev.target.value,
    });
  }

  const allUsers = useSelector((state) => state.users);
  const allPets = useSelector((state) => state.pets);

  const id = localStorage.getItem("id");

  const loggedUser = useSelector((state) => state.userProfile); //el loggeduser5 estaba arriba del useEFF, lo puse abajio

  function removeToken(ev) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  function closeHandler(e) {
    e.preventDefault();
    let payload = {
      id: loggedUser._id, //dueño
      interestedId: e.target.value,
      petId: e.target.name, // interestedUsers: [{usuariointeresado}{mascotaquequiero},],
      petId2: e.target.name,
      userId: e.target.value,
      ownerId: loggedUser._id,
    };
    dispatch(viewing(payload));
    dispatch(getUserProfile(loggedUser._id));
  }

  function closeLikeHandler(e) {
    e.preventDefault();
    let payload = {
      petId2: e.target.name,
      userId: e.target.value,
      ownerId: loggedUser._id,
    };
    dispatch(viewingLike(payload));
    dispatch(getUserProfile(loggedUser._id));
  }

  let algo = loggedUser?.interestedUsers?.map((e) => {
    return {
      user: allUsers.filter((a) => a._id === e.interestedUser)[0],
      pet: allPets.filter((a) => a._id === e.petId)[0],
      viewState: e.viewState,
    };
  });

  let interest = loggedUser?.interestedUsers?.map((e) => {
    return {
      user: allUsers?.filter((a) => a._id === e.interestedUser)[0],
      pet: allPets?.filter((a) => a._id === e.petId)[0],
      viewState: e.viewState,
      esIntrest: true,
    };
  });

  let like = loggedUser?.likesPets?.map((e) => {
    return {
      user: allUsers?.filter((a) => a._id === e.userId)[0],
      pet: allPets?.filter((a) => a._id === e.petId)[0],
      viewState: e.support,
      esLike: true,
    };
  });

  let notis = [interest, like];
  let notisFlat = notis.flat().sort(() => {
    return Math.random() - 0.5;
  });
  let notiSlice = notis.flat().reverse().slice(0, 5);

  let bell = notis?.flat().filter((noti) => noti?.viewState === false);

  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Navbar fluid={false} rounded={false} class="text-white  bg-yellow-500">
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed lg:right-10 right-4 top-16  z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Tooltip content="Cerrar Filtros" placement="bottom">
            <span className="text-black font-bold">x</span>
          </Tooltip>
        </button>
      ) : (
        <>
          <Link to="/market/cart">
            <button
              // onClick={() => setShowSidebar(!showSidebar)}
              className="fixed  z-30 flex items-center rounded-lg  cursor-pointer right-2 top-40 lg:right-56 hover:bg-yellow-500"
              width="40"
              height="40"
            >
              <img src={cart} alt="narnia" />
            </button>
          </Link>


          
          <Link to="/market/create">
            <img
              src={add}
              alt="imagen de pet"
              className="fixed  flex items-center rounded-lg  cursor-pointer right-2 bottom-20 lg:right-56 hover:bg-yellow-500"
            />
          </Link>
        </>
      )}

      <div
        className={`top-16 right-0 w-56 lg:w-96 bg-yellow-500 z-40 text-white fixed h-screen   ease-in-out duration-300  flex flex-col pr-5 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className=" flex justify-center flex-col mx-5 mt-3 ">
          <SearchBar />
        </div>

        <Tooltip content="Estado de adopción" placement="bottom">
          <div className="w-44 lg:w-56 flex justify-center flex-col mx-5 mb-3">
            <select
              className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
              onChange={(ev) => handlerFilterIsAdopted(ev)}
            >
              <option hidden selected={resetFilters}>
                Estado de adopción
              </option>
              <option value="yes">Adoptados</option>
              <option value="no">Aún sin hogar</option>
            </select>
          </div>
        </Tooltip>
        <Tooltip content="¿Vacunado?" placement="bottom">
          <div className="w-44 lg:w-56 flex justify-center flex-col mx-5 mb-3">
            <select
              className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
              onChange={(ev) => handlerFilterVacciantion(ev)}
            >
              <option hidden selected={resetFilters}>
                Vacunado
              </option>
              <option value="yes">Si</option>
              <option value="no">No</option>
              <option value="unknown">No se</option>
            </select>
            <p />
          </div>
        </Tooltip>

        <Tooltip content="¿Castrado?" placement="bottom">
          <div className="w-44 lg:w-56 flex justify-center flex-col mx-5 mb-3">
            <select
              className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
              onChange={(ev) => handlerFilterCastraed(ev)}
            >
              <option hidden selected={resetFilters}>
                Castrado
              </option>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
            <p />
          </div>
        </Tooltip>

        <Tooltip content="Tipo de mascota" placement="bottom">
          <div className="w-44 lg:w-56 flex justify-center flex-col mx-5 mb-3">
            <select
              className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
              onChange={(ev) => handlerFilterTypePet(ev)}
            >
              <option hidden selected={resetFilters}>
                Tipo de mascota
              </option>
              <option value="dog">Perros</option>
              <option value="cat">Gatos</option>
              <option value="other">Otros</option>
            </select>
            <p />
          </div>
        </Tooltip>
        <Tooltip content="Tamaño" placement="bottom">
          <div className="w-44 lg:w-56 flex justify-center flex-col mx-5 mb-3">
            <select
              className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
              onChange={(ev) => handlerFilterBySize(ev)}
            >
              <option hidden selected={resetFilters}>
                Tamaño
              </option>
              <option value="big">Grande</option>
              <option value="medium">Mediano</option>
              <option value="small">Pequeño</option>
            </select>
            <p />
          </div>
        </Tooltip>

        <Tooltip content="Edad" placement="bottom">
          <div className="w-44 lg:w-56 flex justify-center flex-col mx-5 mb-3">
            <select
              className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
              onChange={(ev) => handlerFilterByAge(ev)}
            >
              <option hidden selected={resetFilters}>
                Edad
              </option>
              <option value="old">Anciano</option>
              <option value="adult">Adulto</option>
              <option value="young">Joven</option>
            </select>
          </div>
        </Tooltip>
        <Tooltip content="Genero" placement="bottom">
          <div className="w-44 lg:w-56 flex justify-center flex-col mx-5 ">
            <select
              className="bg-gray-200 font-semibold p-2 rounded-lg flex-1 appearance-none w-full py-2 px-4 text-gray-800 placeholder-white text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-yellow-800"
              onChange={(ev) => handlerFilterByGender(ev)}
            >
              <option hidden selected={resetFilters}>
                Género
              </option>
              <option value="male">Macho</option>
              <option value="female">Hembra</option>
            </select>
          </div>
        </Tooltip>
        <div className="w-44 lg:w-56 flex justify-center flex-col mx-5 ">
          <div className="flex justify-center gap-2 m-4">
            <button
              name="desc"
              value="desc"
              onClick={(ev) => handlerFilterPublicationAge(ev)}
              className="text-black font-semibold"
            >
              Mas antiguas
            </button>
            <p />
            <button
              name="asc"
              value="asc"
              onClick={(ev) => handlerFilterPublicationAge(ev)}
              className="text-black font-semibold"
            >
              Mas recientes
            </button>
            <p />
          </div>
          <button
            onClick={() => reset()}
            className="py-2 px-4  bg-yellow-700 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Resetear filtros
          </button>
        </div>
      </div>
    </Navbar>
  );
}
