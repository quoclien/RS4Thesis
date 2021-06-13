import UserInfo from "../components/UserInfo";
import RecommenderLine from "../components/RecommenderLine";

export default function UserProfile(props){
    return(
        <fragment>
            <UserInfo></UserInfo>
            <RecommenderLine></RecommenderLine>
        </fragment>
    );
}