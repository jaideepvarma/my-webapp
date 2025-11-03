const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
 res.send(`
  Hello from my web app running on AWS EC2 using Docker & Jenkins!<br>
  🚀 Auto-deployment test successful! This update was deployed automatically via Jenkins webhook.
`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
