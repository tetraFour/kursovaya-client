import React, { useState, useCallback } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useSnackbar } from "notistack";

import { useStyles } from "./signIn.styles";

import url from "../../utils/apiUrl";

const GET_TOKEN_URL = `${url}/auth/getToken`;

export default function SignIn({ isAuth, setIsAuth, setUserUniqueId }) {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpenSnackbar = (name, variant) =>
    enqueueSnackbar(name, { variant });

  const history = useHistory();

  const [userCred, setUserCred] = useState({
    password: "",
    login: "",
    error: "",
  });

  const inputChangeHandler = useCallback(
    (e) => {
      setUserCred({ ...userCred, [e.target.name]: e.target.value });
    },
    [userCred]
  );

  const submitSignInHandler = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const getToken = await axios.post(GET_TOKEN_URL, {
          login: userCred.login,
          password: userCred.password,
        });
        // console.log(getToken.data);

        const login = JSON.parse(getToken.config.data).login;
        localStorage.setItem("jwt-token", getToken.data.token);
        history.push("/profile");
        setUserUniqueId(getToken.data.id);
        localStorage.setItem("userUniqueId", getToken.data.id);
        setIsAuth(true);
        handleClickOpenSnackbar(`Вы успешно авторизировались`, "success");
      } catch (error) {
        // console.log(error.response);
        handleClickOpenSnackbar(error.response.data.responseContent, "error");
      }
    },
    [userCred]
  );
  return (
    <Container component="div" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ExitToAppIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => submitSignInHandler(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login-for-signin"
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus
            onChange={(e) => inputChangeHandler(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password-for-signin"
            autoComplete="current-password"
            onChange={(e) => inputChangeHandler(e)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Вход
          </Button>
        </form>
      </div>
    </Container>
  );
}
