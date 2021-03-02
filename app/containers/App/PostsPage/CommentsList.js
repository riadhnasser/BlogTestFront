import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '90%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

const CommentComponent = ({text = 'Brunch this weekend?', creationDate = 'September 14, 2016',
  author = {firstName: 'Riadh'}}) => {
  const classes = useStyles();

  return (

    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar aria-label="recipe" className={classes.avatar}>
          {author.firstName.substring(0, 1)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={text}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {author.firstName} {' '} {author.lastName} {'---'}
            </Typography>
            {creationDate}
          </React.Fragment>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit">
          <EditIcon/>
        </IconButton>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default function CommentsList({commentsList = []}) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {commentsList && commentsList.map(el => {
        return (
          <div>
            <CommentComponent {...el}/>
            <Divider variant="inset" component="li" />
          </div>
        )
      })}
    </List>
  );
}
