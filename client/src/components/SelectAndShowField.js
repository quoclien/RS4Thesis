import React from "react"
import {Grid, TextField} from "@material-ui/core";
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
export default class SelectAndShowField extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            value: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    render(){
        return(
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <TextField label={textFieldLabel} value={this.state.value} onChange={this.handleChange} disabled></TextField>
                </Grid>
                <Grid item xs={6}>
                    <CustomizedSelect
                        menuItems={menuItems}
                        labelId={"user-select-label"}
                        id={"user-select"}
                        handleChange={this.handleChange}
                    ></CustomizedSelect>
                </Grid>
            </Grid>
        ); }
}