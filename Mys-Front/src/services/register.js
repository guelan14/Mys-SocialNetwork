import axios from "axios";

const baseURL = "http://127.0.0.1:3900/api/user/register";

const registration = async (
  email,
  name,
  subname,
  password,
  confirm_password
) => {
  try {
    const { data } = await axios.post(baseURL, {
      email,
      name,
      subname,
      password,
      confirm_password,
    });
    console.log("aaaaaaaaaaaaaa", data);
    return data;
  } catch (error) {
    error;
  }
};

export default { registration };
