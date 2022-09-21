import React from "react";
import { resetPassword } from "../redux/Actions/index";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { notificationSwal } from "../utils/notificationSwal.jsx";
import "./LandingPage.css"

export default function ResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, token } = useParams();

    const [input, setInput] = useState("");
    const [errors, setErrors] = useState("")

    function validate(input) {
        let errors = {};

        if (input.password) {
            if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)) {
                errors.password =
                    "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula y una mayúscula (No puede tener otros simbolos)";
            } else errors.password = "";
        } else errors.password = "La contraseña es necesaria!";

        if (input.passwordRepeat) {
            if (
                !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
                    input.passwordRepeat
                )
            ) {
                errors.passwordRepeat =
                    "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula y una mayúscula (No puede tener otros simbolos)";
            } else if (input.password && input.password !== input.passwordRepeat) {
                errors.passwordRepeat = "Las contraseñas no coinciden";
            } else errors.passwordRepeat = "";
        } else errors.passwordRepeat = "La contraseña es necesaria";
        return errors;
    }

    function have() {
        if (
            errors.password !== "" ||
            errors.passwordRepeat !== ""
        ) {
            return true
        } else if (input.password &&
            input.passwordRepeat) {
            return false
        } else {
            return "e"
        }
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (have() === false) {
            dispatch(resetPassword({
                password: input.password,
                id,
                auth: token
            }))
            setInput({
                password: "",
                passwordRepeat: ""
            })
            notificationSwal(
                "¡Enhorabuena!",
                "Usuario creado con éxito",
                "success",
                "Ok"
            );
            navigate("/", { replace: true });
        } else if (have() === "e") {
            notificationSwal(
                "¡Faltan datos!",
                "Complete todos los campos obligatorios",
                "error",
                "Aceptar"
            );
        } else
            notificationSwal(
                "Faltan datos, por favor verifique y vuelva a intentarlo",
                "Complete todos los campos obligatorios",
                "error",
                "Aceptar"
            );
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
                            Nueva Contraseña
                        </div>
                        <div className="mt-8">
                            <form>
                                <div className="flex flex-col mb-2">
                                    <div className="flex flex-col">
                                        <div className="flex relative">
                                            <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
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
                                                name="password"
                                                value={input.password}
                                                onChange={(e) => handleChange(e)}
                                                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                                                placeholder="Complete su contraseña"
                                                required
                                            />
                                        </div>
                                        <div className="flex">
                                            {errors.password && (
                                                <p className="font-bold text-red-700 text-center p-2">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col mb-6">
                                    <div className="flex flex-col">
                                        <div className="flex relative">
                                            <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
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
                                                name="passwordRepeat"
                                                value={input.passwordRepeat}
                                                onChange={(e) => handleChange(e)}
                                                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                                                placeholder="Confirmar contraseña"
                                                required
                                            />
                                        </div>
                                        <div className="flex">
                                            {errors.passwordRepeat && (
                                                <p className="w-full font-bold text-red-700 text-center p-2">
                                                    {errors.passwordRepeat}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center mb-6 -mt-4 w-full">
                                        <button
                                            onClick={(e) => handleSubmit(e)}
                                            className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                            type="submit"
                                        >
                                            Enviar
                                        </button>
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
