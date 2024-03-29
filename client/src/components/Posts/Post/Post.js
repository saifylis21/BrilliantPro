import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';
import { useGlobalState } from '../../../state.js';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const [isLoggedIn] = useGlobalState("isLoggedIn");
  const [role] = useGlobalState("role");

  let showLike = <></>

  if(!isLoggedIn || role === "") {
    showLike = <></>
  } else if(isLoggedIn && role === "Admin") {
    showLike = <></>
  } else if(isLoggedIn && role === "User") {
    showLike = (
      <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
    )
  }

  return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {isLoggedIn && role === "Admin" ? (
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
          </div>
        ) : null}

        {!isLoggedIn ? (<div style={{marginTop: '10px'}}></div>) : (
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2"><a href={`${post.tags}`} target="_blank" rel="noopener noreferrer">{post.tags}</a></Typography>
          </div>
        )}

        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          {showLike}
          {isLoggedIn && role === "Admin" ? (
            <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
          ) : null}
        </CardActions>
      </Card>
  );
};

export default Post;
