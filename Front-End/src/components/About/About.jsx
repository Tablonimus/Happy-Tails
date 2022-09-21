import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import FooterComponent from "../FooterComponent";
import tomi from "../../assets/aboutProfileImages/fototomi.png";
import juanma from "../../assets/aboutProfileImages/fotojuanma.png";
import juanjo from "../../assets/aboutProfileImages/fotojuanjo.png";
import ferri from "../../assets/aboutProfileImages/fotoferri.png";
import manu from "../../assets/aboutProfileImages/fotomanu.png";
import lauta from "../../assets/aboutProfileImages/fotolauta.png";
import caronte from "../../assets/aboutProfileImages/fotocaronte.png";
import flor from "../../assets/aboutProfileImages/fotoflor.png";
import linkedin from "../../assets/aboutProfileImages/linkedin.png";
import github from "../../assets/aboutProfileImages/github.png";

export default function About() {
  return (
    <div  className="flex flex-col w-screen flex-between">
      <NavBar />
      <h1 className="lg:text-6xl text-3xl pt-20 italic text-gray-800 flex justify-center items-center font-semibold lg:mb-3">
        Te presentamos al equipo de desarrollo
      </h1>
      <div className=" w-11/12 lg:flex  lg:flex-col-2 justify-center items-center">
      <div className="flex items-center lg:w-2/5 h-56 opacity-100 m-2  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
          <div className=" w-36 h-36 rounded-full border-lg border-yellow-500">
            <img
              className="object-cover ml-5 w-36 h-36 shadow-md rounded-full "
              src={juanma}
              alt=""
            />
          </div>
          <div className="flex flex-col mx-8 items-center">
            <div className="flex  flex-col justify-start">
              <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Juan Manuel Martinez
              </h5>
              <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Fullstack Developer
              </h5>
              <a href="https://www.linkedin.com/in/juan-manuel-martinez-34b315245/">
                <div className="flex items-center">
                  <img src={linkedin} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 mb-1 tracking-tight text-gray-900 dark:text-white">
                    Ir a perfil de Juan Manuel
                  </h5>
                </div>
              </a>
              <a href="https://github.com/jmanum95">
                <div className="flex items-center">
                  <img src={github} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                    Ir a repositorio
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* *-------------------------------------JUANJO---------------------------------------------------------------------------- */}
        <div className="flex items-center lg:w-2/5 h-56 opacity-100 m-2  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
          <div className=" w-36 h-36 rounded-full border-lg border-yellow-500">
            <img
              className="object-cover ml-5 w-36 h-36 shadow-md rounded-full "
              src={juanjo}
              alt=""
            />
          </div>
          <div className="flex flex-col mx-8 items-center">
            <div className="flex  flex-col justify-start">
              <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Juan José Cieri
              </h5>
              <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Fullstack Developer
              </h5>
              <a href="https://www.linkedin.com/in/juan-jos%C3%A9-cieri-8900a8234/">
                <div className="flex items-center">
                  <img src={linkedin} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 mb-1 tracking-tight text-gray-900 dark:text-white">
                    Ir a perfil de Juan José
                  </h5>
                </div>
              </a>
              <a href="https://github.com/JuanjoCieri">
                <div className="flex items-center">
                  <img src={github} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                    Ir a repositorio
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------FERRI--------------------------------------------------------------------------------- */}
      <div className="  w-11/12  lg:flex  lg:flex-col-2 justify-center items-center">
      <div className="flex items-center lg:w-2/5 h-56 opacity-100 m-2  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
          <div className=" w-36 h-36 rounded-full border-lg border-yellow-500">
            <img
              className="object-cover ml-5 w-36 h-36 shadow-md rounded-full "
              src={ferri}
              alt=""
            />
          </div>
          <div className="flex flex-col mx-8 items-center">
            <div className="flex  flex-col justify-start">
              <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Christian Gabriel Ferreiro
              </h5>
              <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Fullstack Developer
              </h5>
              <a href="https://www.linkedin.com/in/christian-gabriel-ferreiro-72b92124b/">
                <div className="flex items-center">
                  <img src={linkedin} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 mb-1 tracking-tight text-gray-900 dark:text-white">
                    Ir a perfil de Christian
                  </h5>
                </div>
              </a>
              <a href="https://github.com/FerriProg">
                <div className="flex items-center">
                  <img src={github} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                    Ir a repositorio
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* --------------------TOMI--------------------------------------------------------------------------------- */}
        <div className="flex items-center lg:w-2/5 h-56 opacity-100 m-2  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
          <div className=" w-36 h-36 rounded-full border-lg border-yellow-500">
            <img
              className="object-cover ml-5 w-36 h-36 shadow-md rounded-full "
              src={tomi}
              alt=""
            />
          </div>
          <div className="flex flex-col mx-8 items-center">
            <div className="flex  flex-col justify-start">
              <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
               Tomas Seiberl
              </h5>
              <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Fullstack Developer
              </h5>
              <a href="https://www.linkedin.com/in/tom%C3%A1s-seiberl-17152123b/">
                <div className="flex items-center">
                  <img src={linkedin} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 mb-1 tracking-tight text-gray-900 dark:text-white">
                    Ir a perfil de Tomas
                  </h5>
                </div>
              </a>
              <a href="https://github.com/Tomas000000">
                <div className="flex items-center">
                  <img src={github} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                    Ir a repositorio
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------caronte */}
      <div className=" w-11/12  lg:flex  lg:flex-col-2 justify-center items-center">
      <div className="flex items-center lg:w-2/5 h-56 opacity-100 m-2  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
          <div className=" w-36 h-36 rounded-full border-lg border-yellow-500">
            <img
              className="object-cover ml-5 w-36 h-36 shadow-md rounded-full "
              src={caronte}
              alt=""
            />
          </div>
          <div className="flex flex-col mx-8 items-center">
            <div className="flex  flex-col justify-start">
              <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Cristhian Moreno Moreno
              </h5>
              <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Fullstack Developer
              </h5>
              <a href="https://www.linkedin.com/in/cristhian-moreno-moreno-a82936247/">
                <div className="flex items-center">
                  <img src={linkedin} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 mb-1 tracking-tight text-gray-900 dark:text-white">
                    Ir a perfil de Cristhian
                  </h5>
                </div>
              </a>
              <a href="https://github.com/SrCaronte">
                <div className="flex items-center">
                  <img src={github} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                    Ir a repositorio
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* --------------------FLOR--------------------------------------------------------------------------------- */}
        <div className="flex items-center lg:w-2/5 h-56 opacity-100 m-2  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
          <div className=" w-36 h-36 rounded-full border-lg border-yellow-500">
            <img
              className="object-cover ml-5 w-36 h-36 shadow-md rounded-full "
              src={flor}
              alt=""
            />
          </div>
          <div className="flex flex-col mx-8 items-center">
            <div className="flex  flex-col justify-start">
              <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
               Florencia Re
              </h5>
              <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Fullstack Developer
              </h5>
              <a href="https://www.linkedin.com/in/florencia-re/">
                <div className="flex items-center">
                  <img src={linkedin} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 mb-1 tracking-tight text-gray-900 dark:text-white">
                    Ir a perfil de Florencia
                  </h5>
                </div>
              </a>
              <a href="https://github.com/florencia-re">
                <div className="flex items-center">
                  <img src={github} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                    Ir a repositorio
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

{/* --------------------------MANU------------------------------ */}

      <div className=" w-11/12   lg:flex  lg:flex-col-2 justify-center items-center">
        <div className="flex items-center lg:w-2/5 h-56 opacity-100 m-2  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
          <div className=" w-36 h-36 rounded-full border-lg border-yellow-500">
            <img
              className="object-cover ml-5 w-36 h-36 shadow-md rounded-full "
              src={manu}
              alt=""
            />
          </div>
          <div className="flex flex-col mx-8 items-center">
            <div className="flex  flex-col justify-start">
              <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
              Manuel Müller 
              </h5>
              <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Fullstack Developer
              </h5>
              <a href="https://www.linkedin.com/in/manuel-muller/">
                <div className="flex items-center">
                  <img src={linkedin} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 mb-1 tracking-tight text-gray-900 dark:text-white">
                    Ir a perfil de Manuel
                  </h5>
                </div>
              </a>
              <a href="https://github.com/ManuMuller">
                <div className="flex items-center">
                  <img src={github} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                    Ir a repositorio
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* --------------------LAUTARO--------------------------------------------------------------------------------- */}
        <div className="flex items-center lg:w-2/5 h-56 opacity-100 m-2  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
          <div className=" w-36 h-36 rounded-full border-lg border-yellow-500">
            <img
              className="object-cover ml-5 w-36 h-36 shadow-md rounded-full "
              src={lauta}
              alt=""
            />
          </div>
          <div className="flex flex-col mx-8 items-center">
            <div className="flex  flex-col justify-start">
              <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
            Lautaro Martin
              </h5>
              <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                Fullstack Developer
              </h5>
              <a href="https://www.linkedin.com/in/lautaro-martin-dev/">
                <div className="flex items-center">
                  <img src={linkedin} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 mb-1 tracking-tight text-gray-900 dark:text-white">
                    Ir a perfil de Lautaro
                  </h5>
                </div>
              </a>
              <a href="https://github.com/Tablonimus">
                <div className="flex items-center">
                  <img src={github} alt="" className="rounded-full w-6 h-6" />
                  <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
                    Ir a repositorio
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

       <FooterComponent /> 
    </div>
  );
}
