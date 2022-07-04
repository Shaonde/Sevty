import * as React from "react";
import { Grid, Typography, Button, Box, Divider, Link as Linker } from "@material-ui/core";

export function Message(props) {
    const excuse = props.excuse;
    const valides = props.valides;
    return (<Grid item key={excuse.id} align="center"><Grid container direction="row" justifyContent="center" alignItems="flex-start">            
    <Grid item><Box sx={{m:4, p: 4, width: [200,300, 500, 700,900], borderRadius: "10px", bgcolor:"white"}}>
            <Grid item>
                <Grid container direction="column" justifyContent="flex-start" alignItems="baseline">
                    <Grid item><Typography variant="h5" component="h5">{excuse.subject}</Typography></Grid>
                    <Grid item><Typography variant="body2" component="p"><Linker href={`/user/${excuse.host}`} color="inherit" underline="hover">{excuse.host}</Linker> • {excuse.created_at.slice(0,10)} {excuse.created_at.slice(11,19)}</Typography></Grid>
                </Grid>
                <Divider />
                <Grid item align="center"><Box sx={{p:5}}><Typography variant="body1" component="p">{excuse.description}</Typography></Box></Grid>
                <Grid item align="center">
                    {valides.includes(excuse.key) ? <Button color="primary" disabled variant="contained" >Validated : {excuse.validations}</Button> : <Button color="primary" variant="contained" onClick={props.ValidClick}>Validate : {excuse.validations}</Button>}
                </Grid>
            </Grid>
    </Box></Grid>
</Grid></Grid>);
}