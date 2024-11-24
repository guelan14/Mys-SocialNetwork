import React from "react";

const ProfileBar = (props) => {
  return (
    <>
      <div className="p-5 bg-gray-300 flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
        <div className="relative flex items-center gap-4 pt-0 mx-0  overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
          <img
            src={props.user.image}
            alt=""
            className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
          />
          <div className="flex w-full flex-col ">
            <p className="block  text-base antialiased font-bold leading-relaxed text-blue-gray-900">
              {props.user.fullname}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBar;
