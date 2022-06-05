import React from "react"

import classes from './Layout.module.css'
import NavigationItems from "../components/Navigation/NavigationItems/NavigationItems";

const Layout = (props) => {

    return (
        <>
            <header className={classes.Layout}>
                <div><h1>BrilliantPro.</h1></div>
                <NavigationItems />
            </header>
        
            <main>
                {props.children}
            </main>
        </>
    )
}

export default Layout;