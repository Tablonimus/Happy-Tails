import React, { useLayoutEffect, useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, postImage } from "../../redux/Actions/index.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { notificationSwal } from "../../utils/notificationSwal.jsx";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import mapboxgl from "mapbox-gl";
import NavBar from "../NavBar/NavBar.jsx";

export default function RegisterPet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState([]);
//   const [imagePool, setImagePool] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
//   const [loadingImagePool, setLoadingImagePool] = useState(false);
  const [placeSelect, setPlaceSelect] = useState(false);

  const mapDiv = useRef(null);

  const [input, setInput] = useState({
    id: id,
    name: "",
    price: "",
    image: [],
    stock: 1,
    description: "",
    place: "",
    category: "",
    type: "",
    place_longitude: "",
    place_latitude: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

//   async function handleImage(e) {
//     const files = e.target.files;
//     const data = new FormData();
//     data.append("file", files[0]);
//     data.append("upload_preset", "pretty");
//     data.append("folder", "Images");
//     setLoadingImage(true);
//     dispatch(postImage(data)).then((e) => {
//       setImage(e.payload);
//       setInput({
//         ...input,
//         image: e.payload,
//       });
//       setErrors(
//         validate({
//           ...input,
//           image: e.payload,
//         })
//       );
//       setLoadingImage(false);
//     });
//   }

  async function handleImagePool(e) {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "pretty");
    data.append("folder", "Images");
    setLoadingImage(true);
    dispatch(postImage(data)).then((e) => {
      setImage(e.payload);
      setInput({
        ...input,
        image: [...input.image, e.payload],
      });
      setErrors(
        validate({
          ...input,
          image: [...input.image, e.payload],
        })
      );
      setLoadingImage(false);
    });
  }

  function validate(input) {
    let errors = {};
    var regex = new RegExp("^[0-9]+$");

    if (!input.id) errors.id = "El id es requerido!";

    if (input.name) {
      if (!/^[a-zA-Z\s]+$/.test(input.name)) {
        errors.name = "El nombre sólo puede tener letras!";
      } else if (input.name.length > 20) {
        errors.name = "El nombre no puede tener más de 20 caracteres!";
      }
    } else errors.name = "El nombre es requerido!";

    if (input.price) {
      if (!regex.test(input.price)) {
        errors.price = "Solo números!"
      } else if (input.price < 0) {
        errors.price = "El precio no puede ser negativo!"
      }
    } else errors.price = "El precio es requerido"

    if (input.stock) {
      if (!regex.test(input.stock)) {
        errors.stock = "Solo números!"
      } else if (input.stock < 1) {
        errors.stock = "El precio no puede ser negativo!"
      } else if (input.stock > 10000) {
        errors.stock = "El stock no puede ser mayor a 10.000!"
      }
    } else errors.price = "El stock es requerido"

    if (!input.image) errors.image = "La imagen es requerida!";

    // if (!input.price) errors.pricec = "El precio es requerido!";

    if (!input.type) errors.type = "El tipo de producto es requerido!";

    if (!input.category) errors.category = "La categoria es requerida!";
    
    return errors;
  }

  const have = () => {
    if (
      errors.id ||
      errors.name ||
      errors.price ||
      errors.image ||
      errors.type ||
      errors.category ||
      errors.place
    ) {
      return true;
    } else if (
      input.id &&
      input.name &&
      input.price &&
      input.image &&
      input.type &&
      input.category &&
      input.place
    ) {
      return false;
    } else {
      return "e";
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (have() === false) {
      Swal.fire({
        title: "¿Está seguro de que desea crear este producto??",
        text: "Este producto se publicará",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.isConfirmed) {
          let id = input.id;
          delete input.id;
          dispatch(createProduct(id, input)).then((e) => {
            if (e === "Producto creado correctamente") {
              notificationSwal(
                "¡Enhorabuena!",
                "Producto creado con éxito",
                "success",
                "Ok"
              );
              navigate("/home");
            } else {
              notificationSwal(
                "¡Ooops!",
                "No se pudo crear el producto, intente mas tarde",
                "error",
                "Aceptar"
              );
            }
          });
        } else {
          notificationSwal(
            "Operación cancelada",
            "Producto no creado",
            "error",
            "Aceptar"
          )
        }
      }).then(() => {
        navigate("/home")
      });

      setInput({
        id: "",
        name: "",
        price: "",
        image: [],
        type: "",
        description: "",
        category: "",
        place: "",
        place_longitude: "",
        place_latitude: "",
      });
      setImage([]);
    } else if (have() === "e") {
      notificationSwal(
        "¡Faltan datos!",
        "Complete todos los campos obligatorios",
        "error",
        "Aceptar"
      );
    } else
      notificationSwal(
        "¡Hay errores!",
        "Corríjalos por favor",
        "error",
        "Aceptar"
      );
  }

  function handleDelete(event) {
    setInput({
      ...input,
      image: input.image.filter((e) => e !== event),
    });
    setErrors(
      validate({
        ...input,
        image: input.image.filter((e) => e !== event),
      })
    );
  }

  let key = 0;
  function addKey() {
    return key++;
  }

  function _suggestionSelect(result, lat, long) {
    setInput({
      ...input,
      place: result,
      place_longitude: long,
      place_latitude: lat,
    });
    setPlaceSelect(true);
    createNewMap(long, lat);
  }
  const mapAccess = {
    mapboxApiAccessToken:
      "pk.eyJ1Ijoiam9uc2VuIiwiYSI6IkR6UU9oMDQifQ.dymRIgqv-UV6oz0-HCFx1w",
  };

  useLayoutEffect(() => {
    //if (placeSelect)
    createNewMap(input.place_longitude, input.place_latitude);
  }, [placeSelect]);

  function createNewMap(long, lat) {
    if (placeSelect) {
      new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [long, lat], // starting position [lng, lat]
        zoom: 12, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
    }
  }
  mapboxgl.accessToken =
    "pk.eyJ1IjoicG9saW5vIiwiYSI6ImNsN2FtdWNybTB0bmk0MHNqZXZxMzM0OTYifQ.O2Y9sZnF-K1k_KhC8MzJbA";

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full mt-15 m-auto py-8 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-1 mt-14 text-xl font-normal text-white sm:text-2xl">
          Registra tu producto para vender
        </div>

        <div className="mt-8 px-8 max-w-lg self-center">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="font-light text-white text-xl">Nombre</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={(e) => handleChange(e)}
                placeholder="Nombre del producto"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.name && (
                <p className="font-bold text-red-700 text-center p-2">
                  {errors.name}
                </p>
              )}

            </div>
            <div>
              <label className="font-light text-white text-xl">Precio</label>
              <input
                type="text"
                name="price"
                value={input.price}
                onChange={(e) => handleChange(e)}
                placeholder="Precio del producto"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.price && (
                <p className="font-bold text-red-700 text-center p-2">
                  {errors.price}
                </p>
              )}

            </div>
            <div>
              <label className="font-light text-white text-xl">Stock</label>
              <input
                type="text"
                name="stock"
                value={input.stock}
                onChange={(e) => handleChange(e)}
                placeholder="Stock del producto"
                className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
              />
              {errors.stock && (
                <p className="font-bold text-red-700 text-center p-2">
                  {errors.stock}
                </p>
              )}

            </div>
            {/* <div>
              <label className="font-light text-white text-xl">
                Imagen
              </label>
              <input
                type="file"
                name="image"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => handleImage(e)}
                className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
              {loadingImage ? (
                <h3 className="font-light text-white text-xl self-center">
                  Cargando imagen...
                </h3>
              ) : (
                <img src={image} alt="" className="max-w-xs" />
              )}
              {errors.image && (
                <p className="font-bold text-red-700 text-center p-2">
                  {errors.image}
                </p>
              )}
            </div> */}
            <div>
              <label className="font-light text-white text-xl">
                Más imágenes
              </label>
              <input
                type="file"
                name="imagePool"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => handleImagePool(e)}
                className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />

              <div className="font-light text-white text-xl">
                {loadingImage ? (
                  <h3>Cargando imagen...</h3>
                ) : (
                  input.image?.map((el) => (
                    <div key={addKey()}>
                      <button
                        key={el.id}
                        type="button"
                        onClick={() => handleDelete(el)}
                        className="px-2 border-4 rounded-lg font-bold text-yellow-900 border-yellow-900"
                      >
                        x
                      </button>
                      <img src={el} alt="" width="300px" />
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <label className="font-light text-white text-xl">
                Tipo de producto para
              </label>
              <select
                name="type"
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-400 text-base rounded-lg focus:ring-yellow-800 focus:border-transparent focus:outline-none focus:ring-2 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-yellow-800 dark:focus:border-transparent"
              >
                <option value="typeSelect" defaultValue hidden>
                  Seleccione tipo
                </option>
                <option value="perro" key={addKey()}>
                  Perro
                </option>
                <option value="gato" key={addKey()}>
                  Gato
                </option>
                <option value="otro" key={addKey()}>
                  Otro
                </option>
              </select>
              {errors.type && (
                <p className="font-bold text-red-700 text-center p-2">
                  {errors.type}
                </p>
              )}
            </div>
            <div>
              <label className="font-light text-white text-xl">Categoria</label>
              <span>
                <select
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-400 text-base rounded-lg focus:ring-yellow-800 focus:border-transparent focus:outline-none focus:ring-2 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-yellow-800 dark:focus:border-transparent"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="categorySelect" defaultValue hidden>
                    Seleccione opción
                  </option>
                  <option value="alimento" key={addKey()}>
                    Alimento
                  </option>
                  <option value="servicio" key={addKey()}>
                    Servicio
                  </option>
                  <option value="accesorio" key={addKey()}>
                    Accesorio
                  </option>
                  <option value="otro" key={addKey()}>
                    Otro
                  </option>
                </select>
              </span>
              {errors.category && (
                <p className="font-bold text-red-700 text-center p-2">
                  {errors.category}
                </p>
              )}
            </div>
            <div>
              <label className="font-light text-white text-xl">Descripción</label>
              <textarea
                name="description"
                maxLength="255"
                value={input.description}
                placeholder="Descripción"
                onChange={(e) => handleChange(e)}
                className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent resize-none"
              />
            </div>
            <div>
              <label className="font-light text-white text-xl">Ubicación</label>
              <MapboxAutocomplete
                publicKey={mapAccess.mapboxApiAccessToken}
                inputClass="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
                onSuggestionSelect={_suggestionSelect}
                resetSearch={false}
                placeholder={
                  !input.place ? "Escriba su ciudad" : "Modifique ciudad"
                }
              />
              {input.place && (
                <p className="font-light text-white text-xl">{input.place}</p>
              )}
              {errors.place && (
                <p className="font-bold text-red-700 text-center p-2">
                  {errors.place}
                </p>
              )}
            </div>
            {input.place ? (
              <div
                ref={mapDiv}
                style={{
                  block: "w-full",
                  height: "15vw",
                  borderRadius: "10px",
                }}
              />
            ) : null}
            <div>
              <button
                type="submit"
                className="py-2 px-4 my-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Crear
              </button>
            </div>
          </form>

          <Link to="/home">
            <button className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
              Regresar
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}