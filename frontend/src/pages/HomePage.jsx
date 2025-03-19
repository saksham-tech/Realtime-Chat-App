import { useState } from "react";
import NoChatSelected from "../components/NoChatSelected";
import ThinSidebar from "../components/ThinSidebar";
import { useChatStore } from "../store/useChatStore";
import ToggleBar from "../components/toggleBar";
import ChatContainer from "../components/ChatContainer";
import RightBar from "../components/rightbar";


const HomePage = () => {
  const { selectedUser, isGroupsVisible } = useChatStore();

  // State to control visibility of ToggleBar
  const [isToggleBarVisible, setToggleBarVisible] = useState(false);

  // State to control visibility of RightBar
  const [isRightBarVisible, setRightBarVisible] = useState(false);

  // Function to toggle the visibility of ToggleBar when chat icon is selected
  const toggleToggleBar = () => {
    setToggleBarVisible((prevState) => !prevState);
  };

  // Function to handle click on the chat icon
  const handleChatIconClick = () => {
    // Only show the ToggleBar if a chat is selected
    if (selectedUser) {
      toggleToggleBar();
    }
  };

  // Function to toggle the visibility of RightBar
  const toggleRightBar = () => {
    setRightBarVisible((prevState) => !prevState);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-base-200">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <ThinSidebar toggleToggleBar={handleChatIconClick} />
      </div>

      {/* ToggleBar, only visible when chat is selected and ToggleBar visibility is true */}
      {isToggleBarVisible && selectedUser && (
        <div className="fixed h-full w-64 bg-white shadow-lg z-10">
          <ToggleBar />
        </div>
      )}

      {/* Groups Container */}

      {/* Main Chat Area */}
      <div
        className={`flex-grow flex h-full overflow-hidden transition-all duration-300 ease-in-out ${
          isRightBarVisible ? "mr-[300px]" : "mr-0"
        }`}
      >
        <div
          className="flex-grow bg-base-100 rounded-lg shadow overflow-hidden flex flex-col"
          style={{
            marginLeft: "332px",
            paddingRight: "0",
            width: "calc(100% - 332px)", // Ensures main area occupies the correct space
          }}
        >
          {!selectedUser ? (
            <div className="flex-grow flex flex-col">
              <NoChatSelected />
            </div>
          ) : (
            <div
              className="flex-grow flex flex-col bg-no-repeat overflow-auto"
              style={{
                backgroundImage: "url('./src/assets/blur.jpg')",
                backgroundSize: "170%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <ChatContainer
                isRightBarVisible={isRightBarVisible} // Pass state to ChatContainer
                toggleRightBar={toggleRightBar} // Pass toggle function
              />
            </div>
          )}
        </div>
      </div>

      {/* RightBar */}
      {isRightBarVisible && (
        <div
          className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-20"
          style={{
            boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.3)", // Optional, for shadow effect
          }}
        >
          <RightBar />
        </div>
      )}
    </div>
  );
};

export default HomePage;
