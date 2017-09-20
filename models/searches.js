// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;
// Create the Note schema
var SearchSchema = new Schema({
  // Just a string
  query: {
    type: String
  },
  userId: {
  	type: String
  }
});
// Remember, Mongoose will automatically save the ObjectIds of the searches
// These ids are referred to in the Article model
// Create the Note model with the NoteSchema
var Search = mongoose.model("Search", SearchSchema);
// Export the Note model
module.exports = Search;