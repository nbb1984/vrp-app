var axios = require("axios");
var geocodeAPI = "4f03af1a1ea4428891dd006b61a9b4be";
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

  getSearches: function(){
    return axios.get("/searches");
  },

  runQuery: function(location) {
    console.log(location);
    // Figure out the geolocation
    var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        console.log(response.data.results[0].geometry);
        console.log(response.data.results[0].geometry.lat);
        console.log(response.data.results[0].geometry.lng);
        return response.data.results[0];
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  postSearchQuery: function(query){
    return axios.post("/user/search", {query: query, hits: 1});
  },

  getOtherUsers: function(user) {
    return axios.get("/user/findall");
  },

  addFriend: function(id) {
    return axios.get("/user/addFriend/" + id);
  },

  deleteSearch: function(id, userId){
    console.log("hello");
    console.log(id);
    console.log(userId);
    return axios.get("/search/delete/" + id + "/" + userId);
  },

  logout: function(){
    return axios.get("/logout");
  }

};
// We export the API helper
module.exports = helper;