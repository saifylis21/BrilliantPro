import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './Posts/Posts';
import Form from './Form/Form';
import { getPosts } from '../actions/posts';

const LoginPage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return (
        <>
        <div style={{ margin: '20px' }}>
                <div>
                    <TextField
                        label="UserName"
                    />
                    <TextField
                        label="Password"
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button color='primary' variant='contained' onClick={() => setLoggedIn(true)}>Log In</Button>
                    <Button color='primary' variant='contained' onClick={() => setLoggedIn(false)}>Log Out</Button>
                </div>
            </div>
            {loggedIn ?
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
        </>

    )
}

export default LoginPage