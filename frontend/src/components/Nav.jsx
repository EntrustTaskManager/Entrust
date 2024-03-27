import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";




const Nav = () => {

    return (
        <AppBar position='static'>
            <Toolbar sx={{ minHeight: '48px'}}>
                <Typography vatiant='h3' component='div' sx={{flexGrow: 1, textAlign: 'center', fontSize: '30px'}}>
                    Entrust
                </Typography>
            </Toolbar>
        </AppBar>

    );

};

export default Nav;
