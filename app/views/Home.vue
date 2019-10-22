<template>
  <div>
    <div class="row">
      <div class="col-md-12 col-sm-12 d-flex justify-content-center">
        <form class="form-inline row my-2 my-lg-0" @submit="search($event)">
          <input
            class="form-control"
            type="search"
            v-model="textSearch"
            placeholder="Buscar canción.."
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-sm-0 ml-2" type="submit">Buscar</button>
        </form>
      </div>
      <div class="col"></div>
    </div>
    <div
      v-if="isLoading"
      class="row d-flex justify-content-center align-items-center flex-column"
      style="height:50vh"
    >
      <Spinner />
    </div>
    <div v-else class="row">
      <div class="col-sm-12 col-md-6">
        <ul v-if="songs.length > 0" class="list-group" style="overflow: auto; height:60vh;">
          <li
            :key="i"
            v-for="(song,i) in songs"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ song.title}}
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge badge-secondary">{{ song.duration }}</span>
              <button
                class="btn btn-outline-secondary"
                style="padding: .1em;"
                @click="playSong(song)"
              >
                <i class="material-icons" style="font-size: 23px;">play_arrow</i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <MPControlBar class="mp_control_bar" :audio_src="currentSong" />
  </div>
</template>

<script>
import MPControlBar from "../components/MPControlBar";
import Spinner from "../components/Spinner";

import { mapActions } from "vuex";
import {
  LOAD_SONGS,
  SEARCH_SONGS,
  SEARCH_RESOURCE_SONG
} from "../store/types/actions-types";

export default {
  name: "Home",
  data() {
    return {
      textSearch: ""
    };
  },
  components: {
    MPControlBar,
    Spinner
  },
  computed: {
    songs() {
      if (this.$store.getters.songs.length > 0) {
        this.isSearch = false;
      }
      return this.$store.getters.songs;
    },
    currentSong() {
      return this.$store.getters.currentSong;
    },
    isLoading() {
      return this.$store.getters["ui/isLoading"];
    }
  },
  sockets: {
    connect() {
      console.log("Socket conectado");
    }
  },
  methods: {
    search: function($event) {
      $event.preventDefault();
      if (this.textSearch != "") {
        this.searchSongs(this.textSearch);
        // this.$store.dispatch('IS_LOADING', true);
      }
    },
    playSong(song) {
      this.searchResourceSong(song);
    },
    ...mapActions({
      searchSongs: SEARCH_SONGS,
      searchResourceSong: SEARCH_RESOURCE_SONG
    }),
    handlerClickButton: function() {
      console.log("handler click button");
      this.$socket.client.emit("test", { msg: "Mensaje de prueba " });
    },
    handlerClickButton2() {
      console.log("other click");
    }
  },
  serverPrefetch() {
    // console.log("Corriendo en el servidor");
  }
};
</script>
<style lang="scss">
.mp_control_bar {
  // height: 100px;
  width: 100%;
  background-color: rgba(26, 26, 26, 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
}

</style>