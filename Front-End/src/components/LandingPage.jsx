import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/Actions/index";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { userLoginGoogle } from "../redux/Actions/index";
import Swal from "sweetalert2";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin(input)).then((e) => {
      if(e.payload === "Contraseña incorrecta"){
        Swal.fire({
          icon:"error",
          text:"Contraseña incorrecta"
        })
        .then(()=> navigate("/"))
      }
      if(e.payload === "Usuario baneado"){
        Swal.fire({
          icon:"warning",
          text:"Usuario baneado"
        })
        .then(()=> navigate("/"))
      }
      if (e.payload === "Usuario no encontrado"){
        Swal.fire({
          icon:"error",
          text:"Usuario no encontrado"
        })
        .then(()=> navigate("/"))
      }
      navigate("/blog");
    });
  }

  const clientId =
    "1066896459343-34h3crloulb8su22sfl5l4ep4pqv2bud.apps.googleusercontent.com";

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  });

  const responseGoogle = (response) => {
    dispatch(userLoginGoogle(response)).then((e) => {
      if(e.payload === "Usuario baneado"){
        Swal.fire({
          icon:"warning",
          text:"Cuenta suspendida momentaneamente"
        })
        .then(()=> navigate("/"))
      }
       else {
        navigate("/blog");
      }
    });
  };

  return (
    <div id="landing" className="lg:flex lg:w-screen">

      <div className="lg:flex lg:flex-col-4 w-screen lg:mx-10 lg:items-center flex flex-col-2 flex-wrap justify-center">
        <div className="text-gray-800 lg:flex gap-14 lg:flex-row lg:items-center flex flex-col justify-center items-center">
          <div className="mt-6 mx-4 text-center lg:text-start">
            <div>
              <h1 className="text-6xl font-semibold">Bienvenidos a </h1>
              <p className="text-6xl font-normal italic">'Happy Tails'</p>
            </div>
            <div>
              <p className="self-center text-xl font-light text-gray-600 mt-4 sm:text-2xl">
                Somos una organización sin fines de lucro con el objetivo de
                encontrar un hogar feliz para nuestros amigos de 4 patas...
              </p>
            </div>
          </div>
          <div className="flex py-6 flex-col w-full max-w-md bg-amber-600 rounded-lg items-center shadow sm:px-6 md:px-8 lg:px-10">
            <div className="self-center text-xl font-light sm:text-2xl text-white">
              Ingrese a su cuenta
            </div>
            <div className="mt-8">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-2">
                  <div className="flex relative">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <svg
                        width="15"
                        height="15"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="email"
                      value={input.email}
                      onChange={(e) => handleChange(e)}
                      id="sign-in-email"
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                      placeholder="Complete su email"
                      required
                    />
                  </div>
             
                </div>
                <div className="flex flex-col mb-6">
                  <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      <svg
                        width="15"
                        height="15"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                      </svg>
                    </span>
                    <input
                      type="password"
                      id="sign-in-password"
                      name="password"
                      value={input.password}
                      onChange={(e) => handleChange(e)}
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                      placeholder="Complete su contraseña"
                      required
                    />
                  </div>
             
                </div>
                <div className="flex items-center mb-6 -mt-4">
                  <div className="flex ml-auto">
                     <Link to="/forgotpassword">
                    <span
                      className="inline-flex text-s font-thin text-white sm:text-sm  hover:text-yellow-900 "
                    >
                      ¿Has olvidado tu contraseña? Ingresa aquí.
                    </span>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-6 -mt-4 w-full">
                    <button
                      className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                      type="submit"
                    >
                      Ingresar
                    </button>
                  </div>
                  <GoogleLogin
                    clientId={clientId}
                    render={(renderProps) => (
                      <button
                        type="button"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="text-white text-center items-center justify-center w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex self-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                      >
                        <svg
                          className="mr-2 -ml-1 w-4 h-4"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="google"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 488 512"
                        >
                          <path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                          ></path>
                        </svg>
                        Ingresa con tu cuenta de Google
                      </button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />{" "}
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center mt-6">
              <Link
                to="/register"
                className="inline-flex items-center text-s font-thin text-center text-white hover:text-yellow-900 "
              >
                <span className="ml-2">
                  ¿No tiene una cuenta? Ingrese aquí.
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
