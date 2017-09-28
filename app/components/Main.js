// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var MostPopular = require("./children/MostPopular");
var Userpage = require("./children/Userpage");
var login = require("./children/login");
var helpers = require("./utils/helpers");
// Helper for making AJAX requests to our API
//var helpers = require("./utils/helpers");
// Creating the Main component
var Main = React.createClass({
  // Here we set a generic state associated with the username and pword fields
  // Note how we added in that history state variable
  getInitialState: function() {
    console.log("thing!!!!!!!!!!!!")
    return {_id: "", email: "", searches: "", username: "", popSearches:[]};

  },

  componentWillMount: function() {
      var that = this;
      helpers.getUser().then(function(userdata){
        var id = userdata.data._id;
        var email = userdata.data.email;
        var searches = userdata.data.searches;
        var username = userdata.data.username;
        that.setState({_id: id, email:email, searches:searches, username: username});
        console.log(that.state);
      });

      helpers.getSearches().then(function(searchData){
        console.log(searchData);
        that.setState({popSearches: searchData.data})
      });
  },
   // If the component changes (i.e. if a search is entered)...


  handleChange: function(event) {
      this.setState({ searchTerm: event.target.value });
  },

  handleGo: function () {
      window.location.replace("google.html");
  },

  handleSubmit: function() {
     event.preventDefault();
     var that = this;
    // Run the query for the address
    helpers.runQuery(that.state.searchTerm).then(function(data) {
      if (data !== that.state.results) {
        console.log("Address", data);
        console.log(data.geometry.lat);
        console.log(data.geometry.lng);
        console.log(data.formatted);
        that.setState({ resultsAddress: data.formatted, resultsCoords: data.geometry});
        sessionStorage.setItem("lat", data.geometry.lat);
        sessionStorage.setItem("lng", data.geometry.lng);
        console.log(that.state._id, that.state.resultsAddress);
        // After we've received the result... then post the search term to our searches.
        helpers.postSearchQuery(that.state.resultsAddress).then(function(response) {
          console.log("Updated!");
          that.setState({searches: response.data.searches });         // After we've done the post... then get the updated searches
          helpers.getSearches().then(function(searchData){
            console.log(searchData);
            that.setState({popSearches: searchData.data})
          });
        });
      }
    });
  },

  handleDelete: function (event) {
    var that = this;
    console.log("Clicked delete!!!!!");
    console.log(event.target.value);
    console.log(that.state._id);
    helpers.deleteSearch(event.target.value, that.state._id).then(function(response){
        console.log(response);      
        that.setState({searches: response.data.searches });
    });
  },

  handleLogout: function () {
    helpers.logout();
  },

  // Here we render the function
  render: function() {
    const that = this;
    var kid;
    const children = React.Children.map(that.props.children, function(child) {
            kid = React.cloneElement(child, { _id: that.state._id, email: that.state.email, searches: that.state.searches, username: that.state.username, address: that.state.results, handleDelete: that.handleDelete, popSearches: that.state.popSearches});
          });
    return (
      <div className = "component">
        <nav className="navbar navbar-default" style={{backgroundColor:"transparent !important", border: "1px solid #1da1f2"}}> 
          <div className="container-fluid">
            <div className="navbar-header">
              <img src ="./images/BlackCircle.png" height="40px" width="40px" style= {{marginBottom:"-25px"}} ></img>
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">  
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><span className="sr-only">(current)</span></li>
                <li></li>
              </ul>
              <form className="navbar-form navbar-left" onSubmit= {that.handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" onChange={that.handleChange}></input>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
                  <a className="navbar-brand" href="#" >Virtual Reality Passport</a>
              <ul className="nav navbar-nav navbar-right" m="middle">
                <li><a href="login.html" onClick= {that.handleLogout} style={{color: "white"}}>{that.state.status}</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><Link to="/allUsers">Friends</Link></li>
                    <li><Link to="/MostPopular">Most Popular</Link></li>
                    <li><Link to="/">Back to Home</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="login.html" onClick= {that.handleLogout}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="jumbotron" style={{backgroundColor:"transparent !important", border: "1px solid #1da1f2"}}>
            <div className= "row">
              <div className= "col-md-7">
                <h2><strong>Hello, {that.state.username}. Welcome to VRP.</strong></h2>
                <p><em>Are you ready for a journey through the world in 3D?</em></p>
                <br></br>
                <p><em>Search result...{that.state.resultsAddress}</em></p>
                <hr />
              </div>
              <div className="col-md-5">
                <button type="button" className="btn btn-secondary btn-lg" style={{backgroundColor:"transparent !important", border: "1px solid #1da1f2", color: "#1da1f2"}} onClick={that.handleGo}>go!</button>
              </div>
            </div>
          </div>
            <div className="row">
              {/* that code will dump the correct Child Component */}
              {kid}
            </div>
        </div>
      </div>
    );
  }
});
// Export the component back for use in other files
module.exports = Main;