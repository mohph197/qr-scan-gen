const express = require("express");
// const https = require("https");
// const fs = require("fs");
const qr = require("qrcode");

const PORT = 3000;
// const certificate = fs.readFileSync("./public/sslcert/cert.pem", "utf-8");
// const privateKey = fs.readFileSync("./public/sslcert/key.pem", "utf-8");
// const credentials = { key: privateKey, cert: certificate };

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(require("morgan")("dev"));

app.get("/", (req, res) => res.render("index"));

app.get("/scan", (req, res) => res.render("scan"));

app.post("/create", (req, res) => {
  const url = req.body.url;
  if (url.length === 0) res.send("Empty Data!");
  qr.toDataURL(url, (err, src) => {
    if (err) res.send("Error occured");
    res.render("qr-result", { src });
  });
});

// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(PORT);
app.listen(PORT);
