import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage.js"
import SignIn from "./pages/SignIn";
import {Route, Router} from "react-router-dom";
import history from "./utils/History";
import UserProfile from "./pages/UserProfile";
import {SnackbarProvider, useSnackbar} from 'notistack';


function NotiStackWrapper() {
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Router history={history}>
            <Route exact path="/">
                <SignIn
                    showSnackbar={(mess, variant) => {enqueueSnackbar(mess, {variant})}}
                ></SignIn>
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

function App() {

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
        <SnackbarProvider maxStack="2">
            <NotiStackWrapper/>
        </SnackbarProvider>
    );
}

export default App;