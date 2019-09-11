import { Server } from "./server/Server";
import { Request, Response } from "express";
import path from "path";
import { createRenderer, createBundleRenderer } from "vue-server-renderer";
import { readFileSync } from "fs";
import { env } from "./env";
import express from 'express';

const template = readFileSync(
  path.join(__dirname, "/app/index.template.html"),
  "utf-8"
);

let isProd: boolean = true;
let renderer: any;
if (isProd) {
  const clientManifest = require("./dist/vue-ssr-client-manifest.json");
  const serverBundle = require("./dist/vue-ssr-server-bundle.json");
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
    runInNewContext: false
  });
} else {
  // TODO: Configuracion para el desarrollo hotreloading
}

// renderer.renderToString()

// const renderer = createRenderer({
//   template: readFileSync(
//     path.join(__dirname, "app/index.template.html"),
//     "utf-8"
//   )
// });

const server: Server = Server.instance;

server.app.use("/dist", express.static(path.join(__dirname, "dist")));
server.app.get('/favicon.ico', (req, res) => res.status(204));
server.app.get("*", (req: Request, res: Response) => {
  const context = { url: req.url, ...env.context };
  // console.log(context);
  //@ts-ignore
  renderer.renderToString(context, (err, html) => {
    // console.log(html);
    if (err) {
      // console.error(err);
      // console.log(err)
      res.status(500).end("Internal Server Error");
      return;
    }
    res.send(html);
  });
});

server.init(() => console.log("Servidor Corriendo", server.port), 8000);
