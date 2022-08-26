const app = require("./config/express");
const config = require("./config/config");

//initialize mongodb
require("./config/mongoose");

//listen to the port
app.listen(config.port, () => {
  console.log(`server start on port ${config.port} ${config.env}`);
});
