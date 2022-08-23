const express = require("express");
const path = require("path");
const port = process.env.PORT || 4260;
const app = express();

//hosting from dist folder
const launchpage = path.join(__dirname, "../dist");
app.use(express.static(launchpage));
console.log(`express hosting from ${launchpage}`);

//serving index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(launchpage, "index.html"));
});
console.log(`serving index.html`);

//initialize app and listen to port
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
