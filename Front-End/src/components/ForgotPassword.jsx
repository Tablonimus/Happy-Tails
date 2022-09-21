import React from "react";
import { forgotPassword, getAllUsers } from "../redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { notificationSwal } from "../utils/notificationSwal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState("");

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const users = useSelector((state) => state.users);

    function handleChangePass(e) {
        setInput(e.target.value)
    }

    function handleSubmitPass(e) {
        e.preventDefault();
        if (users.find((u) => u.email === input)) {
            dispatch(forgotPassword({ email: input })).then(
                notificationSwal(
                    "Correo enviado",
                    "Revise su casilla de correo electronico",
                    "success",
                    "OK"
                ))
            navigate("/", { replace: true })
        } else {
            Swal.fire({
                icon: "error",
                text: "Ese correo no se encunentra registrado"
            })
            navigate("/", { replace: true })
        }
    }

    return (
        <>
            <div id="landing" className="lg:flex lg:flex-wrap w-screen lg:items-center flex flex-col-2 flex-wrap justify-center">
                <div className="text-gray-800 lg:flex lg:flex-wrap gap-14 lg:flex-col lg:items-center flex flex-col justify-center items-center">
                    <div className="mt-6 mx-4 text-center lg:text-start">
                        <div>
                            <h3 className="flex text-4xl font-semibold text-center">Restablece tu contraseña</h3>
                            <p className="text-2xl text-center font-normal italic">Happy Tails</p>
                        </div>
                    </div>

                    <div className="flex flex-col py-6 w-full max-w-md bg-amber-600 rounded-lg items-center shadow sm:px-6 md:px-8 lg:px-10">
                        <div className="self-center text-xl font-light sm:text-2xl text-white">
                            Ingresa tu Email
                        </div>
                        <div className="mt-8">
                            <form>
                                <div className="flex flex-col mb-2">
                                    <div className="flex flex-col">
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
                                                onChange={(e) => handleChangePass(e)}
                                                id="sign-in-email"
                                                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                                                placeholder="Complete su email"
                                                required
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center mt-1 w-full">
                                        <button
                                            onClick={(e) => handleSubmitPass(e)}
                                            className="mt-2 py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                            type="submit"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                    <div className="flex items-center mb-6 w-full">
                                        <Link to="/" className="mt-2 py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                        
                                            Regresar
                                        
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

