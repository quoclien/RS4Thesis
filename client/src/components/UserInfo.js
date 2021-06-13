import {Avatar, Container, Typography} from "@material-ui/core";


export default function UserInfo(props){
    return(
        <Container>
            <Avatar alt="Profile avatar" src={"../assets/images/reactlogo192.png"}></Avatar>
            <div>
                <Typography variant={"h2"} component={"p"}>
                    Name and age
                </Typography>
            </div>
        </Container>
    );
}