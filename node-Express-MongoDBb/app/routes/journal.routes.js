module.exports = app => {
  const journals = require("../controllers/journal.controller.js");

  var router = require("express").Router();

  // Create a new journal
  router.post("/", journals.create);

  // Retrieve all journals
  router.get("/", journals.findAll);

  // Retrieve all published journals
  router.get("/published", journals.findAllPublished);

  // Retrieve a single jounals with id
  router.get("/:id", journals.findOne);

  // Update a journal with id
  router.put("/:id", journals.update);

  // Delete a journal with id
  router.delete("/:id", journals.delete);

  // Create a new journal
  router.delete("/", journals.deleteAll);

  app.use("/api/journals", router);
};
