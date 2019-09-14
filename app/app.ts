import Vue from "vue";
import App from "./App.vue";
import { createStore } from "./store/store";
import { createRouter } from "./router/router";
import { sync } from "vuex-router-sync";

import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import VueRx from 'vue-rx';

export function createApp() {
  const store = createStore();
  const router = createRouter();

  const socket = io("http://localhost:8000/");

  Vue.use(VueSocketIOExt, socket);
  Vue.use(VueRx);

  sync(store, router);
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  });
  return { store, app, router };
}

// export const funcRenderder = (callback:Function) => renderer.renderToString(App, callback);
