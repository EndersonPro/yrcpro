<template>
  <div>
    <p>Hola mundoo</p>
    <button v-on:click="handlerClickButton()">click me</button>
    <button @click="handlerClickButton2">click me 2</button>
  </div>
</template>

<script>
export default {
  name: "Home",
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
    handlerClickButton2(){
      console.log("other click")
    }
  },
  serverPrefetch() {
    // console.log("Corriendo en el servidor");
  }
};
</script>