import React from "react";
import NavBar from "../NavBar/NavBar";
import ProductCart from "./ProductCart";
import { Tooltip } from "flowbite-react";
import { useState } from "react";
import { notificationSwal } from "../../utils/notificationSwal";
import { useDispatch, useSelector } from "react-redux";
import { delProductCart, paymentCart } from "../../redux/Actions";
import FooterComponent from "../FooterComponent";
import cartout from "../../assets/images/cartout.png";
import { Link } from "react-router-dom";
export default function MarketCart() {
  const dispatch = useDispatch();

  const products = localStorage.getItem("carrito");

  const pro = JSON.parse(products);

  const carrr = useSelector((state) => state.carrito);

  const user = useSelector((state) => state.userProfile);
  const idBuyer = user._id;
  const [generating0, setGenerating0] = useState(false);

  function handleDelCart(e) {
    localStorage.removeItem("carrito");
  }

  function handleDeleteItem(d) {
    dispatch(delProductCart(d));
    localStorage.setItem("carrito", JSON.stringify(carrr));
  }

  const prueba = localStorage.getItem("carrito");

  const prueba2 = JSON.parse(prueba);

  function handleInput(e) {
    e.preventDefault(); //se crea orden de pago
    // setInput({
    //   price: product?.price,
    // });
    if (pro.length > 0) {
      setGenerating0(true);
      dispatch(paymentCart(idBuyer, pro))
        .then((payment) => {
          console.log(payment, "PAYMENT");
          const script = document.createElement("script");
          const attr_data_preference =
            document.createAttribute("data-preference-id");
          attr_data_preference.value = payment.payload.id; //que carajo eseste payload
          script.src =
            "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
          script.setAttributeNode(attr_data_preference);
          document.getElementById("form0").appendChild(script);
        })
        .then(() => {
          setGenerating0(false);
        });
    } else if (pro?.length) {
      notificationSwal(
        "¡Ooops!",
        "Sólo se permite pagar con números",
        "error",
        "Aceptar"
      );
    } else if (!pro?.length) {
      notificationSwal(
        "¡Ooops!",
        "Debe ingresar el monto a pagar",
        "error",
        "Aceptar"
      );
    } else {
      notificationSwal(
        "¡Ooops!",
        "El monto a pagar debe ser mayor a cero",
        "error",
        "Aceptar"
      );
    }
  }

  return (
    <div className="flex flex-col h-full items-center justify-between">
      <NavBar />
      <section className="w-full h-full flex flex-col items-center">
        <div className="pt-24 flex flex-col justify-center items-center gap-10">
          <div>
            <h1 className="lg:text-6xl text-3xl  italic text-gray-800 flex justify-center items-center font-semibold lg:mb-3">
              Carrito de Compras
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center w-screen">
            {prueba2?.map((d) => (
              <div className="flex flex-row justify-center items-center w-screen">
                <ProductCart
                  key={d.key}
                  name={d.product.name}
                  image={d.product.image}
                  price={d.product.price}
                  stock={d.product.stock}
                  quantity={d.quantity}
                />
                <Tooltip
                  content="Quitar "
                  trigger="hover"
                  placement="top"
                  animation="duration-1000"
                >
                  <button
                    key={d.key}
                    onClick={() => handleDeleteItem(d)}
                    className="bg-blue"
                  >
                    <img src={cartout} alt="" className=" lg:w-14 h-10  " />
                  </button>
                </Tooltip>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center mb-6 -mt-4 ">
              <button
                type="submit"
                className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center"
                onClick={(e) => handleInput(e)}
              >
                Comprar
              </button>
              <span className="text-xl text-gray-800 font-normal text-center">
                {generating0 ? "Generando orden..." : null}
              </span>
              <form id="form0" className="place-self-center pl-2"></form>
            </div>
            <button
              type="submit"
              className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center mb-4"
              onClick={(e) => handleDelCart(e)}
            >
              Vaciar carrito
            </button>
            <Link to={"/market"}>
            <button
              type="submit"
              className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center mb-4"
             
            >
              Volver atras
            </button>
            </Link>
          </div>
        </div>
      </section>
      <FooterComponent />
    </div>
  );
}
