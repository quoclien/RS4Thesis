import UserInfo from "../components/UserInfo";
import ProductLine from "../components/ProductLine";

export default function UserProfile(props){
    return(
        <fragment>
            <UserInfo></UserInfo>
            <ProductLine></ProductLine>
        </fragment>
    );
}