// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var MostPopular = require("./children/MostPopular");
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
    console.log("thing!!!!!!!!!!!!")
    return {_id: "", email: "", searches: "", username: ""};

  },

  componentWillMount: function() {
    var that = this;
    console.log("trying to get user");
    helpers.getUser().then(function(userdata){
      console.log(userdata);
      var id = userdata.data.id;
      var email = userdata.data.email;
      var searches = userdata.data.searches;
      var username = userdata.data.username;
      that.setState({_id: id, email:email, searches:searches, username: username});
      console.log(that.state);
    });
  },

  handleLogout: function () {
    helpers.logout();
  },

  // Here we render the function
  render: function() {
    const that = this;
    var kid;
    const children = React.Children.map(this.props.children, function(child) {
            kid = React.cloneElement(child, { _id: that.state._id, email: that.state.email, searches: that.state.searches, username: that.state.username});
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
              <form className="navbar-form navbar-left">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search"></input>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
                  <a className="navbar-brand" href="#" >Virtual Reality Passport</a>
              <ul className="nav navbar-nav navbar-right" m="middle">
                <li><a href="login.html" onClick= {this.handleLogout} style={{color: "white"}}>{this.state.status}</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Friends</a></li>
                    <li><Link to="/MostPopular">Most Popular</Link></li>
                    <li><Link to="/Userpage">Back to Home</Link></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="login.html" onClick= {this.handleLogout}>Logout</a></li>
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
                <h2><strong>Hello, {this.state.username}. Welcome to VRP.</strong></h2>
                <p><em>Are you ready for a journey through the world in 3D?</em></p>
                <br></br>
                <p><em>("Go!" button can link to the 3D element separately, or we can try to incorporate the search bar directly)</em></p>
                <hr />
              </div>
              <div className="col-md-5">
                <button type="button" className="btn btn-secondary btn-lg" style={{backgroundColor:"transparent !important", border: "1px solid #1da1f2", color: "#1da1f2"}}>go!</button>
              </div>
            </div>
          </div>
            <div className="row">
              {/* This code will dump the correct Child Component */}
              {kid}
            </div>
        </div>
      </div>
    );
  }
});
// Export the component back for use in other files
module.exports = Main;