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
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get("/cdn", (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cdn'));
});


app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
