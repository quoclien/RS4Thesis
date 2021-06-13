import UserInfo from "../components/UserInfo";
import ProductLine from "../components/ProductLine";
import Dashboard from "../components/Dashboard";
import HomeIcon from '@material-ui/icons/Home';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";

function handleOpenHomePage(){
    history.push("/home");
}

function handleSignOut(){
    history.push("/");
}

export default function UserProfile(props){
    return(
        <fragment>
            <Dashboard
                leftButtonIcon={<HomeIcon/>}
                rightButtonIcon={<ExitToApp/>}
                handleLeftButtonClick={handleOpenHomePage}
                handleRightButtonClick={handleSignOut}/>
            <UserInfo></UserInfo>
            <ProductLine></ProductLine>
        </fragment>
    );
}