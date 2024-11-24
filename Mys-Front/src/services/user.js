import axios from "axios";
const baseURL = "http://localhost:3900";
axios.defaults.withCredentials = true;

const getProfile = async () => {
  try {
    const { data } = await axios.get(baseURL + "/api/user/profile");
    return data.user;
  } catch (error) {
    return error.message;
  }
};

const getProfileUser = async (id) => {
  try {
    const { data } = await axios.get(baseURL + `/api/user/profile/${id}`);
    return data.user;
  } catch (error) {
    return error.message;
  }
};

const searchList = async () => {
  try {
    const url = `${baseURL}/api/user/all`;
    const response = await axios.get(url);
    const users = response.data;
    return users;
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    throw error; // Puedes relanzar el error o manejarlo de otra manera según tus necesidades
  }
};

//id del usuario a seguir (id)
const findFollow = async (id) => {
  console.log("id", id);
  const url = `${baseURL}/api/follow/findOne/${id}`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: "Error en la solicitud",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message, // Proporcionar detalles del error
    };
  }
};

const followUser = async (id) => {
  const userId = id;
  const url = `${baseURL}/api/follow/save/${userId}`;
  try {
    const response = await axios.post(url);
    return response;
  } catch (error) {
    console.log("Error al hacer follow");
  }
};

const unfollowUser = async (id) => {
  const userId = id;
  const url = `${baseURL}/api/follow/unfollow/${userId}`;
  try {
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.log("Error al hacer follow");
  }
};

const followingsNumber = async (id) => {
  const userId = id;
  const url = `${baseURL}/api/follow/following-number/${userId}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log("Error en obtener follows");
  }
};

const followersNumber = async (id) => {
  const userId = id;
  const url = `${baseURL}/api/follow/follower-number/${userId}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log("Error en obtener follows");
  }
};

const followers = async (id) => {
  const userId = id;
  const page = 1;
  const url = `${baseURL}/api/follow/followers/${userId}/${page}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log("Error en obtener followers");
  }
};

export default {
  getProfile,
  searchList,
  getProfileUser,
  followUser,
  unfollowUser,
  findFollow,
  followingsNumber,
  followersNumber,
  followers,
};
