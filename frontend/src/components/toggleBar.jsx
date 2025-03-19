import React from "react";
import Sidebar from "./Sidebar";


const ToggleBar = () => {
  return (
    <div className="fixed  -mt-6 ml-3 left-20 -pr-9 w-80 bg-[#1b1b1b] shadow-md"> {/* Decrease height from the bottom */}
        
      {/* This container will have a fixed width and same height as the sidebar */}
      <div className="w-full h-full flex items-center justify-center text-white">
        <Sidebar />
      </div>
      
      {/* Adjust the container height */}
      <div className="w-full h-[calc(100%-5-px)] flex items-center justify-center text-white"> {/* Reduce height here */}
        {/* Any content you want to place here */}
      </div>
    </div>
  );
};

export default ToggleBar;
