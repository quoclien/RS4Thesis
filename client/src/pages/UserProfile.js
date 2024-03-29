import UserInfo from "../components/UserInfo";
import ProductLine from "../components/ProductLine";
import Dashboard from "../components/Dashboard";
import HomeIcon from '@material-ui/icons/Home';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";
import {Container} from "@material-ui/core";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductLineKeys from "../models/ProductLineKeys";
import {GetAccessToken} from "../utils/LocalStorage";
import {mockDataEvent} from "../utils/MockData";

export default function UserProfile(props){
    const [data, setData] = useState([]);

    const url = "http://127.0.0.1:5000/user/events";

    const accessToken = GetAccessToken();
    const productLineKeys = new ProductLineKeys("_id", "name", "price", "image_urls");
    useEffect(() => {
        if (accessToken === "")
        {
            history.push("/");
            return;
        }
        // axios.get(url, {
        //     headers: {"Access-Control-Allow-Origin": "*",
        //         "Authorization": "Bearer " + accessToken,
        //     },
        //     params: {
        //         page: 0,
        //         limit: 10
        //     }
        // }).then(response => {
        //     let event = response.data.data;
        //     setData([event]);
        // }).catch(error => {
        //     props.showSnackbar("You have no interactions so far.", "alert");
        // });
    }, []);

    function handleOpenHomePage(){
        history.push("/home");
    }

    function handleSignOut(){
        history.push("/");
    }
    return(
        <div>
            <Dashboard
                leftButtonIcon={<HomeIcon/>}
                rightButtonIcon={<ExitToApp/>}
                handleLeftButtonClick={handleOpenHomePage}
                handleRightButtonClick={handleSignOut}/>
            <Container>
                <UserInfo userID={data["user_id"]}/>
                <ProductLine
                    lineTitle={"Your purchase history: "}
                    lineOfProducts={mockDataEvent}
                    lineKeys={productLineKeys}
                />
            </Container>
        </div>
    );
}