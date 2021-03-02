import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { saveComment } from './actions';
import CommentsList from './CommentsList';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(8),
    padding: "30px 20px",
    width: "100%",
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  header: {
    fontFamily: 'bold',
    fontSize: '20px'
  }
}));
export const  PostComponent = ({text = "Shrimp and Chorizo Paella", title, creationDate = "September 14, 2016",
  author = {firstName: 'Riadh'}, commentsList = [], id}) => {
  const classes = useStyles();
  const [newComment, setNewComment] = React.useState(false);
  const user = useSelector(state => state.authentication.user);

  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();

  const handleAddComment = (comment) => {
    const newComment = {
      ...comment,
      creationDate: new Date(),
      authorId: user.id,
      postId: id,
    }
    setNewComment(false);
    dispatch(saveComment(newComment, id))
  }

  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {author.firstName.substring(0, 1)}
          </Avatar>
        }
        action={user.id == author.id && <React.Fragment>
          <IconButton edge="end" aria-label="edit">
            <EditIcon/>
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
        }
        title={<Typography gutterBottom variant="h5" component="h2">
          {text}
        </Typography>}
        subheader={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {author.firstName} {' '} {author.lastName} {':  '}
            </Typography>
            {creationDate}
          </React.Fragment>
        }
      />

      <CardContent>
        <CommentsList commentsList={commentsList}/>

        {newComment && <form className={classes.form} onSubmit={handleSubmit(handleAddComment)} noValidate>
          <Controller
            name="text"
            as={
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="new comment"
                label="Saisir votre commentaire"
                name="comment"
                autoFocus
              />
            }
            control={control}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            valider
          </Button>
        </form>}
      </CardContent>
      <CardActions>
        {!newComment && <Button
          color="primary"
          className={classes.button}
          startIcon={<CommentIcon />}
          onClick={() => setNewComment(true)}
        >
          Commenter
        </Button>}
        {newComment &&
        <Button
          color="secondary"
          className={classes.button}
          startIcon={<CommentIcon />}
          onClick={() => setNewComment(false)}
        >
          Annuler
        </Button>}
      </CardActions>
    </Card>
  );
}
