import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div
      className="bg-[#0e1218] w-full flex flex-1 flex-col items-center justify-center p-4 bg-base-100/50"
      style={{
        backgroundImage: "url('./src/assets/blur.jpg')", // Ensure the image path is correct
        backgroundSize: "170%", // Adjust the size of the image
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
        backgroundBlendMode:'overlay',
        backgroundColor: "rgba(0, 0, 0, 0.6)",
         // Optional: blend effect for better visuals
      }}
    >
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

