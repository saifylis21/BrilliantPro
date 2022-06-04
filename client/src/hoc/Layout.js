import React from "react"

import classes from './Layout.module.css'
import NavigationItems from "../components/Navigation/NavigationItems/NavigationItems";

const Layout = (props) => {

    return (
        <>
            {/* <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Saif API</Typography>
                <img className={classes.image} src={picture} alt="icon" height="60" />
            </AppBar> */}
            <header className={classes.Layout}>
                <div>logo</div>
                <NavigationItems />
            </header>
        
            <main>
                {props.children}
            </main>
        </>
    )
}

export default Layout;