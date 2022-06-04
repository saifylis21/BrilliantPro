import React from "react"

import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

import { useGlobalState } from "../../../state";

const NavigationItems = () => {
    
    const [isLoggedIn] = useGlobalState("isLoggedIn");
    
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {isLoggedIn ? null : <NavigationItem link="/auth" exact>SignUp/LogIn</NavigationItem>}
            {isLoggedIn ? <NavigationItem link="/logout" exact>Logout</NavigationItem> : null}
        </ul>
    );
}

export default NavigationItems;