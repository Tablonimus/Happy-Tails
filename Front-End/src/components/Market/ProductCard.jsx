import React from "react";
import { Toast, Tooltip, Dropdown } from "flowbite-react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { useDispatch, useSelector } from "react-redux";
import share from "../../assets/images/share.png";
import cartmas from "../../assets/images/cartmas.png";
import donator from "../../assets/images/donator.png";
import { Link } from "react-router-dom";
import cart from "../../assets/images/shopping-cart.png";
import { paymentMerp, addCar } from "../../redux/Actions";

export default function ProductCard({
  id,
  name,
  price,
  image,
  stock,
  quantity,
}) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail);
  const carrr = useSelector((state) => state.carrito);

  function handleCar(e) {
    dispatch(
      addCar({
        product: {
          _id: id,
          name: name,
          price: price,
          image: image,
          stock: stock,
        },
        quantity: 1,
      })
    );
    localStorage.setItem("carrito", JSON.stringify(carrr));
  }

  return (
    <div class="flex flex-col-3 justify-between w-11/12 lg:w-3/6 h-56 lg:h-96 opacity-100 mt-2 mb-2 lg:mb-2 bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
      <img
        className="object-cover w-1/2 h-50 rounded-lg rounded-t-lg lg:h-auto lg:rounded-none lg:rounded-l-lg"
        src={image}
        alt=""
      />
      <div className="flex flex-col justify-center">
        <Link to={`/market/product/${id}`}>
          <div className="flex  flex-col">
            <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <h5 class=" font-semibold text-lg lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
              $ {price}
            </h5>
          </div>
        </Link>
        {/* info */}
        <div className=" flex items-center ml-2 w-50 lg:mt-10 h-56 lg:w-56 lg:h-56 justify-center">
          <span className="font-semibold flex ml-2 text-sm lg:text-xl text-gnormalray-700 dark:text-gray-400">
            <h5>
              {stock > 1
                ? "Quedan " + stock + " unidades disponibles!"
                : stock <= 0
                ? "Sin unidades disponibles"
                : "Queda solo " + stock + " unidad disponible!"}
            </h5>
            {/* <img src={donator} className="ml-1 h-6 w-6" alt="" /> */}
          </span>
          {/* <span className="font-semibold flex ml-2 text-sm lg:text-xl text-gnormalray-700 dark:text-gray-400">
              <h5>Dona</h5>
              <img src={donator} className="ml-1 h-6 w-6" alt="" />
            </span> */}
        </div>

        {/* imagencarrusel */}
      </div>
      <div className="flex flex-col justify-between items-center h-10 w-20 m-1  lg:mt-5">
        <Tooltip
          content="Compartir"
          trigger="hover"
          placement="top"
          animation="duration-1000"
        >
          <Dropdown
            arrowIcon={false}
            inline={true}
            floatingArrow={false}
            label={
              <img
                src={share}
                className="w-6 h-6 ml-3 lg:ml-10 lg:w-10 lg:h-10 lg:t-4 flex justify-end"
                alt="Share"
              />
            }
          >
            <Dropdown.Item>
              <div className="flex justify-center ">
                <Tooltip content="Compartir en Facebook" placement="top">
                  <div className="rounded-full  flex items-center justify-center overflow-hidden ">
                    <FacebookShareButton
                      url={`https://happytails.vercel.app/market/product/${id}`}
                      quote={"Con esta compra podes ayudar mucho"}
                      hashtag={"#AdopcionResponsable"}
                    >
                      <FacebookIcon size={40} />
                    </FacebookShareButton>
                  </div>
                </Tooltip>
              </div>
            </Dropdown.Item>

            <Dropdown.Item>
              <div className="flex justify-center">
                <Tooltip content="Compartir por e-mail" placement="top">
                  <div className="rounded-full  flex items-center justify-center overflow-hidden">
                    <EmailShareButton
                      subject="Mis mascotas"
                      body={`Mira mis mascotas en https://happytails.vercel.app/market/product/${id}`}
                    >
                      <EmailIcon size={40} />
                    </EmailShareButton>
                  </div>
                </Tooltip>
              </div>
            </Dropdown.Item>
          </Dropdown>
        </Tooltip>
        <Tooltip
          content="Agregar al carrito"
          trigger="hover"
          placement="bottom"
          animation="duration-1000"
        >
          <button
            onClick={(e) => handleCar(e)}
            className="flex justify-end ml-3 lg:ml-10 mt-40 lg:mt-64"
          >
            <img
              src={cartmas}
              alt=""
              className="lg:w-14 h-6 lg:w-10 lg:h-10 lg:t-4 flex justify-end"
            />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
