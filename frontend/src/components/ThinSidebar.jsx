import { useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { ChatCircleDots, GearSix, Users, PhoneCall, Minus } from "phosphor-react";
import { Link } from "react-router-dom";
import { SignOut } from "phosphor-react";
import ToggleBar from "./toggleBar"; 
import { Sidebar } from 'primereact/sidebar'; 
import { Button } from 'primereact/button';

const ThinSidebar = () => {
  const { logout, authUser  } = useAuthStore();
  const {
    getUsers,
    toggleToggleBar,
    isToggleBarVisible,
    isGroupsVisible,
    toggleGroupsVisibility,
  } = useChatStore.getState();

  const [selectedIcon, setSelectedIcon] = useState("chat");

  // State variables for sidebar visibility
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleTop, setVisibleTop] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);

    if (icon === "chat") {
      toggleToggleBar();
      ({ isGroupsVisible: false });
    } else if (icon === "users") {
      toggleGroupsVisibility();
    }
  };

  return (
    <div className="bg-[#0a0a0a]  left-1 h-full w-20 flex flex-col items-center py-6">
      <div className=" rounded-lg h-14 w-14 mb-6 flex items-center justify-center">
        <img className="w-14 h-14 -p-9 object-cover rounded-lg" src="./src/assets/logo.jpg" alt="Logo" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          className={`w-11 h-11 flex items-center rounded-lg justify-center text-white button-transition ${
            selectedIcon === "chat" ? "bg-[#00058c]" : ""
          }`}
          onClick={() => handleIconClick("chat")}
        >
          <ChatCircleDots size={25} />
        </button>

        <button
          className={`w-14 h-14 flex items-center rounded-lg justify-center text-white button-transition ${
            selectedIcon === "users" ? "bg-[#00058c]" : ""
          }`}
          onClick={() => handleIconClick("users")}
        >
          <Users size={22} />
        </button>
      </div>

      <div className="mt-4">
        <button
          className={`w-14 h-14 flex items-center rounded-lg justify-center text-white button-transition ${
            selectedIcon === "call" ? "bg-[#00058c]" : ""
          }`}
          onClick={() => handleIconClick("call")}
        >
          <PhoneCall size={22} />
        </button>
        <div className="ml-2 -mb-2">
           <br></br>
        </div>
        <button
          className={`w-14 h-14 flex items-center rounded-lg justify-center text-white button-transition ${
            selectedIcon === "settings" ? "bg-[#00058c]" : ""
          }`}
          onClick={() => handleIconClick("settings")}
        >
          <GearSix size={22} />
        </button>
      </div>

      <div className="flex-grow" />
      <button
        className="text-white pb-10 ml-2 items-center justify-center flex"
        onClick={logout}
      >
        <SignOut size={22} />
      </button>
      <div className="w-14 h-14 -mb-10 rounded-full overflow-hidden">
        <Link to="/profile">
          <img
            src={authUser ?.profilePic || "/avatar .png"}
            alt={authUser  ?.name || "Profile"}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {isToggleBarVisible && <ToggleBar />}

      {/* Sidebar buttons */}
      <div className="flex gap-2 justify-content-center mt-4">
        <Button icon="pi pi-arrow-right" onClick={() => setVisibleLeft(true)} />
        <Button icon="pi pi-arrow-left" onClick={() => setVisibleRight(true)} />
        <Button icon="pi pi-arrow-down" onClick={() => setVisibleTop(true)} />
        <Button icon="pi pi-arrow-up" onClick={() => setVisibleBottom(true)} />
      </div>

      {/* Sidebars */}
      <Sidebar visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
        <h2>Left Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Sidebar>

      <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
        <h2>Right Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      <Sidebar visible={visibleTop} position="top" onHide={() => setVisibleTop(false)}>
        <h2>Top Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Sidebar>

      <Sidebar visible={visibleBottom} position="bottom" onHide={() => setVisibleBottom(false)}>
        <h2>Bottom Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p> </Sidebar>

     
      </Sidebar>
    </div>
  );
};

export default ThinSidebar;