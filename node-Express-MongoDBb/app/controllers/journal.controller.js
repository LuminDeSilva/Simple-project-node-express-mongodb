const db = require("../models");
const Journal = db.journals;

// Create and Store a new Journal
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Journal
  const journal = new Journal({
    title: req.body.title,
    authors: req.body.authors,
    published: req.body.published ? req.body.published : false
  });

  // Store a Journal in the database
  journal
    .save(journal)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Journal."
      });
    });
};

// Retrieve all journals from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Journal.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving journals."
      });
    });
};

// Find a single journal with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Journal.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found journal with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving journal with id=" + id });
    });
};

// Update a journal by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Journal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update journal with id=${id}. Maybe journal was not found!`
        });
      } else res.send({ message: "Journal was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating journal with id=" + id
      });
    });
};

// Delete a journal with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Journal.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete journal with id=${id}. Maybe journal was not found!`
        });
      } else {
        res.send({
          message: "Journal was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete journal with id=" + id
      });
    });
};

// Delete all journals from the database.
exports.deleteAll = (req, res) => {
  Journal.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Journals were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Journals."
      });
    });
};

// Find all published Journals
exports.findAllPublished = (req, res) => {
  Journal.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving journals."
      });
    });
};
