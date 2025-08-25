const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('./config');
const { json } = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.get("/", (req, res) => {
// let repoInfo;
// axios({
//     method: "get",
//     url: `https://api.github.com/users/${config.githubUsername}/repos`,
//     headers: {
//         Authorization: `Bearer ${config.githubToken}`,
//         "Content-Type": "application/json",
//         "Accept": "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
//     }
// }).then(response => {
//    repoInfo = response.data;
//    res.render('index', {
//     repoInfo: repoInfo
// });
// }
// .catch(err => {
//     console.log(err);
// });
res.render('index')
})

app.get("/projects", (req, res) => {
let repoInfo;
axios({
method: "get",
url: `https://api.github.com/users/${config.githubUsername}/repos`,
headers: {
Authorization: `Bearer ${config.githubToken}`,
"Content-Type": "application/json",
"Accept": "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
}
}).then(response => {
repoInfo = response.data;
res.render('projects', {
repoInfo: repoInfo
});
})
.catch(err => {
console.log(err);
});
});

const form = document.querySelector('.contact__form');
const notifications = document.getElementById('notifications');

form.addEventListener('submit', async function (e) {
  e.preventDefault(); // stop page reload

  const formData = new FormData(form);
  const response = await fetch(form.action, {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    showNotification("✅ Message sent successfully!", "success");
    form.reset();
  } else {
    showNotification("❌ Something went wrong. Please try again!", "error");
  }
});

function showNotification(message, type) {
  const notif = document.createElement('div');
  notif.className = `notification ${type}`;
  notif.textContent = message;

  notifications.appendChild(notif);

  // Remove after animation ends (3.4s total)
  setTimeout(() => {
    notif.remove();
  }, 3400);
}

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})
