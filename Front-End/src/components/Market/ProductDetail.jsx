import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { notificationSwal } from "../../utils/notificationSwal";
import cartmas from "../../assets/images/cartmas.png";
import { getProductDetail, resetProductDetails } from "../../redux/Actions";

import NavBar from "../NavBar/NavBar";
import { paymentMerp, addCar } from "../../redux/Actions";
import FooterComponent from "../FooterComponent";
export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetProductDetails());
    dispatch(getProductDetail(id));
  }, [dispatch]);

  const product = useSelector((state) => state.productDetail);

  const carrr = useSelector((state) => state.carrito);

  //PARTE DE PAGO---------------------
  const user = useSelector((state) => state.userProfile);
  const [input, setInput] = useState(1);
  const [generating0, setGenerating0] = useState(false);
  const [carrito, setCarrito] = useState({});

  function handleAmmount(e) {
    console.log("click");
    console.log(e.target.value, "input value");
    setInput(e.target.value);
    //input setea estado local
  }

  const pro = [];

  function handleCar(e) {
    dispatch(addCar({ product: product, quantity: input }));
    localStorage.setItem("carrito", JSON.stringify(carrr));
  }

  const que = localStorage.getItem("carrito");

  console.log(que, "asd");

  function handleInput(e) {
    e.preventDefault(); //se crea orden de pago
    // setInput({
    //   price: product?.price,
    // });
    if (product?.price && Number(product?.price) > 0) {
      setGenerating0(true);
      dispatch(paymentMerp(user._id, product._id, input))
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
    } else if (product?.price && isNaN(product?.price)) {
      notificationSwal(
        "¡Ooops!",
        "Sólo se permite pagar con números",
        "error",
        "Aceptar"
      );
    } else if (!product.price) {
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
  //----------------------------------
  return Object.keys(product).length ? (
    <section className="flex flex-col h-screen items-center justify-between">
      <NavBar />
      <div className="m-32 flex flex-col lg:flex lg:flex-row w-full lg:w-2/3 h-full lg:h-96 bg-yellow-800 rounded-lg ring-2 ring-yellow-600">
        <div className="w-full lg:w-2/3 flex flex-col items-center lg:flex lg:flex-row">
          <div className="w-1/2 flex justify-center items-center">
            <img src={product?.image} alt="" className="object-cover" />
          </div>
          <div className="w-1/2 h-full gap-6 lg:gap-0 flex flex-col items-center justify-around">
            <h1 className="font-semibold text-white text-2xl">
              {product?.name}
            </h1>
            <h1 className="font-semibold text-white text-2xl">
              $ {product?.price}
            </h1>
            <h2 className="font-semibold text-white">{product?.description}</h2>
            <h3 className="font-semibold text-gray-400">
            {product?.stock > 1
                ? "Quedan " + product?.stock + " unidades disponibles!"
                : product?.stock <= 0
                ? "Sin unidades disponibles"
                : "Queda solo " + product?.stock + " unidad disponible!"}
            </h3>
          </div>
        </div>
        <div className="w-full lg:w-1/3 border-l mt-10 lg:mt-0 border-yellow-400 flex flex-col items-center justify-around gap-10 lg:gap-0">
          <h3 className="font-semibold text-white">En {product?.place}</h3>
          <h2 className="font-semibold text-white">
            Vendedor: {product?.user[0]?.first_name}{" "}
            {product?.user[0]?.last_name}
          </h2>

          <div className="flex items-center mb-6 -mt-4 w-full">
            <input
              onChange={(e) => handleAmmount(e)}
              type="number"
              placeholder="Cantidad"
              min="1"
              max={product?.stock}
              className="py-2 w-56 px-4 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white transition ease-in duration-200 text-center text-black font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            />
          <button
            type="submit"
            className="py-2 px-4 w-full bg-yellow-900 hover:bg-green-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center ml-2"
            onClick={(e) => handleInput(e)}
          >
            Comprar
          </button>
          <p className="text-xl text-gray-800 font-normal text-center">
            {generating0 ? "Generando orden..." : null}
          </p>
          <form id="form0" className="place-self-center pl-2"></form>
          </div>
            <button
              onClick={(e) => handleCar(e)}
              className="py-2 w-full justify-center items-center flex px-4 bg-yellow-600 hover:bg-yellow-500 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Añadir al carrito{" "}
              <img
                src={cartmas}
                alt=""
                className="lg:w-14 h-6 lg:w-10 lg:h-10 lg:t-4 flex justify-end"
              />
            </button>
        </div>
      </div>
        <Link to={"/market"}>
          <button
            type="submit"
            className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-500 focus:ring-yellow-500 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center mb-4"
          >
            Volver atras
          </button>
        </Link>
      <FooterComponent />
    </section>
  ) : (
    <></>
  );
}
