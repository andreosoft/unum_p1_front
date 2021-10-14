import axios from "./../config/axios";
import api from "./../config/api";
import router from "./../router";
const state = {
  chats: [],
  messages: [],
  messagesFetched: false,
  selectedChat: null,
};
const getters = {
  getSelectChatById: (state) => (id) => {
    return state.chats && state.chats.find((chat) => chat.id === id);
  },
  getConsilliumChats(state) {
    return state.chats.filter((chat) => chat.type === 3);
  },
  getChatsButConsilliums(state) {
    return state.chats.filter((chat) => chat.type !== 3);
  },
};
const mutations = {
  SET_CHATS(state, chats) {
    chats.map((chat) => {
      try {
        chat.info = JSON.parse(chat.info);
      } catch {
        chat.info = {};
      }
    });
    state.chats = chats;
  },
  SET_MESSAGES(state, messages) {
    messages.sort((a, b) => (a.createdon > b.createdon ? 1 : -1));
    messages.map((message) => {
      message.attachments = JSON.parse(message.attachments);
      if (message.attachments === null || !message.attachments.length) {
        message.attachments = [];
      }
    });
    state.messages = messages;
  },
  SET_MESSAGES_FETCHED(state, payload) {
    state.messagesFetched = payload;
  },
  SET_SELECTED_CHAT(state, chat) {
    state.selectedChat = chat;
  },
};
const actions = {
  fetchCurrentUserMessages({ commit }, chat_id) {
    // console.log("fetching messages", chat_id);
    return axios
      .get(api.getUserMessages + `/${chat_id}`, {
        params: {
          pager: { count: 0, limit: 25, page: 0 },
        },
      })
      .then((res) => {
        commit("SET_MESSAGES", res.data.data);
        // console.log(res, "messages fetched");
        commit("SET_MESSAGES_FETCHED", true);
      });
  },
  postMessage({ dispatch }, { message, chat_id }) {
    return axios.post(api.postMessage + `/${chat_id}`, message).then((res) => {
      dispatch("fetchCurrentUserMessages", chat_id);
    });
  },
  fetchChats({ commit }) {
    return axios.get(api.getUserChats).then((res) => {
      commit("SET_CHATS", res.data.data);
      // console.log(res.data.data, "chats fetched");
    });
  },
  createNewChat({ dispatch }, id) {
    console.log({ to_id: String(id) });
    return axios.post(api.createNewChat, { to_id: String(id) }).then((res) => {
      const chat_id = res.data.data.chat_id;
      dispatch("fetchChats");
      router.push({ name: "Chat", params: { id: chat_id } });
    });
  },

  createNewGroupChat({ commit }, { name, info = "{}" }) {
    const type = "2";
    const payload = {
      type,
      name,
      info,
    };
    return axios.post(api.newGroupChat, payload).then((res) => {
      return res.data.data.chat_id;
    });
  },
  createNewConsiliumChat({ commit }, { data, name }) {
    const type = "3";
    const payload = {
      type,
      name,
      info: JSON.stringify(data),
    };
    return axios.post(api.newConsiliumChat, payload).then((res) => {
      return res.data.data.chat_id;
    });
  },
  addUserToGroupChat({ commit }, payload) {
    return axios.post(api.addUserToChat, payload).then((res) => {
      //
    });
  },
  setSelectedChat({ commit }, chat) {
    commit("SET_SELECTED_CHAT", chat);
  },
  postImage(_, file) {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(api.postImage, formData).then((res) => {
      return res.data.data.file;
    });
  },
  postFile(_, file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    return axios
      .post(api.postFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data.data.file;
      });
  },

  deleteChat({ dispatch }, chatId) {
    console.log(chatId);
    return axios.delete(api.delete_chat + `/${chatId}`).then(async () => {
      await dispatch("fetchChats");
      router.push({ name: "Chats" });
    });
  },
  clearChatHistory({ dispatch }, chatId) {
    return axios.delete(api.clear_chat_history + `/${chatId}`).then(() => {
      console.log("chat history cleared");
      dispatch("fetchCurrentUserMessages", chatId);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
