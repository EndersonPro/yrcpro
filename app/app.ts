import Vue from "vue";
import App from "./App.vue";
import { createStore } from "./store/store";
import { createRouter } from "./router/router";

import { sync } from "vuex-router-sync";

export function createApp() {
  const store = createStore();
  const router = createRouter();
  sync(store, router);
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  });
  return { store, app, router };
}

// export const funcRenderder = (callback:Function) => renderer.renderToString(App, callback);
