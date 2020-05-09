import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

import SignIn from "../signIn/signIn";
import SignUp from "../signUp/signUp";
import Container from "@material-ui/core/Container";
import { useStyles } from "./auth.styles";

function Auth({ isAuth, setIsAuth, setUserUniqueId }) {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("jwt-token")) {
      history.push("/profile");
    }
  }, []);

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <SignIn
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setUserUniqueId={setUserUniqueId}
      />
      <SignUp />
    </Container>
  );
}

export default Auth;
