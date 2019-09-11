// import { createApp } from './App';
//@ts-ignore
import { createApp } from './app';
const { app, store, router } = createApp();

router.onReady(() => {
  console.log("Abeeeer estado si o no?")
  // @ts-ignore
  if (window.__INITIAL_STATE__) {
    // @ts-ignore
    store.replaceState(window.__INITIAL_STATE__);
  }
  app.$mount("#app",true);
});
