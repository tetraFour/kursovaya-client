import React, { useState, useCallback, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { useStyles } from "./createCard.styles";

import axios from "axios";

import { useSnackbar } from "notistack";

export default function PaymentForm({ userUniqueId }) {
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState({ value: "", isValid: true });
  const [cardNumber, setCardNumber] = useState({ value: 0, isValid: true });
  const [cvv, setCvv] = useState({ value: 0, isValid: true });
  const [initialCash, setInitialCash] = useState({ value: 0, isValid: true });

  const handleClickOpenSnackbar = (name, variant) =>
    enqueueSnackbar(name, { variant });

  const history = useHistory();

  // console.log(initialCash);

  const classes = useStyles();

  const usernameChangeHandler = useCallback(
    (event) => {
      setUsername({ ...username, value: event.target.value });
    },
    [username]
  );

  const cardNumberChangeHandler = useCallback(
    (event) => {
      setCardNumber({ ...cardNumber, value: +event.target.value });
    },
    [cardNumber]
  );

  const cvvChangeHandler = useCallback(
    (event) => {
      setCvv({ ...cvv, value: +event.target.value });
    },
    [cvv]
  );
  const initialCashChangeHandler = useCallback(
    (event) => {
      setInitialCash({ ...initialCash, value: +event.target.value });
    },
    [initialCash]
  );
  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      event.target.reset();
      try {
        await axios({
          method: "post",
          url: "http://localhost:5000/cards/createCard",
          data: {
            cardOwner: username.value.toUpperCase(),
            cardNumber: cardNumber.value,
            cvv: cvv.value,
            initialCash: initialCash.value,
            userOwnerId: userUniqueId,
          },
        });
        handleClickOpenSnackbar("карта создана", "success");
        history.push("/");
      } catch (error) {
        handleClickOpenSnackbar(error.response.data.responseContent, "error");
      }
    },
    [username, cardNumber, cvv, initialCash]
  );

  useEffect(() => {
    if (!localStorage.getItem("jwt-token")) {
      history.push("/");
    }
  }, []);

  // console.log(cardNumber, username, cvv);
  return (
    <div className="card">
      <Container>
        <Typography variant="h4" gutterBottom>
          Создание карты
        </Typography>
        <form noValidate onSubmit={(e) => submitHandler(e)}>
          <Grid container spacing={3} className={classes.form}>
            <Grid item xs={12} md={6}>
              <TextField
                error={!username.isValid}
                required
                id="cardName"
                name="cardName"
                label="Имя Владельца"
                fullWidth
                onChange={(e) => usernameChangeHandler(e)}
                helperText={
                  !username.isValid ? "такого пользователя не существует" : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={!cardNumber.isValid}
                required
                id="cardNumber"
                name="cardNumber"
                label="Номер карты"
                fullWidth
                onChange={(e) => cardNumberChangeHandler(e)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                error={!cvv.isValid}
                id="cvv"
                name="cvv"
                label="CVV"
                helperText="Последние три цифры на обороте карты"
                fullWidth
                onChange={(e) => cvvChangeHandler(e)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                error={!initialCash.isValid}
                id="initialCash"
                name="initialCash"
                label="Начальная сумма"
                fullWidth
                helperText="руб. коп."
                onChange={(e) => initialCashChangeHandler(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              !username.value ||
              !cardNumber.value ||
              !cvv.value ||
              !initialCash.value
            }
          >
            Зарегестрировать карту
          </Button>
        </form>
      </Container>
    </div>
  );
}
