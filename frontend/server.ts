// Change extension to server.js if you prefer JavaScript
const https = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const { IncomingMessage, ServerResponse } = require("http"); // Still works with TypeScript

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "dev.kinto.xyz";
const port = parseInt(process.env.PORT || "3001", 10);

// Certificate files for HTTPS
const httpsOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_FILE || "dev.kinto.xyz+3-key.pem"),
  cert: fs.readFileSync(process.env.SSL_CRT_FILE || "dev.kinto.xyz+3.pem"),
};

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req: any, res: any) => {
      try {
        const parsedUrl = parse(req.url, true); // Non-null assertion not needed in CommonJS
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error handling request:", err);
        res.statusCode = 500;
        res.end("Internal server error");
      }
    })
    .listen(port, hostname, () => {
      console.log(`> Server running on https://${hostname}:${port}`);
    });
});
