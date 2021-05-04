import { createStore } from 'vuex'

export default createStore({
  state: {
    connected: false,
    connection: null,
    msgLog: null,
  },
  mutations: {
    addConnection(state, socket) {
      state.connection = socket;
    },
    changeConnectionStatus(state, status) {
      state.connected = status;
      console.log("changed connection-status to", status);
    },
    setMsgLog(state, log) {
      state.msgLog = log;
    }
  },
  actions: {
  },
  modules: {
  }
})
