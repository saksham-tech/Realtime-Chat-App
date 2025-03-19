import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser:  null,
  isUsersLoading: false,
  isMessagesLoading: false,
  unreadMessages: JSON.parse(localStorage.getItem("unreadMessages")) || {},
  pinnedChats: [],
  archivedChats: [],
  isChatContainerVisible: false,
  isToggleBarVisible: true,
  isGroupsVisible: false,

  toggleGroupsVisibility: () => {
    const { isGroupsVisible } = get();
    if (!isGroupsVisible) {
      set({
        isGroupsVisible: true,
        isChatContainerVisible: true,
      });
    }
  },

  toggleToggleBar: () => {
    set((state) => ({
      isToggleBarVisible: true, // Always keep the ToggleBar visible
      isGroupsVisible: false,  // Hide Groups when the chat icon is clicked
    }));
  },

  setSelectedUser :(selectedUser ) => set({ selectedUser  }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      console.log("Fetched users:", res.data); // Debugging log
      const onlineUsers = useAuthStore.getState().onlineUsers;
      const usersWithStatus = res.data.map(user => ({
        ...user,
        isOnline: onlineUsers.includes(user._id),
      }));
      set({ users: usersWithStatus });
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  
  createUser: async (userData) => {
    try {
      const res = await axiosInstance.post("/messages/users", userData); // Adjust the endpoint as necessary
      const newUser = res.data;
  
      // Directly adding the new user to the users state
      set((state) => ({
        users: [...state.users, { ...newUser, isOnline: false }],
      }));
  
      // Optionally call getUsers again to ensure the full list is updated
      await get().getUsers();
  
      toast.success("User created successfully");
    } catch (error) {
      toast.error("Failed to create user: " + error.response?.data?.message || error.message);
    }
  },
  
  

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      const unreadMessages = get().unreadMessages;
      unreadMessages[userId] = [];
      set({ messages: res.data, unreadMessages });
      // Save to localStorage
      localStorage.setItem("unreadMessages", JSON.stringify(unreadMessages));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser , messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser ._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const { selectedUser , messages, unreadMessages, users } = get();
      if (newMessage.senderId !== selectedUser ?._id) {
        unreadMessages[newMessage.senderId] = [
          ...(unreadMessages[newMessage.senderId] || []),
          newMessage,
        ];
        // Move the user to the top of the list
        const updatedUsers = users.filter(user => user._id !== newMessage.senderId);
        const senderUser  = users.find(user => user._id === newMessage.senderId);
        if (senderUser ) {
          updatedUsers.unshift(senderUser );
        }
        set({ users: updatedUsers, unreadMessages });
      } else {
        set({ messages: [...messages, newMessage] });
      }
      // Save to localStorage
      localStorage.setItem("unreadMessages", JSON.stringify(unreadMessages));
    });
  },

  clearUnreadMessages: (userId) => {
    const unreadMessages = get().unreadMessages;
    unreadMessages[userId] = [];
    set({ unreadMessages });
    // Save to localStorage
    localStorage.setItem("unreadMessages", JSON.stringify(unreadMessages));
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("getOnlineUsers");
  },

  pinChat: (userId) => {
    const { pinnedChats } = get();
    if (!pinnedChats.includes(userId)) {
      set({ pinnedChats: [...pinnedChats, userId] });
    }
  },

  unpinChat: (userId) => {
    const { pinnedChats } = get();
    set({
      pinnedChats: pinnedChats.filter((id) => id !== userId),
    });
  },
}));