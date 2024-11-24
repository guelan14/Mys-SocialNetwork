import React, { useContext, useEffect, useState } from "react";
import Publication from "../components/publication";
import NavBar from "../components/NavBar";
import publicationService from "../services/publication";
import ScrollInfinite from "../components/ScrollInfinite";
import ProfileBar from "../components/ProfileBar";

export default function Home(props) {
  const user = props.user;
  const [text_description, setText_description] = useState("");
  const [file, setFile] = useState(null);
  const [sent, setSent] = useState("hp;a");
  const [loading, setLoading] = useState(false);

  const handlePost = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("text", text_description);
    formData.append("file0", file);

    const response = await publicationService.save(formData);

    if (!response) setSent(false);
    if (response) setSent(true);

    // Limpiar el formulario después de la publicación
    setText_description("");
    setFile(null);
  };

  const getFeed = async (page) => {
    return await publicationService.getFeed(page, user._id); // Función para obtener tus propias publicaciones
  };

  return (
    <>
      <NavBar user={user} />
      <div className="flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handlePost}>
            <div className="mb-6">
              <label
                htmlFor="postContent"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Post Content:
              </label>
              <textarea
                type="text"
                name="text"
                placeholder="Que estas pensando?"
                value={text_description}
                onChange={({ target }) => setText_description(target.value)}
                className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                htmlFor="fileAttachment"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Attach File:
              </label>
              <div className="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
                <input
                  name="file"
                  type="file"
                  onChange={({ target }) => setFile(target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <span className="ml-2 text-sm text-gray-600">
                    Choose a file
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Max file size: 5MB
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
              >
                Post
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  id="send"
                  fill="#fff"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                </svg>
              </button>
              <div>
                {typeof sent === "boolean" && // Verifica si sent es un booleano
                  (sent ? (
                    <div className="bg-slate-300 bottom-0 right-0 translate-y-[100%]">
                      Posted!
                    </div>
                  ) : (
                    <div className="bg-red-600">Post Error!</div>
                  ))}
              </div>
              <span className="text-gray-500 text-sm">Max 280 characters</span>
            </div>
          </form>
        </div>
      </div>
      <ScrollInfinite user={user} getFeed={getFeed} />
    </>
  );
}
