import React, { Component } from "react";
import { Grid, Box } from "@material-ui/core";
import { Barre } from "./Barre";
import { Message } from "./Message";

export default class Home extends Component {
    constructor(props) {
        super(props);
        let counter = [];
        window.localStorage.getItem("valides") == null ? counter = [] : counter = window.localStorage.getItem("valides").split(",").map((test) => parseInt(test));
        this.state = {
            datas: [],
            loaded: [],
            valides: counter
        };
        this.Req();
        this.RenderRequest = this.RenderRequest.bind(this);
        this.ValidClick = this.ValidClick.bind(this);
    }

    Req() {
        fetch("/api/list")
            .then((response) => response.json())
            .then((data) => {
                this.setState({datas: [...this.state.datas,data]});
                this.setState({loaded: [...this.state.loaded, data[data.length - 1].id]});
            });
    }

    ValidClick(i) {
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({key: i.key})
        };
        fetch("/api/validate/", requestOptions)
            .then((response) => response.json())
            .catch((error)=>console.log(error));

        i.validations++;
        this.setState({valides: [...this.state.valides, i.key]});
        window.localStorage.setItem("valides", [...this.state.valides, i.key]);
    }

    RenderRequest(i) {
        try {
            const message = i.map((excuse) => <Message excuse={excuse} valides={this.state.valides} ValidClick={() => this.ValidClick(excuse)} />);
        
        return(message);
        }
        catch {
            return("rien");
        }
    }

    render() {
        return (<div>
            <Barre />
            <Box sx={{m:6}}> </Box>
            <Grid container direction="column" spacing={5}>
            {this.RenderRequest(this.state.datas[0])}
        </Grid>
        </div>
        
        );
    }
}