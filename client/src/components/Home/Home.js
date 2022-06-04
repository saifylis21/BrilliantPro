import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useGlobalState } from '../../state.js';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';
import classes from './Home.module.css';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const [isLoggedIn] = useGlobalState("isLoggedIn");
    const [role] = useGlobalState("role");

    console.log('isloggedin ->', isLoggedIn, 'role ->', role);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return (
        <>

        <div className={classes.Home}>

            {isLoggedIn && role === "Admin" ?
                <Container maxWidth="lg">
                    <Grow in>
                        <Container>
                            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                                <Grid item xs={12} sm={7}>
                                    <Posts setCurrentId={setCurrentId} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                                </Grid>
                            </Grid>
                        </Container>
                    </Grow>
                </Container>

                : <Container maxWidth="lg">
                    <Grow in>
                        <Container>
                            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                                <Grid item xs={12} sm={7}>
                                    <Posts setCurrentId={setCurrentId} />
                                </Grid>
                            </Grid>
                        </Container>
                    </Grow>
                </Container>
            }
        </div>
        </>

    )
}

export default Home