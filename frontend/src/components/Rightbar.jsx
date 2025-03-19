import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { User, CaretRight, Star, Bell, PhoneCall, VideoCamera } from "phosphor-react";

const RightBar = ({ isVisible }) => {
  const { selectedUser, messages = [] } = useChatStore(); // Ensure messages are fetched from the store
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setAbout(selectedUser.about || "No information provided.");
    }
  }, [selectedUser]);

  const imageCount = messages.filter((message) => message.image).length;

  return (
    <div
      className={`fixed top-0 right-0 h-full border-x  border-[#292929] bg-[#070707] shadow-md z-10 transition-transform duration-700 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: "320px" }}
    >
      <div className="flex pb-8  items-center justify-start px-4 py-9 border-y border-[#282727]  bg-[#080808] ">
        <User size={33} className="text-grey mr-2" />
        <h2 className="font-extrabold   bg-clip-text text-transparent bg-gradient-to-r from-[#00058c] to-[#c70442] text-3xl hidden lg:block">User Info</h2>
      </div>

      <div className="w-full h-full flex flex-col p-4">
        <div className="flex mt-3 ml-3 items-center mb-4">
          <img
            src={selectedUser?.profilePic || "default-pic.png"}
            alt="Profile"
            className="w-14 h-14 rounded-full mr-2"
          />
          <div className="text-left">
            <h2 className="text-xl text-grey font-bold items-center text-white gradient-text">
              {selectedUser?.fullName || "Unknown"}
            </h2>
            <p className="text-pink-600 font-bold items-center   gradient-text">
              {selectedUser?.email || "N/A"}
            </p>
          </div>
        </div>

        <div className="mb-8 flex justify-center space-x-10">
          <div className="mt-7 flex flex-col items-center">
            <PhoneCall size={32} className="gradient-text" />
            <span className="mt-2  font-bold text-grey   gradient-text">Voice</span>
          </div>
          <div className="mt-7 flex flex-col items-center ">
            <VideoCamera size={32} className="gradient-text" />
            <span className="mt-2  text-grey   font-bold gradient-text">Video</span>
          </div>
        </div>

        <hr className="w-[265px] ml-3 text-white mb-6" />

        <div className="mb-5">
          <strong className="ml-4   text-white font-bold gradient-text">About</strong>
          <div className="w-full ml-2 text-sm resize-none font-semibold text-grey rounded-md bg-transparent p-2 -mt-1 focus:outline-none    gradient-text">
            {about}
          </div>
        </div>

        <hr className="w-[265px] ml-3 text-white mb-6" />

        <div className="mb-10 mt-5 ml-3">
  <strong className="    font-bold mr-10 text-grey gradient-text">Media, Links & Docs:</strong>
  <div className="flex items-center justify-end  -mt-7 mr-1">
    <strong className="text-pink-600  font-bold text-xl ">{imageCount}</strong>
    <CaretRight size={23} className="text-pink-600 cursor-pointer  " />
  </div>

          <div className="mt-6 overflow-x-auto mr-3">
            <div className="flex space-x-2">
              {messages
                .filter((message) => message.image)
                .map((message, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <hr className="w-[265px] ml-3 text-white mb-6" />

        <div className="mb-10 mt-3 ml-3 flex items-center justify-between">
          <div className="flex items-center">
            <Star size={24} className="text-yellow-400 mr-2" />
            <strong className=" text-grey   font-bold gradient-text">Starred Messages:</strong>
          </div>
          <CaretRight size={25} className="text-grey cursor-pointer mr-2 -mb-1" />
        </div>

        <hr className="w-[265px] ml-3 text-white mb-7" />

        <div className="mb-11 mt-3 ml-3 flex items-center justify-between">
          <div className="flex items-center">
            <Bell size={24} className="text-grey mr-2" />
            <strong className="  text-grey  font-bold gradient-text">Mute Notifications:</strong>
          </div>
          <input type="checkbox" className="toggle toggle-primary text-pink-600 mr-3 mt-1" />
        </div>

        <hr className="w-[265px] ml-3 text-white mb-7" />
      </div>
    </div>
  );
};

export default RightBar;
