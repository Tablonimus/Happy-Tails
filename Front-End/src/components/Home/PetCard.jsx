import React from "react";
import likeim from "../../assets/images/like.png";
import share from "../../assets/images/share.png";
import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchLikes, likePet } from "../../redux/Actions";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Toast, Tooltip, Dropdown } from "flowbite-react";
import { ToastContext } from "flowbite-react/lib/esm/components/Toast/ToastContext";
import { Card } from "flowbite-react";

export default function PetCard({
  idUser,
  first_name,
  last_name,
  imageUser,
  idPet,
  namePet,
  imagePet,
  place,
  size,
  gender,
  likes,
  description,
}) {
  //likes***----de aca
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);
  const allUsers = useSelector((state) => state.allUsers);
  const [buttonLike, setButtonLike] = useState({
    a: false,
    number: likes?.length,
  });
  function likeHandler(e) {
    e.preventDefault();

    let payload = {
      petId: idPet, //el likeado
      userId: loggedUser._id, //el que da like
      ownerId: idUser, //al que le llega el like
      // likesPets: likesPets, //array DESCOMMENTE SI SE ROMPE NOtIFICACION .jajajaj
    };
    if (buttonLike.a === false) {
      setButtonLike({ a: true, number: buttonLike.number + 1 });
    }
    if (buttonLike.a === true) {
      setButtonLike({ a: false, number: buttonLike.number - 1 });
    }
    let nameLike = {
      id: idPet,
      likeName: loggedUser.username,
    };

    dispatch(patchLikes(payload));

    dispatch(likePet(nameLike));
  }

  //hover quien te gusta ------ POSIBLE FALLO DE RENDIMIENTO-

  //likes--hasta aca , casi te vas
  return (
    <div class="flex flex-col-3 justify-between w-11/12 lg:w-3/6 h-56 lg:h-96  opacity-100 mt-2 mb-2 lg:mb-2 bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
      <img
        className="object-cover w-1/2 h-50 rounded-lg rounded-t-lg lg:h-auto lg:rounded-none lg:rounded-l-lg"
        src={imagePet}
        alt=""
      />
      <div className="flex w-1/2 justify-center">
        <Link to={`/pet/${idPet}`}>
          <div className="flex  flex-col h-40 justify-center">
            <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
              {namePet?.length > 15 ? `${namePet.slice(0, 15)}...` : namePet}
            </h5>
            <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
              {place?.length > 40 ? `${place.slice(0, 40)}...` : place}
            </h5>
            <div className="flex">
              <span className="font-normal ml-2  text-sm text-gray-700 dark:text-gray-400">
                {`Género: `}
              </span>
              {gender === "female" ? (
                <img src={female} alt="Female" className="w-6 h-6 " />
              ) : (
                <img src={male} alt="Male" className="w-6 h-6 " />
              )}
            </div>

            <span className="font-normal ml-2 text-sm text-gray-700 dark:text-gray-400">
              {description?.length > 40
                ? `${description.slice(0, 40)}...`
                : description}
            </span>
          </div>
          <div className="flex justify-center lg:mt-24 overflow-hidden">
            <Tooltip
              trigger="hover"
              animation="duration-1000"
              content={
                likes?.length > 1
                  ? likes?.length === 2
                    ? `A ${likes[0]} y ${likes[1]} les gusta esto...`
                    : `A   ${likes.slice(0, 2).reverse()} y ${
                        likes.length - 2
                      } mas les gusta esto...`
                  : likes?.length === 1
                  ? `A ${likes[0]} le gusta esto`
                  : "Me gusta"
              }
              placement="bottom"
            >
              <button
                className=" flex items-center justify-center w-14 h-14"
                onClick={(e) => likeHandler(e)}
              >
                <img
                  src={likeim}
                  alt="<3"
                  className="absolute h-14 lg:h-32 rounded-full shadow-lg"
                />
                <h1 className="relative flex justify-center items-center text-xl  text-black font-bold  mt-2 lg:text-2xl lg:mt-4 ">
                  {buttonLike.number}
                </h1>
              </button>
            </Tooltip>
          </div>
        </Link>
      </div>
      <Tooltip content="Compartir" trigger="hover" animation="duration-1000">
        <div className="flex flex-col justify-between h-10 w-10 m-1 lg:m-4">
          <Dropdown
            arrowIcon={false}
            inline={true}
            floatingArrow={false}
            label={
              <img
                src={share}
                className="w-6 h-6 lg:w-10 lg:h-10 lg:t-4 flex justify-end"
                alt="Share"
              />
            }
          >
            <Dropdown.Item>
              <div className="flex justify-center ">
                <Tooltip content="Compartir en Facebook" placement="top">
                  <div className="rounded-full  flex items-center justify-center overflow-hidden ">
                    <FacebookShareButton
                      url={`https://happytails.vercel.app/pet/${idPet}`}
                      quote={"Adopta esta mascota"}
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
                      subject="Quiero que me adoptes"
                      body={`Adoptame en https://happytails.vercel.app/pet/${idPet}`}
                    >
                      <EmailIcon size={40} />
                    </EmailShareButton>
                  </div>
                </Tooltip>
              </div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Tooltip>
    </div>
  );
}
