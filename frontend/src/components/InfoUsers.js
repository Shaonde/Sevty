import React, { Component } from "react";
import { Grid, Typography, Box} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Barre } from "./Barre";
import { Message } from "./Message";

class InfoUsers extends Component {
    constructor(props) {
        super(props);
        let counter = [];
        window.localStorage.getItem("valides") == null ? counter = [] : counter = window.localStorage.getItem("valides").split(",").map((test) => parseInt(test));
        this.state = {
            users: props.params.users,
            datas : [],
            valides: counter
        };
        this.RenderRequest = this.RenderRequest.bind(this);
    }

    componentDidMount() {
        this.RequestAPI();
    }

    RequestAPI() {
        fetch(`/api/getexcuse?user=${this.state.users}`)
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
        if (e.length == 0) {
            return (<Grid item align="center"><Box sx={{m:4, p: 4, width: [200,300, 500, 700,900], borderRadius: "10px", bgcolor:"white"}}><Typography variant="h4" component="h4">This user never made up something</Typography></Box></Grid>);
        }
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
                        <Typography variant="h4" component="h4">By " {this.state.users} " : </Typography>
                    </Box>     
                </Grid>
                {this.RenderRequest(this.state.datas)}
            </Grid>
            </div>);
    }
}

export default (props) => (
    <InfoUsers {...props} params={useParams()} />
);