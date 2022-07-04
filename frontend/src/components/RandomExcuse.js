import React, { Component } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import { Barre } from "./Barre";
import { Message } from "./Message";

export default class RandomExcuse extends Component {
    constructor(props) {
        super(props);
        let counter = [];
        window.localStorage.getItem("valides") == null ? counter = [] : counter = window.localStorage.getItem("valides").split(",").map((test) => parseInt(test));
        this.state = {
            datas : [],
            valides: counter
        };
        this.RenderRequest = this.RenderRequest.bind(this);
    }

    componentDidMount() {
        this.RequestAPI();
    }

    RequestAPI() {
        fetch("/api/random")
            .then((response) => response.json())
            .then((data) => this.setState({datas: data}));        
    }

    ValidClick(i) {
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type": "application/json", "X-CSRFToken": document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")},
            body: JSON.stringify({key: i.key})
        };
        fetch("/api/validate/", requestOptions)
            .then((response) => response.json())
            .catch((error)=>console.log(error));

        i.validations++;
        this.setState({valides: [...this.state.valides, i.key]});
        window.localStorage.setItem("valides", [...this.state.valides, i.key]);
    }

    RenderRequest(e) {
        try {
            const message = e.map((excuse) => <Message excuse={excuse} valides={this.state.valides} ValidClick={() => this.ValidClick(excuse)} />);
            return message;
        }
        catch {
            return ("error");
        }
            
    }

    render() {
        return (
            <div>
            <Barre />

            <Box sx={{m:6}}> </Box>

            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={5}>
                <Grid item>
                    <Box sx={{m:4, p:2, borderRadius: "10px", bgcolor:"white"}}>
                        <Typography variant="h4" component="h4">Random Excuse :</Typography>
                    </Box>     
                </Grid>
                {this.RenderRequest(this.state.datas)}
            </Grid>
            </div>);
    }
}