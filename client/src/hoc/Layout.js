import React from "react"
import { AppBar, Typography } from '@material-ui/core';
import picture from '../images/saif.jpg';
import useStyles from '../styles';

const Layout = (props) => {

    const classes = useStyles();

    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Saif API</Typography>
                <img className={classes.image} src={picture} alt="icon" height="60" />
            </AppBar>
        
            <main>
                {props.children}
            </main>
        </>
    )
}

export default Layout;