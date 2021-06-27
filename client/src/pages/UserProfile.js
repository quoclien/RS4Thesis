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
                    lineOfProducts={productLines}
                ></ProductLine>
            </Container>
        </fragment>
    );
}