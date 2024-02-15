const express = require("express");
const cors = require("cors");

const app = express();

var corsOpt = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOpt));

// parse requests of content-type 
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully Connected to the MongoDB!");
  })
  .catch(err => {
    console.log("Cannot connect to the MongoDB!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our Sample RESTful application." });
});

require("./app/routes/journal.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
