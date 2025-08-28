const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get("/cats-hub", (req, res) => {
  res.redirect("https://discord.gg/cats-hub-gg-freetag-945227072492691537");
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
