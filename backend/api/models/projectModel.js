const mongoose = require("mongoose");

// define the schema for a sample, each sample has below properties.
const projectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  projectId: { type: String },
  public: {type: Boolean}
}
, { collection: 'stencilProjects' }
);

module.exports = mongoose.model("Project", projectSchema);