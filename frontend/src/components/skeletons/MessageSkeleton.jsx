const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-4"
      style={{ paddingRight: "0" }} // Ensure no extra padding here
    >
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          {/* Profile Image */}
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <div className="skeleton w-full h-full rounded-full" />
            </div>
          </div>

          {/* Chat Header */}
          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16" />
          </div>

          {/* Chat Bubble */}
          <div className="chat-bubble bg-base-200 p-3 rounded-xl max-w-[200px]">
            <div className="skeleton w-full h-16 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
