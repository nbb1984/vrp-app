// Inclue the React library
var React = require("react");
// Include the react-router module
var router = require("react-router");
// Include the Route component for displaying individual routes
var Route = router.Route;
// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;
// Including router.Redirect so that we can change pages after certain conditions are met.
var Redirect = router.Redirect;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;
// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;
// Reference the high-level components
var Main = require("../components/Main");
var Login = require("../components/children/login");
var MostPopular = require("../components/children/MostPopular");
var allUsers = require("../components/children/allusers");
var Userpage = require("../components/children/Userpage");




    
module.exports= (
        // The high level component is the Router component
        <Router history={hashHistory}>
          <Route path="/" component={Main}>
            {/* If user selects Favorite Places then show the appropriate component*/}
            <Route path="MostPopular" component={MostPopular}/>
            <Route path="allUsers" component={allUsers}/>            
            
            <IndexRoute component={Userpage} />
            {/* If user selects any other path... we get the Home Route */}
            
          </Route>
        </Router>
      ); 
      
