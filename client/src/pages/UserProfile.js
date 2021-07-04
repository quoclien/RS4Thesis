import UserInfo from "../components/UserInfo";
import ProductLine from "../components/ProductLine";
import Dashboard from "../components/Dashboard";
import HomeIcon from '@material-ui/icons/Home';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";
import {Container} from "@material-ui/core";

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

const productLines = [1,2,3,4,5]

export default function UserProfile(props){
    return(
        <fragment>
            <Dashboard
                leftButtonIcon={<HomeIcon/>}
                rightButtonIcon={<ExitToApp/>}
                handleLeftButtonClick={handleOpenHomePage}
                handleRightButtonClick={handleSignOut}/>
            <Container>
                <UserInfo></UserInfo>
                <ProductLine
                    lineTitle={"You have reviewed those products: "}
                    lineOfProducts={reviewedProducts}
                ></ProductLine>
            </Container>
        </fragment>
    );
}