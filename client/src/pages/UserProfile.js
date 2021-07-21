import UserInfo from "../components/UserInfo";
import ProductLine from "../components/ProductLine";
import Dashboard from "../components/Dashboard";
import HomeIcon from '@material-ui/icons/Home';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";
import {Container, Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductLineKeys from "../models/ProductLineKeys";
import {GetAccessToken, GetUserId, GetViewingProduct} from "../utils/LocalStorage";

export default function UserProfile(props) {
    const [userInfo, setUserInfo] = useState([]);
    const [events, setEvents] = useState([]);
    const [firstLine, setFirstLine] = useState([]);
    const [secondLine, setSecondLine] = useState([]);
    const [thirdLine, setThirdLine] = useState([]);

    const userId = GetUserId();
    const eventUrl = `http://127.0.0.1:5000/user/${userId}/events`;

    const infoUrl = `http://127.0.0.1:5000/user/${userId}`;

    const viewingProduct = GetViewingProduct();

    const accessToken = GetAccessToken();
    const productLineKeys = new ProductLineKeys("product_id", "name", "price", "image");

    const firstUrl = `http://127.0.0.1:5000/ucf_rec/${userId}`;
    const secondUrl = "http://127.0.0.1:5000/iir_rec/wilson";
    const thirdUrl = "http://127.0.0.1:5000/ubr_rec/";

    const lineKeys = new ProductLineKeys("product_id", "name", "price", "image");
    useEffect(() => {
        if (userId === null) {
            history.push("/");
            return;
        }

        // Get info of current user
        axios.get(infoUrl)
            .then(response => {
                let info = response.data.data;
                setUserInfo(info);
            })

        // Get event for current user
        axios.get(eventUrl, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken,
            },
            params: {
                page: 0,
                limit: 10
            }
        }).then(response => {
            let events = response.data.data;
            if (Array.isArray(events)) {
                events.reverse();
            }
            setEvents(events);
        }).catch(error => {
            props.showSnackbar("You have no interactions so far.", "alert");
        });

        // Get first recommender product line
        axios.get(firstUrl, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken,
            },
            params: {
                page: 0,
                limit: 10
            }
        }).then(response => {
            let events = response.data.data;
            setFirstLine(events);
        }).catch(error => {
            console.log(error);
        });

        // Get second recommender product line
        axios(
            {
                url: secondUrl,
                method: "GET",
            }
        )
            .then(response => {
                let productLine = response.data.data;
                setSecondLine(productLine);
            }).catch(e => {
            console.log(e)
        });

        let productIdForActions = viewingProduct ? viewingProduct["product_id"] : "1";
        // Get third recommender product line
        axios(
            {
                url: thirdUrl,
                method: "POST",
                data: {
                    "actions": [
                        {
                            "product_id": productIdForActions,
                            "rating": 3
                        }
                    ]
                },
            }
        )
            .then(response => {
                let productLine = response.data.data;
                console.log(productLine);
                setThirdLine(productLine)
            }).catch(e => {
            console.log(e)
        });
    }, []);

    function handleOpenHomePage() {
        history.push("/home");
    }

    function handleSignOut() {
        history.push("/");
    }

    return (
        <div>
            <Dashboard
                leftButtonIcon={<HomeIcon/>}
                rightButtonIcon={<ExitToApp/>}
                handleLeftButtonClick={handleOpenHomePage}
                handleRightButtonClick={handleSignOut}/>
            <Container>
                <UserInfo userInfo={userInfo}/>
                <ProductLine
                    lineTitle={"Products you have viewed: "}
                    lineOfProducts={events}
                    lineKeys={productLineKeys}
                />
                <Grid container style={{marginTop: "20px"}}>
                    <Grid item xs={12}>
                        <ProductLine
                            lineTitle={"Recommendations based on users with similar behavior:"}
                            lineOfProducts={firstLine}
                            lineKeys={lineKeys}
                        >
                        </ProductLine>
                    </Grid>
                    <Grid item xs={12}>
                        <ProductLine
                            lineTitle={"Recommendations based on good ratings:"}
                            lineOfProducts={secondLine}
                            lineKeys={lineKeys}
                        >
                        </ProductLine>
                    </Grid>
                    <Grid item xs={12}>
                        <ProductLine
                            lineTitle={"Recommendations based on similar rating history:"}
                            lineOfProducts={thirdLine}
                            lineKeys={lineKeys}
                        >
                        </ProductLine>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}