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
import {GetAccessToken, GetUserId} from "../utils/LocalStorage";

export default function UserProfile(props) {
    const [data, setData] = useState([]);
    const [firstLine, setFirstLine] = useState([]);
    const [secondLine, setSecondLine] = useState([]);

    const userId = GetUserId();
    const url = `http://127.0.0.1:5000/user/${userId}/events`;

    const accessToken = GetAccessToken();
    const productLineKeys = new ProductLineKeys("product_id", "name", "price", "image");

    const firstUrl = `http://127.0.0.1:5000/ucf_rec/${userId}`;
    const secondUrl = "http://127.0.0.1:5000/pf_rec";

    const thirdUrl = "http://127.0.0.1:5000/ubr_rec/";

    const firstLineKeys = new ProductLineKeys("product_id", "name", "price", "image");
    const secondLineKeys = new ProductLineKeys("product_id", "name", "price", "image");
    useEffect(() => {
        if (accessToken === "") {
            history.push("/");
            return;
        }
        axios.get(url, {
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
            setData(events);
        }).catch(error => {
            props.showSnackbar("You have no interactions so far.", "alert");
        });

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

        axios.get(secondUrl, {
            params: {
                page: 0,
                limit: 10
            }
        }).then(response => {
            let events = response.data.data;
            setSecondLine(events);
        }).catch(error => {
            console.log(error);
        });

        axios(
            {
                url: thirdUrl,
                method: "POST",
                data: {
                    "actions": [
                        {
                            "product_id": "1",
                            "rating": 3
                        }
                    ]
                },
            }
        )
            .then(response => {
                let productLine = response;
                console.log(productLine)
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
                <UserInfo userID={data["user_id"]}/>
                <ProductLine
                    lineTitle={"Products you have viewed: "}
                    lineOfProducts={data}
                    lineKeys={productLineKeys}
                />
                <Grid container style={{marginTop: "20px"}}>
                    <Grid item xs={12}>
                        <ProductLine
                            lineTitle={"You should try"}
                            lineOfProducts={firstLine}
                            lineKeys={firstLineKeys}
                        >
                        </ProductLine>
                    </Grid>
                    <Grid item xs={12}>
                        <ProductLine
                            lineTitle={"Others also try"}
                            lineOfProducts={secondLine}
                            lineKeys={secondLineKeys}
                        >
                        </ProductLine>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}