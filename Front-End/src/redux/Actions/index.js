import axios from "axios";
import { setAuthToken } from "../../components/BrowserHistory/setAuthToken";
import * as actions from "./actionTypes";

//SWITCH RENDER//--------------------------------------------------------------
export function switchRenderAction(input) {
  return async (dispatch) => {
    return await dispatch({ type: actions.SWITCH_RENDER, payload: input });
  };
}
//GET ALL ACTIONS//-------------------------------------------------------------
export function getAllUsers() {
  return async (dispatch) => {
    return await axios
      .get("https://happytails2.herokuapp.com/home/users")
      .then((json) =>
        dispatch({ type: actions.GET_ALL_USERS, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
export function getAllPets() {
  return async (dispatch) => {
    return await axios
      .get("https://happytails2.herokuapp.com/home/pets")
      .then((json) =>
        dispatch({ type: actions.GET_ALL_PETS, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
//GET DETAIL ACTION//------------------------------------------------------------
export function getUserDetail(id) {
  return async (dispatch) => {
    return await axios
      .get(`https://happytails2.herokuapp.com/home/users/${id}`)
      .then((json) =>
        dispatch({ type: actions.GET_USER_DETAIL, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
export function getPetDetail(id) {
  return async (dispatch) => {
    return await axios
      .get(`https://happytails2.herokuapp.com/home/pets/${id}`)
      .then((json) =>
        dispatch({ type: actions.GET_PET_DETAIL, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}
//GET BY NAME ACTIONS//-----------------------------------------------
export function getUserByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "https://happytails2.herokuapp.com/home/users?name=" + name
      );
      return dispatch({
        type: actions.GET_USER_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error en getUSERBYname");
    }
  };
}
export function getPetByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "https://happytails2.herokuapp.com/home/pets?name=" + name
      );
      return dispatch({
        type: actions.GET_PET_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error en getPETBYname");
    }
  };
}
////POST ACTIONS//----------------------------------------------------------------
export function postPet(id, payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `https://happytails2.herokuapp.com/home/pets/${id}`,
        payload
      );
      dispatch({
        type: actions.POST_PET,
        payload: json.data,
      });
      return "Mascota creada correctamente";
    } catch (error) {
      console.log(error);
      return "Error de server, no se pudo crear la mascota, intente más tarde";
    }
  };
}
export function postUser(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `https://happytails2.herokuapp.com/register`,
        payload
      );
      return dispatch({
        type: actions.POST_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postImage(archivo) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `https://happytails2.herokuapp.com/home/images`,
        archivo
      );
      return dispatch({
        type: actions.POST_IMAGE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//CLEAR//-----------------------------------------------------------------

export function clearState(payload) {
  return {
    type: actions.CLEAR_STATE,
    payload,
  };
}
export function clearStatePet(payload) {
  return {
    type: actions.CLEAR_STATE_PET,
    payload,
  };
}
//UpDate//----------------------------------------------------------------
export function patchUsuer(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/home/users/${payload.id}`,
        payload
      );
      return dispatch({
        type: actions.PATCH_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function patchPet(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/home/pets/${payload.id}`,
        payload
      );
      dispatch({
        type: actions.PATCH_PET,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}
//FILTROS//-----------------------------------------------------
export function filterByQuery(filterParams) {
  return async function (dispatch) {
    let json = await axios.get(
      `https://happytails2.herokuapp.com/home/filters?age=${filterParams.age}&creation_date=${filterParams.creation_date}&vaccinated=${filterParams.vaccinated}&castrated=${filterParams.castrated}&location=${filterParams.location}&pet_type=${filterParams.pet_type}&pet_size=${filterParams.pet_size}&gender=${filterParams.gender}&is_adopted=${filterParams.is_adopted}`
    );
    return dispatch({
      type: actions.FILTER_BY_QUERY,
      payload: json.data,
    });
  };
}

//LOGIN//-----------------------------------------------------
export function userLogin(payload) {
  return async function (dispatch) {
    try {
      await axios
        .post("https://happytails2.herokuapp.com/login", payload)
        .then((response) => {
          const token = response.data.data.token;
          const id = response.data.id.id;
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          setAuthToken(token);
        });
      return dispatch({
        type: actions.USER_LOGIN,
        payload,
      });
    } catch (error) {
      return dispatch({
        type: actions.USER_LOGIN,
        payload: error.response.data,
      });
    }
  };
}

export function userLoginGoogle(payload) {
  return async function (dispatch) {
    try {
      let json = await axios
        .post("https://happytails2.herokuapp.com/logingoogle", payload)
        .then((response) => {
          const token = response.data.data.token;
          const id = response.data.id.id;
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          setAuthToken(token);
        });
      return dispatch({
        type: actions.USER_LOGIN_GOOGLE,
        payload: json?.data,
      });
    } catch (error) {
      return dispatch({
        type: actions.USER_LOGIN_GOOGLE,
        payload: error.response.data,
      });
    }
  };
}

export function getUserProfile(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://happytails2.herokuapp.com/home/users/${id}`
      );
      return dispatch({
        type: actions.GET_USER_PROFILE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function forgotPassword(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        "https://happytails2.herokuapp.com/forgotpassword",
        payload
      );
      return dispatch({
        type: actions.FORGOT_PASSWORD,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function resetPassword(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/resetpassword/${payload.id}/${payload.auth}`,
        payload
      );
      return dispatch({
        type: actions.RESET_PASSWORD,
        payload: json.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}
//ADOPT---------------
export function tradePet(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/home/adopt`,
        payload
      );
      return dispatch({
        type: actions.ADOPT,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function patchInterestedUsers(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/home/interestedUsers`,
        payload
      );
      dispatch({
        type: actions.INTERESTED_USERS,
        payload: json.data,
      });
      return json.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function patchLikes(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/home/likes`,
        payload
      );
      dispatch({ type: actions.PATCH_LIKES, payload: json.data });
      return "OKA";
    } catch (error) {
      console.log(error);
    }
  };
}

export function paymentMp(idDonor, amountDonation) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://happytails2.herokuapp.com/linkpayment/${idDonor}/${amountDonation}`
      );
      return dispatch({
        type: actions.PAYMENT_MP,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function paymentMerp(idBuyer, idProduct, quantity) {
  //idProduct=
  console.log(idBuyer, idProduct, quantity);
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://happytails2.herokuapp.com/linkpayment/market/${idBuyer}/${idProduct}/${quantity}`
      );
      console.log(json.data, "DATA");

      return dispatch({
        type: actions.PAYMENT_MERP,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function paymentCart(idBuyer, pro) {
  //product es un array de objetos? como lo mando por body en un get?
  //  {prod: {name,stock....},
  //  quantity: 2}

  console.log(idBuyer, pro);
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `https://happytails2.herokuapp.com/linkpayment/${idBuyer}`,
        pro
      );

      console.log(json.data, "DATA");

      return dispatch({
        type: actions.PAYMENT_CART,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

///////////////////////////NOTIFICATIONS-------------------
export function notViewed(payload) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: actions.NOT_VIEWED_NOTIFICATION,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

////////////////////////////////chat
export function chatWithUser(losdosid) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        "https://happytails2.herokuapp.com/home/conversations/",
        losdosid
      );
      return dispatch({
        type: actions.CHAT_WITH_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getConversations(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "https://happytails2.herokuapp.com/home/conversations/" + id
      );
      return dispatch({
        type: actions.GET_CONVERSATIONS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMessages(iddd) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "https://happytails2.herokuapp.com/home/message/" + iddd
      );
      return dispatch({
        type: actions.GET_MESSAGES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function sendMessage(message) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        "https://happytails2.herokuapp.com/home/message/",
        message
      );
      return dispatch({
        type: actions.SEND_MESSAGE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function viewed(view) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: actions.VIEWED_NOTIFICATION,
        payload: view,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//VIEWED --------------------------JUANMA SOS VOS------------
export function viewing(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/home/viewing`,
        payload
      );
      return dispatch({
        type: actions.VIEWING_NOTIFICATION,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function viewingLike(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/home/viewinglike`,
        payload
      );
      return dispatch({
        type: actions.VIEWING_LIKE_NOTIFICATION,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function likePet(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/home/likepets`,
        payload
      );
      dispatch({
        type: actions.LIKE_PET,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function reportPet(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `https://happytails2.herokuapp.com/home/reportpet`,
        payload
      );
      dispatch({
        type: actions.REPORT_PET,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function reportUser(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `https://happytails2.herokuapp.com/home/reportuser`,
        payload
      );
      dispatch({
        type: actions.REPORT_USER,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function getReportedPets() {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://happytails2.herokuapp.com/home/reportpet`
      );
      return dispatch({
        type: actions.GET_REPORTED_PETS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getReportedUsers() {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://happytails2.herokuapp.com/home/reportuser`
      );
      return dispatch({
        type: actions.GET_REPORTED_USERS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function handlePet(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/handle/pet/`,
        payload
      );
      dispatch({
        type: actions.HANDLE_PET,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleUser(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/handle/user/`,
        payload
      );
      dispatch({
        type: actions.HANDLE_USER,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function handlePetReport(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/handle/petreport/`,
        payload
      );
      dispatch({
        type: actions.HANDLE_PET_REPORT,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleUserReport(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/handle/userreport/`,
        payload
      );
      dispatch({
        type: actions.HANDLE_USER_REPORT,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleAdmin(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/handle/admin/`,
        payload
      );
      dispatch({
        type: actions.HANDLE_ADMIN,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDeletedPets() {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://happytails2.herokuapp.com/handle/deletedpets`
      );
      return dispatch({
        type: actions.GET_DELETED_PETS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDeletedUsers() {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://happytails2.herokuapp.com/handle/deletedusers`
      );
      return dispatch({
        type: actions.GET_DELETED_USERS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleUserRestore(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/handle/deleteduser/`,
        payload
      );
      dispatch({
        type: actions.HANDLE_USER_RESTORE,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleUserReportRestore(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.patch(
        `https://happytails2.herokuapp.com/handle/userreported/`,
        payload
      );
      dispatch({
        type: actions.HANDLE_USER_REPORT_RESTORE,
        payload: json.data,
      });
      return "OK";
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserReportsSolved() {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://happytails2.herokuapp.com/handle/userreports`
      );
      return dispatch({
        type: actions.GET_USER_REPORTS_SOLVED,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createProduct(id, payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(
        `https://happytails2.herokuapp.com/home/product/${id}`,
        payload
      );

      dispatch({
        type: actions.CREATE_PRODUCT,
        payload: json.data,
      });
      return "Producto creado correctamente";
    } catch (error) {
      console.log(error);
      return "Error de server, no se pudo crear el producto, intente más tarde";
    }
  };
}

export function getAllProducts() {
  return async (dispatch) => {
    return await axios
      .get("https://happytails2.herokuapp.com/home/products")
      .then((json) =>
        dispatch({ type: actions.GET_ALL_PRODUCTS, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}

export function getProductDetail(id) {
  return async (dispatch) => {
    return await axios
      .get(`https://happytails2.herokuapp.com/home/products/${id}`)
      .then((json) =>
        dispatch({ type: actions.GET_PRODUCT_DETAIL, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}

export function getProductByName(name) {
  return async (dispatch) => {
    try {
      let json = await axios.get(
        "https://happytails2.herokuapp.com/home/products?name=" + name
      );
      return dispatch({
        type: actions.GET_PRODUCT_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function resetProductDetails() {
  return {
    type: actions.CLEAR_PRODUCT_DETAIL,
  };
}

export function addCar(payload) {
  return {
    type: actions.ADD_CAR,
    payload: payload,
  };
}

export function delProductCart(payload) {
  return {
    type: actions.DEL_PRODUCT_CART,
    payload: payload,

  };
}

export function filtrosMarket(filterParamsMarket){
  return async function (dispatch) {
    let json = await axios.get(
      `https://happytails2.herokuapp.com/home/productsFilters?type=${filterParamsMarket.type}&category=${filterParamsMarket.category}&priceMin=${filterParamsMarket.priceMin}&priceMax=${filterParamsMarket.priceMax}`
    );
    return dispatch({
      type: actions.FILTROS_MARKET,
      payload: json.data,
    });
  }
}
