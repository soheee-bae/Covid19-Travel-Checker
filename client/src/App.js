import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import EducationZone from "./component/EducationZone";

import Login from "./component/LoginPage";
import Secondpage from "./component/Secondpage";
import Thirdpage from "./component/Thirdpage";
import Fourthpage from "./component/Fourthpage";
import Testsitepage from "./component/Testsitepage";
import Signup from "./component/SignupPage";
import Profile from "./component/Profile";

export const covidContext = React.createContext({});
export const stateContext = React.createContext();

function App() {
  const [webToken, setWebToken] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("webtoken") !== null) {
      setWebToken(window.localStorage.getItem("webtoken"));
    }
  }, []);

  return (
    <covidContext.Provider value={{ webtoken: [webToken, setWebToken] }}>
      <stateContext.Provider value={{ selectedState, setSelectedState }}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/educationZone" component={EducationZone} />
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/state-covid19-dashboard" component={Secondpage} />
              <Route path="/profile" component={Profile} />
              <Route path="/restrictions-on-travelers" component={Thirdpage} />
              <Route path="/state-travel-restrictions" component={Fourthpage} />
              <Route path="/test-site-location" component={Testsitepage} />
            </Switch>
          </div>
        </Router>
      </stateContext.Provider>
    </covidContext.Provider>
  );
}

export default App;
