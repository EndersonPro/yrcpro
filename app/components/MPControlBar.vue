<template>
  <div>
    <audio ref="audioRef">
      <source :src="audio_src" type="audio/mp3" />Este navegador no soporta
      <code>audio</code>
    </audio>
    <div class="row d-flex justify-content-between flex-column align-items-center">
      <div class="col">
        <button @click="play">Play</button>
        <button @click="pause">Pausa</button>
      </div>
    </div>
  </div>
</template> 

<script>
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export default {
  name: "MPControlBar",
  props: {
    audio_src: {
      type: String,
      required: true
    }
  },
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
  },
  methods: {
    playStream(url) {
      this.streamObservable(url)
        .pipe(takeUntil(this.stop$))
        .subscribe(event => {
          console.log(event);
        });
    },
    play() {
      this.playStream(this.audio_src);
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
          //   this.state.readableDuration = this.formatTime(this.state.duration);
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
          //   this.state.readableCurrentTime = this.formatTime(
          //     this.state.currentTime
          //   );
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
    }
  }
};
</script>