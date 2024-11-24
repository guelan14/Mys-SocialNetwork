import React, { useRef, useEffect, useState } from "react";
import publication from "../services/publication";

const Publication = ({ post, user, onDelete }) => {
  const [opVisible, setOpVisible] = useState(false);
  const opButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (opVisible && !opButtonRef.current.contains(event.target)) {
        setOpVisible(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [opVisible]);

  const handleOpButton = () => {
    setOpVisible(!opVisible);
  };

  const handleDeleteButton = async () => {
    const deletePost = await publication.deletePublication(post._id);
    onDelete(post._id);
  };

  return (
    <>
      <div className="relative mb-5 p-5 bg-gray-300 flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
        <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4  text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
          <a href={`/profile/${post.user._id}`}>
            <img
              src={post.user.image}
              alt="Profile Image"
              className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
            />
          </a>
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <a href={`/profile/${post.user._id}`}>
                <h5 className="hover:underline block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {post.user.name}
                </h5>
              </a>
              <div className="flex relative items-center ">
                <button
                  ref={opButtonRef}
                  className="relative"
                  onClick={() => {
                    handleOpButton();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M2.75 7.25h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5zM2.75 11.25h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5zM2.75 15.25h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5z" />
                  </svg>
                </button>
                <div
                  className={
                    opVisible
                      ? "absolute bottom-0 right-0 bg-black translate-y-[100%] "
                      : "hidden"
                  }
                >
                  <a
                    className="bg-gray-200 hover:bg-gray-400 p-1"
                    href={`/profile/${post.user._id}`}
                  >
                    Profile
                  </a>
                  {post.user._id === user && (
                    <button
                      className={
                        opVisible
                          ? "absolute p-1 bottom-0 right-0 translate-y-[100%] bg-gray-200 hover:bg-gray-400"
                          : "hidden"
                      }
                      onClick={() => {
                        handleDeleteButton();
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
              {new Date(post.created_at).toLocaleString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="p-0 mb-6">
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {post.text}
          </p>
        </div>
        {/*<div>
          <p>aca deeria ir la foto</p>
          <img src={post.image}></img>
        </div>*/}
      </div>
    </>
  );
};

export default Publication;
