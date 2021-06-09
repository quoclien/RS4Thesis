import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage.js"
import SignIn from "./pages/SignIn";
import {
  Router,
  Route
} from "react-router-dom";
import history from "./utils/History";


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
  }, []);

  return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>{!data ? "Loading..." : data}</p>
      //       {/*<Button color="primary">Hello World</Button>*/}
      //   </header>
      // </div>
      // <HomePage></HomePage>
      // <SignIn></SignIn>
      <Router history={history}>
        <Route exact path="/">
          <SignIn></SignIn>
        </Route>
        <Route path="/home">
          <HomePage></HomePage>
        </Route>
      </Router>
  );
}

export default App;