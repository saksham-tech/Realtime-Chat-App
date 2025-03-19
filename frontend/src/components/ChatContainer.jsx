import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils"; // Corrected function name
import RightBar from "./rightbar"; // Ensure correct casing for import

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [isRightBarVisible, setRightBarVisible] = useState(false); // Track the right bar visibility
  const [mediaImages, setMediaImages] = useState([]); // State to hold media images

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Extract image URLs from messages
  const handleViewPhotos = () => {
    const images = messages
      .filter((message) => message.image) // Filter messages that contain images
      .map((message) => message.image); // Extract the image URLs
    setMediaImages(images);
    setRightBarVisible(true); // Show the RightBar
  };

  return (
    <div
      className={`z-10 flex-1 flex flex-col overflow-y-hidden bg-[#0e1218] ${
        isRightBarVisible ? "mr-[319px]" : "mr-0"
      }`}
      style={{
        transition: "margin-right 0.9s ease",
        backgroundImage: "url('./src/assets/blur.png')",
        backgroundSize: "170%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <ChatHeader
        isRightBarVisible={isRightBarVisible}
        setRightBarVisible={setRightBarVisible} // Pass the function here
      />
      <div
        className="flex-1 p-4 space-y-4 overflow-y-scroll"
        style={{
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          msOverflowStyle: "none", // Hide scrollbar for IE and Edge
        }}
      >
        {isMessagesLoading ? (
          <MessageSkeleton />
        ) : (
          messages.map((message) => (
            <div
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
              key={message._id} // Add a unique key for each message
            >
              <div className="chat-image avatar ml-2">
                <div className="w-14 h-15 rounded-full ">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt={`${message.senderId === authUser._id ? "Your" : "User"} profile`}
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div
                className={`chat-bubble  flex flex-col-reverse  ${
                  message.senderId === authUser._id ? "bg-[#c70442]" : "bg-[#00058c] "
                } text-white ${message.image ? "bg-transparent" : ""}`}
              >
                {message.image && (
                  <div className="flex flex-col items-end">
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md"
                    />
                  </div>
                )}
                {message.text && (
                  <div className="flex flex-col items-end">
                    <p>{message.text}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <MessageInput handleViewPhotos={handleViewPhotos} /> {/* Pass the handleViewPhotos function to MessageInput */}
      
      {/* Include the RightBar component here and pass mediaImages */}
      <RightBar
        isVisible={isRightBarVisible}
        mediaImages={mediaImages}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default ChatContainer;
