<template>
  <div class>
    <audio ref="audioRef">
      <source :src="audio_src" type="audio/mp3" />Este navegador no soporta
      <code>audio</code>
    </audio>
    <div class="row control_container d-flex justify-content-between align-items-center p-2">
      <div class="col-sm-3 col-md-2">
        <img
          :src="audio_src.data ? audio_src.data.imagen : 'https://i.ytimg.com/vi/9qz7lMsFUJU/hqdefault.jpg'"
          class="img-fluid"
        />
      </div>
      <div class="col-sm col-md-6 d-flex flex-column justify-content-center align-items-center">
        <div class="row d-flex flex-column justify-content-center align-items-center">
          <div class="col mb-2">
            <div class="progress" style="height:.2rem">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{
                  width: (state.currentTime / state.duration) * 100 + '%'}
                "
                :aria-valuenow="25"
                :aria-valuemin="0"
                :aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="col">
            <h6>{{ audio_src.data ? audio_src.data.titulo : '' }}</h6>
          </div>
        </div>
      </div>
      <div class="col-sm-2 col-md-2 d-flex justify-content-center align-items-center flex-column">
        <h5 class="_currentTime">{{ state.readableCurrentTime }}</h5>
        <h6 class="_duration">{{ state.readableDuration }}</h6>
      </div>
      <div class="col-sm-2 col-md-2">
        <button class="btn btn-primary circle_" @click="togglePlay">
          <i v-if="!state.playing" class="material-icons">play_arrow</i>
          <i v-else class="material-icons">pause</i>
        </button>
        <!-- <button class="btn btn-secondary" @click="pause">Pausa</button> -->
      </div>
    </div>
  </div>
</template> 

<script>
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import * as moment from "moment";

export default {
  name: "MPControlBar",
  props: ["audio_src"],
  data() {
    return {
      stop$: new Subject(),
      audioObj: null,
      audioEvents: [
        "ended",
        "error",
        "play",
        "playing",
        "pause",
        "timeupdate",
        "canplay",
        "loadedmetadata",
        "loadstart"
      ],
      stateChange: new BehaviorSubject(this.state),
      state: {
        playing: false,
        readableCurrentTime: "",
        readableDuration: "",
        duration: undefined,
        currentTime: undefined,
        canplay: false,
        error: false
      }
    };
  },
  mounted() {
    //   Creando instancia solo del lado del cliente
    this.audioObj = new Audio();
    //Inmediantamente se reciba una entrada de audio hacia el componente se reproduce
    // this.playStream(this.audio_src);
    // const source = this.audio_src.data.audiostream[
    //   this.audio_src.data.audiostream.length - 1
    // ].url;
    // console.log(source);
    // this.playStream(source);
  },
  watch: {
    audio_src: function() {
      console.log(this.audio_src);
      if (this.audio_src.data) {
        const source = this.audio_src.data.audiostream[
          this.audio_src.data.audiostream.length - 1
        ].url;
        console.log(source);
        this.playStream(source);
      }
    }
  },
  methods: {
    playStream(url) {
      this.streamObservable(url)
        .pipe(takeUntil(this.stop$))
        .subscribe(event => {
          console.log(event);
        });
    },
    togglePlay() {
      if (!this.state.playing) {
        this.play();
      } else {
        this.pause();
      }
    },
    play() {
      this.audioObj.play();
    },
    pause() {
      this.audioObj.pause();
    },
    stop() {
      this.stop$.next();
    },
    seekTo(seconds) {},
    updateStateEvents({ type }) {
      switch (type) {
        case "canplay":
          this.state.duration = this.audioObj.duration;
          this.state.readableDuration = this.formatTime(this.state.duration);
          this.state.canplay = true;
          break;
        case "playing":
          this.state.playing = true;
          break;
        case "pause":
          this.state.playing = false;
          break;
        case "timeupdate":
          this.state.currentTime = this.audioObj.currentTime;
          this.state.readableCurrentTime = this.formatTime(
            this.state.currentTime
          );
          break;
        case "error":
          this.resetState();
          this.state.error = true;
          break;
      }
      this.stateChange.next(this.state);
    },
    resetState() {
      this.state = {
        playing: false,
        readableCurrentTime: "",
        readableDuration: "",
        duration: undefined,
        currentTime: undefined,
        canplay: false,
        error: false
      };
    },
    streamObservable(url) {
      return new Observable(observer => {
        this.audioObj.src = url;
        this.audioObj.load();
        this.audioObj.play();
        const handler = event => {
          this.updateStateEvents(event);
          observer.next(event);
        };
        this.addEvents(this.audioObj, this.audioEvents, handler);
        let stream = () => {
          this.audioObj.pause();
          this.audioObj.currentTime = 0;
          this.removeEvents(this.audioObj, this.audioEvents, handler);
        };
        return stream;
      });
    },
    addEvents(obj, events, handler) {
      events.forEach(event => {
        obj.addEventListener(event, handler);
      });
    },
    removeEvents(obj, events, handler) {
      events.forEach(event => {
        obj.removeEventListener(event, handler);
      });
    },
    formatTime(time, format = "mm:ss") {
      const momentTime = time * 1000;
      return moment.utc(momentTime).format(format);
    }
  }
};
</script>

<style lang="scss">
.control_container {
  width: 100%;
  img {
    height: 85px;
  }
  .circle_ {
    border-radius: 50%;
  }
  ._duration {
    color: rgba(26, 26, 26, 0.5);
  }
}
</style>