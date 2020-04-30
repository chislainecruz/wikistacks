const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const layout = require("./views/layout");
// const { db } = require("./models");
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

// db.authenticate().then(() => {
//   console.log("connected to the database");
// });

const init = async () => {
  models.db.sync({ force: true });
  app.listen(3000, () => {
    console.log(`Server is listening in port 3000`);
  });
};

init();
