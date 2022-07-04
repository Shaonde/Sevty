import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Grid, TextField, Box, InputAdornment, IconButton, List, ListItem, SwipeableDrawer } from "@material-ui/core";
import { Search, Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {isMobile} from 'react-device-detect';

const BarrePc = () => {
    const [search, setSearch] = useState("");
    let navigate = useNavigate();
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item><Grid container direction="row" spacing={2}><Grid item><Button variant="contained" to="/" component={Link}><Typography variant="h6" component="h6">SEVTY</Typography></Button></Grid>
            <Grid item><Button color="inherit" to="/random" component={Link} onClick={() => console.log(useLocation())}><Typography variant="h6" component="h6" >Random</Typography></Button></Grid>
            <Grid item><Button color="inherit" to="/publish" component={Link}><Typography variant="h6" component="h6" >Publish</Typography></Button></Grid>
        </Grid></Grid>
        <Grid item><Box sx={{ bgcolor:"white", borderRadius: "5px", opacity: 0.9}} >
            <TextField 
                hiddenLabel 
                variant="outlined" 
                size="small"
                onChange={(event) => setSearch(event.target.value)} 
                InputProps={{startAdornment: (<InputAdornment><Search /></InputAdornment>)}} onKeyPress={(event) => {
                if (event.key === 'Enter'){
                    navigate(`/user/${search}`,{replace:true});
                    window.location.reload(true);
                }
            }} /></Box></Grid>                
        </Grid>
    );
}

const toggleDrawer = (setState, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

const BarreMobile = () => {
    const [search, setSearch] = useState("");
    let navigate = useNavigate();
    const [menuOp, setMenuOp] = useState(false);
    return (
        <div><IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(setMenuOp, true)}>
        
                <Menu />
            </IconButton>
            <SwipeableDrawer
            anchor={"left"}
            open={menuOp}
            onClose={toggleDrawer(setMenuOp, false)}
            onOpen={toggleDrawer(setMenuOp, true)}
            >
                <List>
                    <ListItem><Button to="/random" component={Link} onClick={() => console.log(useLocation())}><Typography variant="h6" component="h6" >Random</Typography></Button></ListItem>
                    <ListItem><Button to="/publish" component={Link}><Typography variant="h6" component="h6" >Publish</Typography></Button></ListItem>
                    <ListItem><Button to="/info" component={Link}><Typography variant="h6" component="h6" >Info</Typography></Button></ListItem>
                </List>
            </SwipeableDrawer>
            <Button variant="contained" to="/" component={Link}><Typography variant="h6" component="h6">SEVTY</Typography></Button>
            
    </div>
    );
}

export function Barre() {
    return (<AppBar color={"secondary"}>
            <Toolbar>
                {isMobile ? <BarreMobile /> : <BarrePc />}
            </Toolbar>
    </AppBar>);
}