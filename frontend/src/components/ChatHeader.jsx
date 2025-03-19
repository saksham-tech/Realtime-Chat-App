import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";
import RightBar from "./rightbar";

const ChatHeader = ({ isRightBarVisible, setRightBarVisible }) => {
  const { selectedUser , setSelectedUser  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Toggle the visibility of the right bar
  const handleProfileClick = () => {
    setRightBarVisible(!isRightBarVisible);
  };

  return (
    <div className="p-10 -ml-4 pt-7 pb-12  rounded-none border-black shadow-2xl">
      <div className="flex h-1 pt-5 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="avatar">
              <div
                className="size-14 rounded-full relative cursor-pointer"
                onClick={handleProfileClick} // Toggle right bar visibility
              >
                <img
                  src={selectedUser .profilePic || "/avatar.png"}
                  alt={selectedUser .fullName}
                  
                />
              </div>
            </div>

            {onlineUsers.includes(selectedUser ._id) && (
              <div className="w-4 h-4  top-10 border-black rounded-full bg-green-500 absolute bottom-0 right-0"></div>
            )}
          </div>

          <div>
            <h3 className="font-medium cursor-pointer text-xl" onClick={handleProfileClick}>
              {selectedUser .fullName}
            </h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser ._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser (null)}>
          <X size={35} />
        </button>
      </div>

      {/* Show the right bar based on the state */}
      {isRightBarVisible && <RightBar />}
    </div>
  );
};

export default ChatHeader;