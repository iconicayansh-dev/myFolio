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
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use((req, res, next) => {
  if (req.hostname === 'cdn.ayansh.xyz') {
    express.static(path.join(__dirname, 'public/assets/img'))(req, res, next);
  } else {
    next();
  }
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
