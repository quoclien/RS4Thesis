import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage.js"
import SignIn from "./pages/SignIn";
import {Route, Router} from "react-router-dom";
import history from "./utils/History";
import UserProfile from "./pages/UserProfile";
import {SnackbarProvider, useSnackbar} from 'notistack';
import ProductDetail from "./pages/ProductDetail";


function NotiStackWrapper() {
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Router history={history}>
            <Route exact path="/">
                <SignIn
                    showSnackbar={(mess, variant) => {enqueueSnackbar(mess, {variant, autoHideDuration: 2000})}}
                ></SignIn>
            </Route>
            <Route path="/home">
                <HomePage></HomePage>
            </Route>
            <Route path="/profile">
                <UserProfile
                    showSnackbar={(mess, variant) => {enqueueSnackbar(mess, {variant, autoHideDuration: 2000})}}
                ></UserProfile>
            </Route>
            <Route path="/detail">
                <ProductDetail></ProductDetail>
            </Route>
        </Router>
    );
}

function App() {

    return (
        <SnackbarProvider maxStack="2">
            <NotiStackWrapper/>
        </SnackbarProvider>
    );
}

export default App;