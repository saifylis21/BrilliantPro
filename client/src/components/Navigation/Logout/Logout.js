import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { setGlobalState } from "../../../state.js";

const Logout = () => {

    useEffect(() => {
        setGlobalState("isLoggedIn", false);
        setGlobalState("role", "");
    }, []);

    
    return (
        <>
            <Redirect to="/" />
        </>
    );
}

export default Logout;