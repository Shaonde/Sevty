import React, { Component } from "react";
import { Button, Grid, Typography, TextField, Box, Snackbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Barre } from "./Barre";

export default class PublishExcuses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            apologist: "",
            description: "",
            open: false
        };

        this.handleExcusePublish = this.handleExcusePublish.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleApologistChange = this.handleApologistChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleSubjectChange(e) {
        this.setState({
            subject: e.target.value
        });
    }

    handleApologistChange(e) {
        this.setState({
            apologist: e.target.value
        });
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleExcusePublish() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-CSRFToken": document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")},
            body: JSON.stringify({
                subject: this.state.subject,
                host: this.state.apologist,
                description: this.state.description
            })
        };
        fetch("/api/create/", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
        this.setState({open: true});
    }

    handleClose () {
        this.setState({open: false});
    }

    render() {
        return (<div>
            <Barre />

            <Box sx={{m:2, p:4}}> </Box>

            <Box sx={{m:[2,4], p:[4,8], borderRadius: "10px", bgcolor:"white"}}><Grid container spacing={4}>
            <Grid item xs={12} align="center">
                <Typography component ="h4" variant="h4">Publish an Excuse</Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Grid container justifyContent="center" spacing={3}>
                    <Grid item>
                        <TextField required={true} id="subject" label="Subject" variant="filled" inputProps={{style:{textAlign:"center"}}} onChange={this.handleSubjectChange} />
                    </Grid>
                    <Grid item>
                        <TextField required={true} id="apologist" label="Apologist" variant="filled" inputProps={{style:{textAlign:"center"}}} onChange={this.handleApologistChange} />
                    </Grid>                    
                </Grid>
            </Grid>
            <Grid item xs={12} align="center">
                    <TextField id="description" label="Description" variant="outlined" multiline minRows={4} fullWidth inputProps={{style:{textAlign:"center"}}} onChange={this.handleDescriptionChange} />
            </Grid>
            <Snackbar
            open={this.state.open}
            autoHideDuration={2500}
            onClose={this.handleClose}
            message="Published"
            />
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={this.handleExcusePublish}>Publish</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="outlined" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
        </Box>
        </div>);
    }
}