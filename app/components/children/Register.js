// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var browserHistory = require("react-router").browserHistory;
var helpers = require("../utils/helpers");
var Register = React.createClass({
  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    console.log('got state?');
    return { name: "bob", username: "bobby", password: "google34" , password2: "google34", email: "bob@thing.com", errorMsgs: []};
  },
  // This function will respond to the user input
  handleChangeUsernameRegister: function(event) {
    this.setState({ username: event.target.value});
  },
  handleChangePasswordRegister: function(event) {
    this.setState({ password: event.target.value});
  },
  handleChangePasswordRepeatRegister: function(event) {
    this.setState({ password2: event.target.value});
  },
  // This function will respond to the user input
  handleChangeEmailRegister: function(event) {
    this.setState({ email: event.target.value});
  },
  // This function will respond to the user input
  handleChangeNameEmail: function(event) {
    this.setState({ name: event.target.value});
  },
  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
    // Set the parent to have the search term
    //this.props.setTerm(this.state.username, this.state.password);
    helpers.registerUser( this.state.name, this.state.username, this.state.password, this.state.password2, this.state.email)
    .then(function(response){
      if (response.data.constructor == Array){
        console.log(response);
        this.setState({errorMsgs: response.data});
      }       
      else if (response.data.newRegistration) {
        
      // this.props.router.push('/Login');        
        console.log("!!!!!!!!!!!!!!!!!"); 
        console.log(response);
        console.log(this.state);
        console.log("!!!!!!!!!!!!!!!!!");
        sessionStorage.setItem('newRegistration', response.data.newRegistration);
        
        browserHistory.push("/#/Login");
        location.reload();
      }

    }.bind(this));
    //this.setState({ username: "" , password: "", email: "", name: ""});
  },

  render: function() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Registration</h3>
            </div>
            <div className="panel-body">
              <p>Register here for Virtual Reality Passport</p>
                {this.state.errorMsgs.map(function(errorMessages, i) {
                  return (
                    <div className="alert alert-danger" key = {i}>{errorMessages.msg}</div>
                  );
                })}              
              <form onSubmit={this.handleSubmit} history= {this.props.history}>
                <div className="form-group">
                  {/*
                    Note how each of the form elements has an id that matches the state.
                    This is not necessary but it is convenient.
                    Also note how each has an onChange event associated with our handleChange event.
                  */}
                  <input
                    value={this.state.name}
                    type="text"
                    placeholder= "name"
                    className="form-control text-center"
                    id="name"
                    onChange={this.handleChangeNameRegister}
                    required
                  />
                  <input
                    value={this.state.username}
                    type="text"
                    placeholder= "username"
                    className="form-control text-center"
                    id="username"
                    onChange={this.handleChangeUsernameRegister}
                    required
                  />
                  <input
                    value={this.state.password}
                    type="password"
                    placeholder= "password"
                    className="form-control text-center"
                    id="password"
                    onChange={this.handleChangePasswordRegister}
                    required
                  />
                  <input
                    value={this.state.password2}
                    type="password"
                    placeholder= "repeat password"
                    className="form-control text-center"
                    id="passwordrepeat"
                    onChange={this.handleChangePasswordRepeatRegister}
                    required
                  />
                  <input
                    value={this.state.email}
                    type="text"
                    placeholder= "email"
                    className="form-control text-center"
                    id="email"
                    onChange={this.handleChangeEmailRegister}
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
    );
  }
});
module.exports = Register;
