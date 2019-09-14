<template>
  <div>
    <MPControlBar class="mp_control_bar" :audio_src="src" />
  </div>
</template>

<script>
import MPControlBar from "../components/MPControlBar";

export default {
  name: "Home",
  data() {
    return {
      src:
        "https://r2---sn-hv8pnu5gjv-c59l.googlevideo.com/videoplayback?expire=1568450857&ei=yVR8Xf2kCsGBir4PodWW6Ag&ip=198.37.123.37&id=o-AESYrcs2UXPUrslc0-YKmvWjIA3Ant8Li4DdEGmap7H7&itag=251&source=youtube&requiressl=yes&mime=audio%2Fwebm&gir=yes&clen=4396007&dur=256.581&lmt=1552083972950728&fvip=2&keepalive=yes&c=WEB&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=ALgxI2wwRAIgCqfBhwacns8OO7K3ZpITIhjAGlW969Y4GKhlSTJb4zwCIGaCNVnKjGcdfsI9IPXhLTsJVzODCdJTXv2SFl2GcZnv&ratebypass=yes&redirect_counter=1&rm=sn-vgqeey7l&req_id=aa6ecd77e551a3ee&cms_redirect=yes&ipbypass=yes&mip=167.0.100.12&mm=31&mn=sn-hv8pnu5gjv-c59l&ms=au&mt=1568429135&mv=m&mvi=1&pl=19&lsparams=ipbypass,mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRAIgXE1xhSLShKTcLcIZ4G1zaWriwISAP7uE_wosoDjKE7sCIGDLPAws9BrScWC35rYShmiz-DNIbQD7JjSt78m4o7Ur"
    };
  },
  components: {
    MPControlBar
  },
  sockets: {
    connect() {
      console.log("Socket conectado");
    }
  },
  methods: {
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
  background-color: rgba(26,26,26,.1);
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>