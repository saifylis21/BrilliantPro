import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './Posts/Posts';
import Form from './Form/Form';
import { getPosts } from '../actions/posts';
import useStyles from '../styles';
import picture from '../images/saif.jpg';

const LoginPage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return (
        <>

            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Saif API</Typography>
                <img className={classes.image} src={picture} alt="icon" height="60" />
            </AppBar>

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