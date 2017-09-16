var axios = require("axios");
var helper = {
  // This logs in.
  login: function(username, password) {
    console.log(username);
    console.log(password);
    return axios.post("/loginUser", { username: username, password: password });
  },
  // This function hits our own server to retrieve the record of query results
  getHistory: function(username) {
    console.log(username);
    return axios.get("/userData/" + username);
  },
  registerUser: function(name, username, password, password2, email) {
    console.log('register user');
    return axios.post("/registerUser", {name: name, username: username, password: password, password2: password2, email: email, newRegistration: true});
  }

};
// We export the API helper
module.exports = helper;