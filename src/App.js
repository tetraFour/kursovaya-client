import React, { useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header";

import Auth from "./components/auth/auth";

import News from "./components/news/news";
import PaymentServices from "./components/paymentServices/paymentServices";

import CreateCard from "./components/createCard/createCard";

import { useStyles } from "./components/main/main.styles";
import Profile from "./components/profile/profile";
import PaymentHistory from "./components/paymentHistory/paymentHistory";
import axios from "axios";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const classes = useStyles();
  const [userUniqueId, setUserUniqueId] = useState(0);

  const [value, setValue] = useState([]);

  useEffect(() => {
    getFetch();
    console.log(value);
  }, []);

  const getFetch = async () => {
    const result = await axios.get(
      "https://banking-course.herokuapp.com/services/getBankServices"
    );

    setValue([...result.data]);
  };

  return (
    <div className="App">
      <Header isAuth={isAuth} setIsAuth={setIsAuth} />
      <main className={classes.main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Auth
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setUserUniqueId={setUserUniqueId}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <Profile setIsAuth={setIsAuth} userUniqueId={userUniqueId} />
            )}
          />
          <Route
            path="/profile/create_card"
            render={() => <CreateCard userUniqueId={userUniqueId} />}
          />
          <Route
            path="/profile/services"
            render={() => <PaymentServices userUniqueId={userUniqueId} />}
          />
          <Route
            path="/profile/payment_history"
            render={() => <PaymentHistory userUniqueId={userUniqueId} />}
          />

          <Route path="/profile/news" component={News} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
