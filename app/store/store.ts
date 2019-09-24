import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import socketIO, { Server as IOServer, Socket } from "socket.io";
import error from "./modules/error";
import ui from "./modules/ui";
import axios from "axios";
import { RootState, Song } from "../interfaces/interfaces";
import { SET_SONG } from "./types/mutations-types";
import {
  LOAD_SONGS,
  SEARCH_SONGS,
  SEARCH_RESOURCE_SONG,
  LOAD_SONG_PLAY
} from "./types/actions-types";

Vue.use(Vuex);

export const initialCurrentSong: Song = {
  duration: 0,
  id: "",
  image: "",
  titulo: ""
};

// Creando el manejador de estados...
const store: StoreOptions<RootState> = {
  state: {
    io: "Hola",
    songs: [],
    currentSong: initialCurrentSong
  },
  getters: {
    songs: (state: RootState) => state.songs,
    currentSong: (state: RootState) => state.currentSong
  },
  actions: {
    [LOAD_SONGS]({ commit }, data: Object) {
      commit(SET_SONG, data);
    },
    [SEARCH_SONGS]({ commit, dispatch }, nameSearch: String) {
      dispatch("IS_LOADING", true);
      axios
        .get(`http://edy-api.noemec.com/api/search/${nameSearch}`)
        .then(({ data, status }) => {
          switch (status) {
            case 200:
              dispatch("IS_LOADING", false);
              dispatch(LOAD_SONGS, data);
              break;
            default:
              console.log("### ALGO RARO PASO XD ###");
          }
        })
        .catch(err => {
          dispatch("HANDLER_ERROR", {
            msg: "Ocurrio un error inesperado",
            err
          });
        });
    },
    [SEARCH_RESOURCE_SONG]({ commit, dispatch }, song: Song) {
      const { id } = song;
      console.log("hola");
      axios
        .get(`http://edy-api.noemec.com/api/${id}`)
        .then(({ data, status }) => {
          console.log(data);
          switch (status) {
            case 200:
              commit(LOAD_SONG_PLAY, data);
              break;
            default:
              console.log(
                "### ALGO RARO PASO XD En la busqueda para reproducir ###"
              );
          }
        });
    }
  },
  mutations: {
    [SET_SONG](state, songs: Array<Song>) {
      state.songs = songs;
    },
    [LOAD_SONG_PLAY](state, song: Song) {
      state.currentSong = song;
    }
  },
  modules: {
    error,
    ui
  }
};

export function createStore() {
  return new Vuex.Store(store);
}
