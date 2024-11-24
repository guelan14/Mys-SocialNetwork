// Importación correcta
import axios from "axios";

const baseURL = "http://localhost:3900";
axios.defaults.withCredentials = true;

const userService = {
  async checkAuthStatus() {
    try {
      const response = await axios.get(`${baseURL}/api/user/check-auth`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al verificar el estado de autenticación");
    }
  },
};

const login = async (email, password) => {
  console.log("HOLAAAAAAAAA");
  console.log(email, password);

  try {
    const response = await axios.post("http://localhost:3900/login/local", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { userService, login };
