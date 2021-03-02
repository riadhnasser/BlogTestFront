import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { PostComponent } from './PostComponent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, savePost } from './actions';

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginTop: theme.spacing(7),
  },
}));

const NewPost = ({handleSavePost, setNewPost}) => {

  const { handleSubmit, control } = useForm();
  const handleAddPost = (post) => {
    setNewPost(false);
    handleSavePost(post);
  }

  return (
    <form onSubmit={handleSubmit(handleAddPost)} noValidate>
      <Controller
        name="text"
        as={
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="new comment"
            label="Saisir votre post"
            name="text"
          />
        }
        control={control}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Valider
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setNewPost(false)}
      >
        Annuler
      </Button>
    </form>

  )
}

export const  PostPage = () => {
  const classes = useStyles();
  const [newPost, setNewPost] = React.useState(false);
  const user = useSelector(state => state.authentication.user);
  const posts = useSelector(state => state.posts.posts);
  console.log('posts==> ', posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])

  const handleSavePost = (post) => {
    const newPostObj = {
      ...post,
      creationDate: new Date(),
      authorId: user.id,
    }
    console.log('save post action ==> ', newPostObj);

    dispatch(savePost(newPostObj));
  }
  return (
    <Container component="main" maxWidth="lg">

      <CssBaseline />
      {!newPost && <Button onClick={() => setNewPost(true)} className={classes.addButton} variant="contained" color="primary">
        Créer un nouveau post
      </Button>}
      {newPost && <NewPost handleSavePost={handleSavePost} setNewPost={setNewPost}/>}
      {posts && posts.map(el => {
        return (
          <PostComponent {...el}/>
        )
      })}
    </Container>
  );
}
