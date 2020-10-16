import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import EducationZone from "./component/EducationZone";
import Forum from "./component/Forum";
import Login from "./component/LoginPage";
import Secondpage from "./component/Secondpage";
import Thirdpage from "./component/Thirdpage";
import Fourthpage from "./component/Fourthpage";
import Testsitepage from "./component/Testsitepage";
import Signup from "./component/SignupPage";

function App() {  

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/educationZone" component={EducationZone} />
          <Route path="/forum" component={Forum} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/state-covid19-dashboard" component={Secondpage} />
          <Route path="/restrictions-on-travelers" component={Thirdpage} />
          <Route path="/state-travel-restrictions" component={Fourthpage} />
          <Route path="/test-site-location" component={Testsitepage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
