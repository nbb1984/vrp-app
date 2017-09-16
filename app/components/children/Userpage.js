// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var Userpage = React.createClass({
  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    console.log('got state?');
    return {history: ""};
  },
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
        console.log("History", response.data);
        this.setState({ history: response.data });
    }.bind(this));
  },



  render: function() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">Child #2</h3>
            </div>
            <div className="panel-body">
              <div className="panel-body text-center">
                {/* Here we use a map function to loop through an array in JSX */}
                
                    <p>{this.state.history.username}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Userpage;