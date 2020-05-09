import React, { useState, useMemo, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import TransferToCard from "./transferToCard";

import { useSnackbar } from "notistack";

import getRandomColor from "../../../utils/getRandomColor";

import { useStyles } from "./styles";

import axios from "axios";

const UserCard = ({ card, getCards, allCards, userUniqueId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpenSnackbar = (name, variant) =>
    enqueueSnackbar(name, { variant });

  useEffect(() => {
    // console.log(allCards);
  }, []);

  const classes = useStyles();

  const [value, setValue] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);

  const [transferOpen, setTransferOpen] = useState(false);

  const [chargeOpen, setChargeOpen] = useState(false);

  const [withDrawOpen, setWithdrawOpen] = useState(false);

  const [converterOpen, setConverterOpen] = useState(false);

  const [chargeMoney, setChargeMoney] = useState(0);

  const [withdrawMoney, setWithdrawMoney] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickChargeDialogOpen = () => {
    setAnchorEl(null);
    setChargeOpen(true);
  };

  const handleClickConverterDialogOpen = () => {
    setAnchorEl(null);
    setConverterOpen(true);
  };

  const handleClickWithdrawDialogOpen = () => {
    setAnchorEl(null);
    setWithdrawOpen(true);
  };

  const handleTransferDialogOpen = () => {
    setTransferOpen(true);
  };
  const handleChargeDialogClose = () => {
    setChargeOpen(false);
  };

  const handleWithdrawDialogClose = () => {
    setWithdrawOpen(false);
  };
  const handleConverterDialogClose = () => {
    setConverterOpen(false);
  };

  const handleTransferDialogClose = (newValue) => {
    setTransferOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  const handleChangeChargeMoney = (event) => {
    setChargeMoney(+event.target.value);
  };
  const handleChangeWithdrawMoney = (event) => {
    setWithdrawMoney(+event.target.value);
  };

  const handleSubmitChargeMoney = async () => {
    try {
      await axios.put(
        `https://banking-course.herokuapp.com/cards/chargeMoney/${card.id}`,
        {
          chargeMoney,
        }
      );
      handleClickOpenSnackbar("успешное начисление средств", "success");
      getCards();
      handleClose();
      handleChargeDialogClose();
      await axios.post(
        `https://banking-course.herokuapp.com/payment_history/createPaymentHistory/${userUniqueId}`,
        { info: "успешное начисление средств", cost: chargeMoney }
      );
    } catch (error) {
      handleClickOpenSnackbar(error.response.data.responseContent, "error");
    }
  };

  const handleSubmitWithdrawMoney = async () => {
    try {
      await axios.put(
        `https://banking-course.herokuapp.com/cards/withdrawMoney/${card.id}`,
        {
          withdrawMoney,
        }
      );
      handleClickOpenSnackbar("успешное списание средств", "success");
      getCards();
      handleClose();
      handleWithdrawDialogClose();
      await axios.post(
        `https://banking-course.herokuapp.com/payment_history/createPaymentHistory/${userUniqueId}`,
        { info: "успешное списание стредств", cost: withdrawMoney }
      );
    } catch (error) {
      handleClickOpenSnackbar(error.response.data.responseContent, "error");
    }
  };

  const handleDeleteCard = async () => {
    try {
      await axios.delete(
        `https://banking-course.herokuapp.com/cards/deleteCard/${card.id}`
      );
      handleClickOpenSnackbar("успешное удаление карты", "success");
      getCards();
      handleClose();
      await axios.post(
        `https://banking-course.herokuapp.com/payment_history/createPaymentHistory/${userUniqueId}`,
        { info: "карта успешно удалена", cost: 0 }
      );
    } catch (error) {
      handleClickOpenSnackbar(error.response.data.responseContent, "error");
    }
  };

  const filterCards = allCards.filter((idx) => card.id !== idx.id);
  const cardBackground = useMemo(() => {
    return (
      <Card
        className={classes.media}
        style={{ backgroundColor: getRandomColor() }}
        title="Contemplative Reptile"
      />
    );
  }, []);

  return (
    <Grid item xs={3}>
      <Paper className={classes.paper}>
        <Card className={classes.root}>
          {cardBackground}
          <CardContent>
            <Typography variant="h6" component="span">
              {card.card_number}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {card.card_owner}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {card.card_cash}p
            </Typography>
          </CardContent>

          <CardActions className={classes.cardAction}>
            <Button
              size="small"
              color="primary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              действия
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClickChargeDialogOpen}>
                зачислить деньги
              </MenuItem>
              <MenuItem onClick={handleClickWithdrawDialogOpen}>
                вывести деньги
              </MenuItem>
              <MenuItem onClick={handleTransferDialogOpen}>
                перевести на другую карту
              </MenuItem>
              <MenuItem onClick={handleClickConverterDialogOpen}>
                посмотреть перевод в валюту
              </MenuItem>
              <MenuItem
                onClick={handleDeleteCard}
                className={classes.userCardDeleteOption}
              >
                удалить карту
              </MenuItem>
            </Menu>
          </CardActions>
        </Card>
      </Paper>
      <Dialog open={chargeOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Начислить деньги</DialogTitle>
        <DialogContent>
          <DialogContentText>
            сколько вы хотите начислить денег?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Сумма"
            helperText="руб. коп."
            type="email"
            fullWidth
            onChange={handleChangeChargeMoney}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChargeDialogClose} color="primary">
            отменить операцию
          </Button>
          <Button onClick={handleSubmitChargeMoney} color="primary">
            подтвердить
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={withDrawOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Списать деньги</DialogTitle>
        <DialogContent>
          <DialogContentText>
            сколько вы хотите списать денег?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Сумма"
            helperText="руб. коп."
            type="email"
            fullWidth
            onChange={handleChangeWithdrawMoney}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWithdrawDialogClose} color="primary">
            отменить операцию
          </Button>
          <Button onClick={handleSubmitWithdrawMoney} color="primary">
            подтвердить
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={converterOpen}
        aria-labelledby="form-dialog-title"
        className={classes.converterDialog}
        onClose={handleConverterDialogClose}
      >
        <DialogTitle id="form-dialog-title">Конвертер валют</DialogTitle>
        <DialogContent>
          <DialogContentText>1$ = 2,45 BYN</DialogContentText>
          <DialogContentText>1&euro; = 2,64 BYN</DialogContentText>
        </DialogContent>
        <DialogTitle id="form-dialog-title">
          {card.card_cash} BYN = {(card.card_cash / 2.45).toFixed(2)}$
        </DialogTitle>
        <DialogTitle id="form-dialog-title">
          {card.card_cash} BYN = {(card.card_cash / 2.64).toFixed(2)}&euro;
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleConverterDialogClose} color="primary">
            закрыть окно
          </Button>
        </DialogActions>
      </Dialog>
      <TransferToCard
        id={card.id}
        getCards={getCards}
        handleTransferDialogOpen={handleTransferDialogOpen}
        handleTransferDialogClose={handleTransferDialogClose}
        // allCards={allCards}
        allCards={filterCards}
        transferOpen={transferOpen}
        value={value}
        handleClose={handleClose}
      />
    </Grid>
  );
};

export default UserCard;
