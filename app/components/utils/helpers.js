var axios = require("axios");
var helper = {
  // This logs in.
  login: function(username, password) {
    console.log(username);
    console.log(password);
    return axios.post("/loginUser", { username: username, password: password });
  },
  // This function hits our own server to retrieve the record of this user 
  getUser: function() {
    return axios.get("/userData");
  },
  registerUser: function(name, username, password, password2, email) {
    console.log('register user');
    return axios.post("/registerUser", {name: name, username: username, password: password, password2: password2, email: email, newRegistration: true});
  },
  postSearch: function(query){
    return axios.post("/user/:id/search", {query: query});
  },
  logout: function(){
    return axios.get("/logout");
  }

};
// We export the API helper
module.exports = helper;