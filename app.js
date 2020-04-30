const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const layout = require("./views/layout");
const models = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

const init = async () => {
  models.db.sync({ force: true });
  app.listen(3000, () => {
    console.log(`Server is listening in port 3000`);
  });
};

init();
