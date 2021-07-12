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

function handleOpenHomePage(){
    history.push("/home");
}

function handleSignOut(){
    history.push("/");
}

const reviewedProducts = [
    {
        id: 0,
        name:"Men's Summer Swimwear",
        price: "19 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5e74be96034d613d42b52dfe-medium.jpg",
    },
    {
        id: 1,
        name:"Men's Summer Tracksuit Sport",
        price: "14 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5ea0f2a654446407c111b622-medium.jpg",
    },
    {
        id: 2,
        name:"Men's Cotton Loose Short",
        price: "30 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5e9d55038d475a01721c1c7f-medium.jpg",
    },
    {
        id: 3,
        name:"Men's Summer Casual Short",
        price: "19 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5e26fc417db45b12adcdffef-medium.jpg",
    },
    {
        id: 4,
        name:"Summer Beach Shoes",
        price: "4 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5d03bea61eff7835fb25338b-medium.jpg",
    }
];

export default function UserProfile(props){
    const [data, setData] = useState([]);

    const url = "http://127.0.0.1:5000/user/events";

    const accessToken = GetAccessToken();
    const productLineKeys = new ProductLineKeys("_id","product_info.name", "event_type", "product_info.image_urls");
    useEffect(() => {
        axios.get(url, {
            headers: {"Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken,
            },
            params: {
                page: 0,
                limit: 10
            }
        }).then(response => {
            let event = response.data.data;
            setData([event]);
        }).catch(error => {
            props.showSnackbar("You have no interactions so far.", "alert");
        })
    }, []);
    return(
        <div>
            <Dashboard
                leftButtonIcon={<HomeIcon/>}
                rightButtonIcon={<ExitToApp/>}
                handleLeftButtonClick={handleOpenHomePage}
                handleRightButtonClick={handleSignOut}/>
            <Container>
                <UserInfo userID={data["user_id"]}></UserInfo>
                <ProductLine
                    lineTitle={"Your interaction history: "}
                    lineOfProducts={data}
                    lineKeys={productLineKeys}
                ></ProductLine>
            </Container>
        </div>
    );
}