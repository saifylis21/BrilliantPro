import React from "react"

import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem"

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/dumb" exact>Dumb</NavigationItem>
    </ul>
)

export default NavigationItems;