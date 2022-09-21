import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Donations.css";
import { useSelector } from "react-redux";
import { paymentMp } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { notificationSwal } from "../../utils/notificationSwal";
import FooterComponent from "../FooterComponent";

export default function Donation() {
  const dispatch = useDispatch();

  const id = localStorage.getItem("id");
  const user = useSelector((state) => state.userProfile);

  const [input, setInput] = useState("");
  const [generating0, setGenerating0] = useState(false);
  const [generating1, setGenerating1] = useState(false);
  const [generating2, setGenerating2] = useState(false);
  const [generating3, setGenerating3] = useState(false);
  const [disable1, setDisable1] = useState(false);
  const [disable2, setDisable2] = useState(false);
  const [disable3, setDisable3] = useState(false);

  function handleChange(e) {
    setInput({
      ...input,//22656
      [e.target.name]: e.target.value,
    });//input setea estado local
  }

  function handleClick(e) {
    e.preventDefault();
    switch (e.target.value) {
      case "100":
        setGenerating1(true);
        break;
      case "200":
        setGenerating2(true);
        break;
      case "500":
        setGenerating3(true);
        break;
      default:
        return null;
    }
    dispatch(paymentMp(user._id, e.target.value)).then((payment) => {
      const script = document.createElement("script");
      const attr_data_preference =
        document.createAttribute("data-preference-id");
      attr_data_preference.value = payment.payload.id;
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttributeNode(attr_data_preference);
      switch (e.target.value) {
        case "100":
          document.getElementById("form1").appendChild(script);
          setGenerating1(false);
          setDisable1(true);
          break;
        case "200":
          document.getElementById("form2").appendChild(script);
          setGenerating2(false);
          setDisable2(true);
          break;
        case "500":
          document.getElementById("form3").appendChild(script);
          setGenerating3(false);
          setDisable3(true);
          break;

        default:
          break;
      }
    });
  }//BOTONES DE ORDEN DE PAGO POR 200/300/500 NOSTAN

  function handleInput(e) {
    e.preventDefault();//se crea orden de pago
    if (input.name && Number(input.name) > 0) {
      setGenerating0(true);
      dispatch(paymentMp(user._id, input.name))
        .then((payment) => {
          const script = document.createElement("script");
          const attr_data_preference =
            document.createAttribute("data-preference-id");
          attr_data_preference.value = payment.payload.id;
          script.src =
            "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
          script.setAttributeNode(attr_data_preference);
          document.getElementById("form0").appendChild(script);
        })
        .then(() => {
          setGenerating0(false);
        });
    } else if (input.name && isNaN(input.name)) {
      notificationSwal(
        "¡Ooops!",
        "Sólo se permiten números",
        "error",
        "Aceptar"
      );
    } else if (!input.name) {
      notificationSwal(
        "¡Ooops!",
        "Debe ingresar el monto a donar",
        "error",
        "Aceptar"
      );
    } else {
      notificationSwal(
        "¡Ooops!",
        "El monto a donar debe ser mayor a cero",
        "error",
        "Aceptar"
      );
    }
  }

  return (
    <section id="donations" className="flex flex-col justify-between">
      <NavBar />
      <div className="flex flex-col justify-center items-center mt-24 lg:mt-56">
        <h3 className="lg:text-6xl text-3xl  italic text-gray-800 flex justify-center font-semibold lg:mb-3">
          Hola {user.first_name} {user.last_name}!
        </h3>
        <h2 className="text-center text-gray-800 lg:text-2xl font-semibold sm:text-2xl">
          Nosotros somos HappyTails !, una organización con la iniciativa de
          poder cuidar a los animales más damnificados.
          <br />
          Cualquier donación hecha es aceptada con mucho amor y será destinada a
          mejorar la calidad de vida de los animales.
        </h2>

        <div className="flex flex-col w-full max-w-md lg:m-14">
          <div className="text-center mb-3">
            <h2 className="lg:text-2xl lg:font-semibold font-bold text-gray-800">
              Podrás donar la cantidad que desees colocando el monto aquí:
            </h2>
          </div>
          <input
            type="text"
            maxLength="4"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
            placeholder="Cantidad a donar"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent mb-8"
          />
          <div>
            <div className="flex items-center mb-6 -mt-4 w-full">
              <button
                type="submit"
                className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center ml-2"
                onClick={(e) => handleInput(e)}
              >
                Generar orden de pago
              </button>
              <p className="text-xl text-gray-800 font-normal text-center">
                {generating0 ? "Generando orden..." : null}
              </p>
              <form id="form0" className="place-self-center pl-2"></form>
            </div>
            <form id="form3"></form>
          </div>
        </div>
      </div>

      <div>
        <FooterComponent />
      </div>
    </section>
  );
}
