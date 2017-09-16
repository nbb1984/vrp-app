// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var Register = require("./children/Register");
var Userpage = require("./children/Userpage");
var login = require("./children/Login");
var helpers = require("./utils/helpers");
// Helper for making AJAX requests to our API
//var helpers = require("./utils/helpers");
// Creating the Main component
var Main = React.createClass({
  // Here we set a generic state associated with the username and pword fields
  // Note how we added in this history state variable
  getInitialState: function() {
    var loggedIn = "Login";
    if (localStorage.vrpUsername) {
      loggedIn = "Logout";
    } 

    return {username: "", password: "", status: loggedIn};

  },

  setLogIn: function() {
    localStorage.removeItem("vrpUsername");
    console.log(localStorage.vrpUsername);
    location.reload();

  },

  setLogOut: function() {
    this.setState({ status: "Logout" });
  },

  // Here we render the function
  render: function() {
    var children = React.Children.map(this.props.children, function(child) {
            React.cloneElement(child, { setLogOut: this.setLogOut});
          }.bind(this))
    return (

      <div className="container">
        <div className="jumbotron">
          <h2><strong>Welcome to Vrp</strong></h2>
          <p><em>A journey through the world in 3D</em></p>
          <hr />
          <p>
            <Link to="/Register"><button className="btn btn-primary btn-lg">Register</button></Link>
            <Link to="/Login"><button className="btn btn-danger btn-lg" onClick={this.setLogIn}>{this.state.status}</button></Link>
          </p>
        </div>
        <div className="row">
          {/* This code will dump the correct Child Component */}
          {this.props.children}
        </div>
      </div>
    );
  }
});
// Export the component back for use in other files
module.exports = Main;