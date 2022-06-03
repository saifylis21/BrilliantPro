import React from 'react';



import LoginPage from './components/LoginPage';


const App = () => {

  return (
    <>
      <div>

        <LoginPage />



        {/*  show this when user is logged in */}
        {/* <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Saif API</Typography>
        <img className={classes.image} src={picture} alt="icon" height="60" />
      </AppBar>
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
        </Container> */}
      </div>
    </>
  );
};

export default App;
