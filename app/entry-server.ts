//@ts-ignore
import { createApp } from "./app";
// createApp

// const { createApp } = require('./App.js');

// @ts-ignore
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    router.push(context.url);
    router.onReady(() => {
      // const matchedComponents = router.getMatchedComponents();
      // if (!matchedComponents.length) {
      //   return reject({ code: 404 });
      // }
      // console.log("Gol")
      context.rendered = () => {
        context.state = store.state;
      };
      return resolve(app);
    }, reject);
  });
};
