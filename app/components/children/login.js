// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var helpers = require("../utils/helpers");
var Login = React.createClass({
  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { username: "", password: "", visible: false, successMsg: [], errorMsg: [], username: "" };
  },

   // The moment the page renders find out if the user just registered by pulling from sessionStorage
  componentWillMount: function() {
      if (sessionStorage.newRegistration) {
        sessionStorage.removeItem("newRegistration");
        this.setState({successMsg: ["Thank you for registering! You may now login."]});
      } 
      if (localStorage._id) {
        var that = this;
        that.props.setLogOut(localStorage._id, function(userdata){
          that.setState({username: userdata.data.username});
        });     
      }
  },

  // This function will respond to the user input
  handleChangeUsername: function(event) {
    this.setState({ username: event.target.value});
  },
  handleChangePassword: function(event) {
    this.setState({ password: event.target.value});
  },
  // When a user submits...
  handleSubmit: function(event) {
    var that = this;
    if (sessionStorage.newRegistration) {
      sessionStorage.removeItem("newRegistration");
    }
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    // Set the parent to have the search term
    //this.props.setTerm(this.state.username, this.state.password);
    helpers.login(this.state.username, this.state.password)
      .then(function(response){
        if (response) {
          var id = response.data._id;
          localStorage.setItem("_id", response.data._id);
          // Update the userpage with the new login information.
          that.props.setLogOut(localStorage._id, function(userdata){
            that.setState({username: userdata.data.username});
          });   
        } else {
          that.setState({errorMsg: ["There was an error logging in.  Check your username and password."], loggedIn: false});
        }
        //this.setState({username: response.data.username, email: response.data.email, loggedIn: true);
    }.bind(this)).catch(function(err){
      this.setState({errorMsg: ["There was an error logging in.  Check your username and/or password."]})
    }.bind(this));
    //this.setState({ username: "" , password: ""});
  },

  render: function() {
    if (localStorage._id) {
      return (
        <div className="container">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Userpage</h3>
              </div>
              <div className="panel-body">
                  
                <div className="alert alert-success" role = "alert">Hello {this.state.username}, you are now logged in.</div>
                  
              </div>
            </div>
          </div>
        </div>
      )
    } 

    else {
      return (
        <div className="container">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Log-In Form</h3>
              </div>
              <div className="panel-body">
                  
                {this.state.successMsg.map(function(success, i) {
                  return (
                    <div className="alert alert-success" key = {i}>{success}</div>
                  );
                })}      
                {this.state.errorMsg.map(function(nologin, i) {
                  return (
                    <div className="alert alert-danger" role = "alert">{nologin}</div>
                  );
                })}      
                
                  
                  <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    {/*
                      Note how each of the form elements has an id that matches the state.
                      This is not necessary but it is convenient.
                      Also note how each has an onChange event associated with our handleChange event.
                    */}
                    <input
                      value={this.state.username}
                      type="text"
                      placeholder= "username"
                      className="form-control text-center"
                      id="username"
                      onChange={this.handleChangeUsername}
                      required
                    />
                    <input
                      value={this.state.password}
                      type="password"
                      placeholder= "password"
                      className="form-control text-center"
                      id="username"
                      onChange={this.handleChangePassword}
                      required
                    />
                    <br />
                    <button
                      className="btn btn-primary"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
});
module.exports = Login;