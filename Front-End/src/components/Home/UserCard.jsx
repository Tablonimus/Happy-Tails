import ubicacion from "../../assets/images/ubicacion.png";
import { Link, useNavigate } from "react-router-dom";
// import blackpaw from "../../assets/images/blackpaw.png";
// import diamantepaw from "../../assets/images/diamantepaw.png";
// import goldenpaw from "../../assets/images/goldenpaw.png";
import chatt from "../../assets/images/chatt.png";
import share from "../../assets/images/share.png";
import donator from "../../assets/images/donator.png";
import { React } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Dropdown, Tooltip, Carousel } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { chatWithUser } from "../../redux/Actions";

export default function UserCard({
  _id,
  first_name,
  last_name,
  username,
  image,
  email,
  about,
  telephone,
  pets,
  place,
  donations,
  interestedUsers,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.userProfile);
  const pettit = pets;
  function chat() {
    dispatch(chatWithUser({ senderId: loggedUser._id, receiverId: _id })).then(
      (e) => {
        navigate("/chat");
      }
    );
  }

  return (
    <div class="flex flex-col-3 justify-between w-11/12 lg:w-3/6 h-56 lg:h-96 opacity-100 mt-2 mb-2 lg:mb-2 bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
      <img
        className="object-cover w-1/2 h-50 rounded-lg rounded-t-lg lg:h-auto lg:rounded-none lg:rounded-l-lg"
        src={image}
        alt=""
      />
      <div className="flex flex-col justify-center">
        <Link to={`/users/${_id}`}>
          <div className="flex  flex-col">
            <h5 class=" font-bold text-xl lg:text-2xl ml-2 tracking-tight text-gray-900 dark:text-white">
              {" "}
              {username?.length > 15 ? `${username.slice(0, 10)}...` : username}
            </h5>
            <h5 class=" font-semibold text-sm lg:text-xl ml-2 tracking-tight text-gray-900 dark:text-white">
              {place?.length > 20 ? `${place.slice(0, 20)}...` : place}
            </h5>
            {donations?.length > 0 ? (
              <span className="font-bold flex ml-2 text-sm lg:text-xl text-gnormalray-700 dark:text-gray-400">
                <h5>Donador activo</h5>
                <img src={donator} className="ml-1 h-6 w-6" alt="" />
              </span>
            ) : (
              false
            )}
          </div>
        </Link>
        {/* info */}
        <div className=" flex items-center ml-2 w-50 lg:mt-10 h-56 lg:w-56 lg:h-56 justify-center">
          {pettit?.length === 1 ? (
            <img
              className=" h-24 w-24 lg:h-56 lg:w-56 rounded-full shadow-lg"
              src={pettit[0].image}
              alt="ProfilePicture"
            />
          ) : pettit?.length > 1 ? (
            <Carousel indicators={false} leftControl=" " rightControl=" ">
              {pettit?.map((pet) => (
                <img
                  key={pet._id}
                  className="w-24 h-24 lg:h-56 lg:w-56   rounded-full shadow-lg"
                  src={pet.image}
                  alt="ProfilePicture"
                />
              ))}
            </Carousel>
          ) : (
            false
          )}
        </div>

        {/* imagencarrusel */}
      </div>
      <div className="flex flex-col justify-between h-10 w-10 m-1 lg:m-4">
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
                      url={`https://happytails.vercel.app/users/${_id}`}
                      quote={"Mis mascotas"}
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
                      body={`Mira mis mascotas en https://happytails.vercel.app/users/${_id}`}
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
          content="Chatear"
          trigger="hover"
          placement="bottom"
          animation="duration-1000"
        >
          <button
            onClick={() => chat()}
            className="flex justify-end m-1 mt-40 lg:mt-64"
          >
            <img
              src={chatt}
              alt=""
              className="w-6 h-6 lg:w-10 lg:h-10 lg:t-4 flex justify-end"
            />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
