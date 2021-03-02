import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { useHistory } from "react-router-dom";
import { registerAction }  from '../../core/authentication/action';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(8),
    padding: "30px 20px",
    width: "550px",
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export const  RegisterPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(registerAction(data, history));
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.card} variant="outlined">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'inscrire
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>

            <Controller
              name="email"
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Addresse mail"
                  name="email"
                  autoFocus
                />
              }
              control={control}
            />

            <Controller
              name="firstName"
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nom"
                  label="Nom"
                  name="firstName"
                  autoFocus
                />
              }
              control={control}
            />

            <Controller
              name="lastName"
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Prénom"
                  label="Prénom"
                  name="lastName"
                  autoFocus
                />
              }
              control={control}
            />

            <Controller
              name="password"
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Déja un membre? Se connecter"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Card>
    </Container>
  );
}
