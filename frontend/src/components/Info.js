import React, { Component } from "react";
import { Typography, Box, Link } from "@material-ui/core";
import { Barre } from "./Barre";

export function Info() {
    return(<div>
        <Barre />
        <Box sx={{m:5, p:5}}>
            <Typography>This website was made by Shaonde. Check the <Link href="https://github.com/Shaonde/Sevty">Github</Link> for more info.</Typography>
        </Box>
    </div>
    );
}