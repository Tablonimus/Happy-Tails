import React from "react";
import { Toast, Tooltip, Dropdown } from "flowbite-react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import share from "../../assets/images/share.png";
import cartout from "../../assets/images/cartout.png";
import donator from "../../assets/images/donator.png";
import { delProductCart, paymentCart } from "../../redux/Actions";
import { Link } from "react-router-dom";
import cart from "../../assets/images/shopping-cart.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function ProductCart({
  key,
  id,
  name,
  price,
  image,
  stock,
  quantity,
}) {
  const dispatch = useDispatch();
  const carrr = useSelector((state) => state.carrito);

  const d = { key: key }; //inservivble
  function handleDeleteItem(d) {
    dispatch(delProductCart(d));
    localStorage.setItem("carrito", JSON.stringify(carrr));
  }

  const prueba = localStorage.getItem("carrito");

  const prueba2 = JSON.parse(prueba);

  return (
    <div class="flex flex-col-3  justify-between w-11/12 lg:w-3/6 h-56 lg:h-96 opacity-100 mt-2 mb-2 lg:mb-2 bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
      <img
        className="object-cover w-1/2 h-50 rounded-lg rounded-t-lg lg:h-auto lg:rounded-none lg:rounded-l-lg"
        src={image}
        alt=""
      />
      <div className="flex flex-col justify-center">
        <Link to={`/market/product/${id}`}>
          <div className="flex  flex-col">
            <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
              {name} x {quantity} u.
            </h5>
            <h5 class="mt-5 font-semibold text-lg lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
              $ {price} x unidad
            </h5>
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-between h-10 w-20 m-1  lg:m-4">
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
      </div>
    </div>
  );
}
