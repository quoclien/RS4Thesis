import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage.js"
import SignIn from "./pages/SignIn";
import {Route, Router} from "react-router-dom";
import history from "./utils/History";
import UserProfile from "./pages/UserProfile";


function App() {
    const [data, setData] = React.useState(null);

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
            <Route path="/profile">
                <UserProfile></UserProfile>
            </Route>
        </Router>
    );
}

export default App;