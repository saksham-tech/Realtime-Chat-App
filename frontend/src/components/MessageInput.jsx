import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, PaperPlaneTilt, Smiley, X } from "phosphor-react";
import toast from "react-hot-toast";
import Picker from '@emoji-mart/react'; // Correct import for Picker

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleEmojiClick = (emojiObject) => {
 
    setText((prevText) => prevText + (emojiObject.native || emojiObject.emoji || ""));
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="text-white p-7 w-full relative">
    {imagePreview && (
      <div className="mb-3 text-white flex items-center gap-2">
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-20 h-20 text-white object-cover rounded-lg border border-zinc-700"
          />
          <button
            onClick={removeImage}
            className="absolute text-white -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
            type="button"
          >
            <X className="text-white size-3" />
          </button>
        </div>
      </div>
    )}
  
    {showEmojiPicker && (
      <div
      id="emoji"
      className="absolute z-50 emoji-picker"
      style={{
        fontFamily: "'Apple Color Emoji', sans-serif",
        bottom: "140px",
        left: "79%",
        transform: `translateX(-50%) scale(1.2)`,  
        background: "transparent", 
        boxShadow: "none", 
        padding: "0", 
        width: "400px", 
        height: "auto", 
      }}
    >
        <Picker onEmojiSelect={handleEmojiClick}set="apple"  theme="dark" />
      </div>
    )}
  
    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
      <div className= " text-white flex-1 flex items-center gap-2 relative">
        <input
          type="text"
          className="w-full bg-[#17151594] p-7  input input-bordered rounded-xl text-white text-2xl input-lg sm:input-md "
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
  
        {/* Emoji Button inside the input container */}
        <button
          type="button"
          className="absolute right-16 text-yellow-400"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <Smiley size={30} />
        </button>
  
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        
        <button
          type="button"
          className={`hidden sm:flex rounded-full  btn btn-circle ${imagePreview ? "text-emerald-500" : "text-white "}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={32} />
        </button>
      </div>
      
      <button
        type="submit"
        className="bg-[#c70442] h-14 w-14 -mr-3 rounded-full btn btn-sm btn-circle text-white pr-1"
      >
        <PaperPlaneTilt size={32} />
      </button>
    </form>
  </div>
  

  );
};

export default MessageInput;
