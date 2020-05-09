import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { getJwt } from "../../utils/";
import axios from "axios";

import CardList from "./profileComponents/cardList";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./profile.styles";

const URL_GET_USER_WITH_TOKEN = "http://localhost:5000/auth/getUser";

const Profile = ({ setIsAuth, userUniqueId }) => {
  const classes = useStyles();

  const history = useHistory();

  const [userCards, setUserCards] = useState([]);

  const [userID, setUserID] = useState(null);

  // console.log(userUniqueId);
  const signOutHandleClick = () => {
    localStorage.clear();
    history.push("/");
    setIsAuth(false);
  };

  const [userAuth, setUserAuth] = useState({ user: undefined });

  useEffect(() => {
    if (!localStorage.getItem("jwt-token")) {
      history.push("/");
    }
    getUser();
    getCards();
  }, [userUniqueId]);

  async function getCards() {
    try {
      const cards = await axios.get(
        `http://localhost:5000/cards/getCards/${userUniqueId}`
      );

      setUserCards([...cards.data]);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(userCards);
  async function getUser() {
    try {
      const jwt = getJwt();
      if (!jwt.hasToken) {
        setUserAuth({
          user: null,
        });
        return;
      }

      const result = await axios.get(URL_GET_USER_WITH_TOKEN, {
        headers: { Authorization: jwt.token },
      });
      setUserAuth({
        ...result.data,
      });
    } catch (error) {
      console.log("start trace", error, "end trace");
    }
  }
  return (
    <Container className={classes.container}>
      <div className={classes.profileTitleWrapper}>
        <Typography variant="h2" component="h3">
          Здравствуйте, {userAuth.login}
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={signOutHandleClick}
        >
          Выйти из аккаунта
        </Button>
      </div>
      <CardList
        userCards={userCards}
        getCards={getCards}
        userUniqueId={userUniqueId}
      />
    </Container>
  );
};

export default Profile;
