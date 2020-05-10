import React, { useState, useCallback } from "react";

import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useSnackbar } from "notistack";

import { useStyles } from "./signUp.styles";

import { url } from "../../utils/apiUrl";

const CREATE_USER_URL = `${url}/auth/createUser`;
export default function SignUp() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpenSnackbar = (name, variant) =>
    enqueueSnackbar(name, { variant });

  const [signUp, setSignUp] = useState({
    login: "",
    name: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = useCallback(
    (e) => {
      setSignUp({ ...signUp, [e.target.name]: e.target.value });
    },
    [signUp]
  );

  const submitSignUpHandler = useCallback(
    async (e) => {
      e.preventDefault();
      e.target.reset();
      try {
        const signUpUser = await axios({
          method: "POST",
          url: CREATE_USER_URL,
          data: { ...signUp },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(signUpUser.data);
        handleClickOpenSnackbar(`Вы зарегистрировались`, "success");
        setSignUp({ login: "", password: "", email: "", name: "" });
      } catch (error) {
        console.log(error);
        handleClickOpenSnackbar(error.response.data.responseContent, "error");
      }
    },
    [signUp]
  );

  return (
    <Container component="div" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => submitSignUpHandler(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Имя"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => inputChangeHandler(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
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
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
            id="password"
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
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </Container>
  );
}
