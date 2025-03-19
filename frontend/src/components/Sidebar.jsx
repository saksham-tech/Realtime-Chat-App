import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, MagnifyingGlass } from "phosphor-react";

const Sidebar = ({ isVisible }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, unreadMessages } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUnreadTimes, setLastUnreadTimes] = useState(
    JSON.parse(localStorage.getItem("lastUnreadTimes")) || {}
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    console.log("Users fetched:", users);
  }, [users]);

  const handleSelectUser = (user) => {
    const lastUnread = unreadMessages[user._id]?.slice(-1)?.[0]?.createdAt;
    if (lastUnread) {
      setLastUnreadTimes((prev) => {
        const updated = { ...prev, [user._id]: lastUnread };
        localStorage.setItem("lastUnreadTimes", JSON.stringify(updated));
        return updated;
      });
    }

    setSelectedUser(user);
    useChatStore.getState().clearUnreadMessages(user._id);
  };

  const filteredUsers = users.filter((user) => {
    const isUserOnline = onlineUsers.includes(user._id);
    const matchesSearchQuery = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearchQuery && (showOnlineOnly ? isUserOnline : true);
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    const aUnreadCount = unreadMessages[a._id]?.length || 0;
    const bUnreadCount = unreadMessages[b._id]?.length || 0;

    const aLastUnread = unreadMessages[a._id]?.slice(-1)?.[0]?.createdAt || lastUnreadTimes[a._id];
    const bLastUnread = unreadMessages[b._id]?.slice(-1)?.[0]?.createdAt || lastUnreadTimes[b._id];

    if (aUnreadCount > bUnreadCount) return -1;
    if (aUnreadCount < bUnreadCount) return 1;
    if (aLastUnread && bLastUnread) return new Date(bLastUnread) - new Date(aLastUnread);

    return 0;
  });

  const onlineUsersCount = users.filter((user) => onlineUsers.includes(user._id)).length;

  if (isUsersLoading) return <SidebarSkeleton />;
  if (!users || users.length === 0) return <div>No users available</div>;

  const truncateText = (text, maxLength) => (text.length > maxLength ? text.slice(0, maxLength) + "..." : text);

  return (
    <aside className="h-screen w-[520px] p-6 pl-6 -ml-3 -mr-1 border-x   flex flex-col bg-[#050505] transition-all duration-200 shadow-xl border-[#1f1f1f] text-white">

      <div className="w-full pb-4">
        <div className="mb-6 flex items-center gap-2">
          <Users size={32} className="text-white" />
          <span id="chats" className="font-extrabold   bg-clip-text text-transparent bg-gradient-to-r from-[#00058c] to-[#c70442] text-3xl hidden lg:block">
            Chats
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 bg-[#151515] rounded-full px-2">
          <MagnifyingGlass size={24} className="text-white font-extrabold" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 bg-transparent text-ellipsis rounded-full "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mt-6 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs">({onlineUsersCount} online)</span>
        </div>
      </div>

      {/* Scrollable Chat List */}
      <div
        className="flex-grow overflow-y-auto py-4"
        style={{
          maxHeight: "calc(100vh - 200px)", 
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
        }}
      >
        <style>
          {`
            /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
            .flex-grow::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {sortedUsers.length === 0 ? (
          <div className="text-center text-white py-4">No users found</div>
        ) : (
          sortedUsers.map((user) => {
            const unreadCount = unreadMessages[user._id]?.length || 0;
            const lastUnread = unreadMessages[user._id]?.slice(-1)?.[0]?.createdAt || lastUnreadTimes[user._id];

            return (
              <button
                key={user._id}
                onClick={() => handleSelectUser(user)}
                className={`w-full  text-white p-3 mb-4 flex items-center justify-between rounded-lg transition-all duration-500 ${
                  selectedUser?._id === user._id
                    ? "bg-[#00058c] text-white"
                    : "bg-[#1a1a1a] text-white hover:bg-[#1f1e1e] opacity-75"
                }`}
              >
                <div className="  flex items-center gap-3 w-full">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div className="font-extrabold  ml-2 flex flex-col w-full">
                    <div className="text-white  text-ellipsis   font-semibold text-left">{user.fullName}</div>
                    <div className="text-[#ffffff] font-thin text-base text-left overflow-hidden ">
                      {truncateText(user.about || "", 16)}
                    </div>
                  </div>
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute m-9 mb-3 mt-12 w-3 h-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
                </div>

                <div className="flex flex-col items-end">
                  {lastUnread && (
                    <div className="text-xs h-4  font-bold  text-white">
                      {new Date(lastUnread).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                  )}
                  {unreadCount > 0 && (
                    <span className="w-6 h-6 mt-2 mr-1 bg-[#0808ff] text-white text-sm text-center -pt-2  flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
