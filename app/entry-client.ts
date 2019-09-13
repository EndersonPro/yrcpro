// import { createApp } from './App';
//@ts-ignore
import { createApp } from "./app";
const { app, store, router } = createApp();
const PREFIX = "SOCKET_";

router.onReady(() => {
  // console.log("Abeeeer estado si o no?")
 
  // @ts-ignore
  if (window.__INITIAL_STATE__) {
    // Vue.use(
    //   new VueSocketIO({
    //     debug: true,
    //     connection: "http://localhost:8000/",
    //     vuex: {
    //       store,
    //       actionPrefix: "SOCKET_",
    //       mutationPrefix: "SOCKET_"
    //     }
    //   })
    // );

    // @ts-ignore
    store.replaceState(window.__INITIAL_STATE__);
  }

  // app.$

  app.$mount("#app", true);
});
