const app = require('express')();
const loaders = require('./loaders/index');
const config = require('./config/index');

loaders(app);

app.listen(config.port, () => {
  console.log(`Port is active in ${config.port}`);
});
