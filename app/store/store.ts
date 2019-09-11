import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import socketIO, { Server as IOServer, Socket } from "socket.io";

interface RootState {
  io: String;
}
Vue.use(Vuex);

// Creando el manejador de estados...
const store: StoreOptions<RootState> = {
  state: {
    io: "Hola"
  },
  modules: {}
};

export function createStore() {
  return new Vuex.Store(store);
}
