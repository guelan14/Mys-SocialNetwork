import axios from "axios";
const baseURL = "http://localhost:3900/api/publication";
axios.defaults.withCredentials = true;

const save = async (form) => {
  try {
    const response = await axios({
      method: "post",
      url: baseURL + "/save",
      data: form,
      headers: {
        "Content-Type": `multipart/form-data; `,
      },
    });
    return response.data.publicationStored;
  } catch (error) {
    console.error("Error al publicar");
  }
};

const getOne = async (id) => {
  try {
    const { data } = await axios.get(baseURL + `/user/${id}/${page}`);
    return data.publication;
  } catch (error) {
    return error.message;
  }
};

const getFeed = async (page, id) => {
  console.log(page);
  try {
    const { data } = await axios.get(baseURL + `/feed/${page}`);
    return data.publications;
  } catch (error) {
    return error.message;
  }
};

const getMyPublications = async (id, page) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/my-publications/${id}/${page}`
    );
    return data.publications;
  } catch (error) {
    return error.message;
  }
};

const deletePublication = async (id) => {
  try {
    const publication = await axios.delete(`${baseURL}/remove/${id}`);
    return publication.status;
  } catch (error) {
    return error.message;
  }
};

export default { getFeed, save, getMyPublications, deletePublication, getOne };
