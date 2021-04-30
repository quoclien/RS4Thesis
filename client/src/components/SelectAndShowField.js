import React from "react"
import {Box, TextField} from "@material-ui/core";
import CustomizedSelect from "./CustomizedSelect";

const textFieldLabel = "Current user";
const menuItems = [
    {
        value: "Elon.M",
        label: "Elon Musk",
    }  ,
    {
        value: "Donald.C",
        label: "Donald Cerrone",
    },
    {
        value: "Patrick.N",
        label: "Patrick Nguyen",
    },
    {
        value: "Duy.N",
        label: "Duy Nguyen",
    }
];
const dictionary = {
    "Elon.M" : "Elon Musk, CEO of Tesla, 49 years old",
    "Donald.C": "Donald Cerrone, American mixed martial artist, 38 years old",
    "Patrick.N" : "Patrick Nguyen, AI researcher, 22 years old",
    "Duy.N" : "Duy Nguyen, Backend Developer, 22 years old",
}
export default class SelectAndShowField extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            value: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            value: dictionary[event.target.value]
        })
    }

    render(){
        return(
            <Box display={"flex"} justifyContent={"center"} flexDirection={"row"} flexWrap={"nowrap"}>
                <TextField label={textFieldLabel} value={this.state.value} onChange={this.handleChange} disabled fullWidth></TextField>
                <CustomizedSelect
                    menuItems={menuItems}
                    labelId={"user-select-label"}
                    id={"user-select"}
                    handleChange={this.handleChange}
                ></CustomizedSelect>
            </Box>
        ); }
}