//@ts-ignore
import { createApp } from "./app";
// createApp

// const { createApp } = require('./App.js');

// @ts-ignore
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    // console.log(context.url);
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      context.rendered = () => {
        // console.log("state-->", store.state);
        context.state = store.state;
      };
      return resolve(app);
    }, reject);
  });
};
