// import { createApp } from './App';
//@ts-ignore
import { createApp } from "./app";
const { app, store, router } = createApp();
const PREFIX = "SOCKET_";

router.onReady(() => {
  // @ts-ignore
  if (window.__INITIAL_STATE__) {
    // @ts-ignore
    store.replaceState(window.__INITIAL_STATE__);
  }
  app.$mount("#app", true);
});
