<template>
  <div>
    <div class="row control_container d-flex justify-content-between align-items-center p-2">
      <canvas ref="canvas"></canvas>
      <!-- <div ref="d3_container" class="d3_container"></div> -->
      <div class="col-sm-3 col-md-2">
        <img
          :src="audio_src.data ? audio_src.data.imagen : 'https://i.ytimg.com/vi/9qz7lMsFUJU/hqdefault.jpg'"
          class="img-fluid"
        />
      </div>
      <div class="col-sm col-md-6 d-flex flex-column justify-content-center align-items-center">
        <div class="row d-flex flex-column justify-content-center align-items-center">
          <div class="col-12 mb-2">
            <div class="progress" style="height:.2rem">
              <div
                class="progress-bar bg-danger"
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
            <h6 style="color: white;">{{ audio_src.data ? audio_src.data.titulo : '' }}</h6>
          </div>
        </div>
      </div>
      <div class="col-sm-2 col-md-2 d-flex justify-content-center align-items-center flex-column">
        <h5 style="color: white;" class="_currentTime">{{ state.readableCurrentTime }}</h5>
        <h6 class="_duration">{{ state.readableDuration }}</h6>
      </div>
      <div class="col-sm-2 col-md-2">
        <button class="btn btn-secondary circle_" @click="togglePlay">
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
import * as d3 from "d3";

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
    audio_src: function(newValue, olValue) {
      if (this.audio_src) {
        const source = this.audio_src.data.audiostream[
          this.audio_src.data.audiostream.length - 1
        ].url;
        let observer = this.playStream(source);

        var audioCtx = new AudioContext();
        var analyser = audioCtx.createAnalyser();
        var audiosrcCtx = audioCtx.createMediaElementSource(this.audioObj);
        audiosrcCtx.connect(analyser);
        analyser.connect(audioCtx.destination);

        analyser.fftSize = 16384;
        var bufferLength = analyser.frequencyBinCount;

        var frequencyData = new Uint8Array(bufferLength);

        console.log("DATA frequency", frequencyData);

        // D3 IMPLEMENTACION

        // var svgHeight = "300";
        // var svgWidth = "1200";
        // var barPadding = "1";

        // function createSvg(parent, height, width) {
        //   return d3
        //     .select(parent)
        //     .append("svg")
        //     .attr("height", height)
        //     .attr("width", width);
        // }

        // var svg = createSvg(this.$refs["d3_container"], svgHeight, svgWidth);

        // svg
        //   .selectAll("rect")
        //   .data(frequencyData)
        //   .enter()
        //   .append("rect")
        //   .attr("x", function(d, i) {
        //     return i * (svgWidth / frequencyData.length);
        //   })
        //   .attr("width", svgWidth / frequencyData.length - barPadding);

        // function renderChart() {
        //   requestAnimationFrame(renderChart);

        //   // Copy frequency data to frequencyData array.
        //   analyser.getByteFrequencyData(frequencyData);

        //   // Update d3 chart with new data.
        //   svg
        //     .selectAll("rect")
        //     .data(frequencyData)
        //     .attr("y", function(d) {
        //       return svgHeight - d;
        //     })
        //     .attr("height", function(d) {
        //       return d;
        //     })
        //     .attr("fill", function(d) {
        //       return "rgb(0, 0, " + d + ")";
        //     });
        // }

        // END D3 IMPLEMENTACION

        // Canvas config
        var canvas = this.$refs["canvas"];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        const barWidth = (WIDTH / bufferLength) * 13;
        console.log("barWidth", barWidth);

        let barHeight;
        let x = 0;

        // function renderFrame() {
        //   // console.log("Me llama")
        //   requestAnimationFrame(renderFrame);
        //   x = 0;
        //   analyser.getByteFrequencyData(frequencyData);
        //   ctx.fillStyle = "rgba(0,0,0,.5)";
        //   ctx.fillRect(0, 0, WIDTH, HEIGHT);
        //   let r, g, b;
        //   let bars = 5;

        //   for (let i = 0; i < bars; i++) {
        //     barHeight = frequencyData[i] * 2.5;
        //     if (frequencyData[i] > 210) {
        //       r = 250;
        //       g = 0;
        //       b = 255;
        //     } else if (frequencyData[i] > 200) {
        //       r = 250;
        //       g = 255;
        //       b = 0;
        //     } else if (frequencyData[i] > 190) {
        //       r = 204;
        //       g = 255;
        //       b = 0;
        //     } else if (frequencyData[i] > 180) {
        //       r = 0;
        //       g = 219;
        //       b = 131;
        //     } else {
        //       r = 0;
        //       g = 199;
        //       b = 255;
        //     }
        //     ctx.fillStyle = `rgb(${r},${g},${b})`;
        //     ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        //     x += barWidth + 10; // Gives 10px space between each bar
        //   }
        // }

        this.play();

        // TODO: Pacere que se manejan en dos contextos diferentes con la linea siguiente si renderiza
        // las barras
        // this.$refs['audioRef'].play();
        observer.subscribe(event => {
          x = 0;
          analyser.getByteFrequencyData(frequencyData);
          ctx.fillStyle = "rgb(26,26,26)";
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
          let r, g, b;
          let bars = 128;

          for (let i = 0; i < bars; i++) {
            barHeight = frequencyData[i] * 2.5;
            if (frequencyData[i] > 210) {
              r = 250;
              g = 0;
              b = 255;
            } else if (frequencyData[i] > 200) {
              r = 250;
              g = 255;
              b = 0;
            } else if (frequencyData[i] > 190) {
              r = 204;
              g = 255;
              b = 0;
            } else if (frequencyData[i] > 180) {
              r = 0;
              g = 219;
              b = 131;
            } else {
              r = 0;
              g = 199;
              b = 255;
            }
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
            x += barWidth + 10; // Gives 10px space between each bar
          }

          // renderChart();
          // console.log("REPRODUCIENDO");
        });
      }
    }
  },
  methods: {
    playStream(url) {
      return this.streamObservable(url).pipe(takeUntil(this.stop$));
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
        this.audioObj.crossOrigin = "anonymous";
        // "https://cors-anywhere.herokuapp.com/" +
        this.audioObj.src = "https://cors-anywhere.herokuapp.com/" + url;
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
  // position: relative;
  width: 100%;
  img {
    height: 85px;
  }
  .circle_ {
    border-radius: 50%;
  }
  ._duration {
    // color: rgba(26, 26, 26, 0.5);
    color: #fff;
  }
}

canvas {
  position: absolute;
  width: 100%;
  max-height: 100%;
}

.d3_container {
  position: absolute;
  right: 0;
  color: red;
  top: -250px;
  width: 250px;
  height: 200px;
}
</style>