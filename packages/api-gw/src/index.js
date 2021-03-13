const startServer = require('./delivery/http/server');

startServer()
  .then(() => console.log(`Server running at http:localhost:${process.env.SERVER_PORT || 3000}`))
  .catch(err => console.error(`Something went wrong: ${err.message}`));
