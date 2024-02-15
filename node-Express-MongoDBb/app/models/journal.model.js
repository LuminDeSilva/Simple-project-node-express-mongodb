module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      authors: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Journal = mongoose.model("journal", schema);
  return Journal;
};
