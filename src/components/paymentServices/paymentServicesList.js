import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useStyles } from "./paymentServices.styles";

import { useSnackbar } from "notistack";

import url from "../../utils/apiUrl";

const PaymentServicesList = ({ serviceName, servicePrice, userUniqueId }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    // console.log(userUniqueId);
  }, []);

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpenSnackbar = (name, variant) =>
    enqueueSnackbar(name, { variant });

  const handleClickListItem = () => {
    // axios.post();
    setOpen(true);
  };
  // console.log(value);

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  return (
    <>
      <TableRow>
        <TableCell align="center">{serviceName}</TableCell>
        <TableCell align="center">{servicePrice} руб</TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            size="small"
            color="default"
            onClick={handleClickListItem}
          >
            оплатить
          </Button>
        </TableCell>
      </TableRow>
      <ConfirmationDialogRaw
        classes={{
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        servicePrice={servicePrice}
        userUniqueId={userUniqueId}
        handleClickOpenSnackbar={handleClickOpenSnackbar}
      />
    </>
  );
};

function ConfirmationDialogRaw(props) {
  const {
    onClose,
    value: valueProp,
    handleClickOpenSnackbar,
    open,
    servicePrice,
    userUniqueId,
    ...other
  } = props;
  const [value, setValue] = useState(valueProp);

  const radioGroupRef = useRef(null);

  const [userCards, setUserCards] = useState([]);

  async function getCards() {
    try {
      const cards = await axios.get(`${url}/cards/getCards/${userUniqueId}`);

      setUserCards([...cards.data]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    try {
      const result = await axios.put(`${url}/cards/withdrawMoney/${value}`, {
        withdrawMoney: servicePrice,
      });
      await axios.post(
        `${url}/payment_history/createPaymentHistory/${userUniqueId}`,
        { info: "успешная оплата услуг", cost: servicePrice }
      );
      onClose(value);
      getCards();
      handleClickOpenSnackbar(result.data.responseContent, "success");
    } catch (error) {
      handleClickOpenSnackbar(
        `${error.response.data.responseContent}. Попробуйте выбрать другую карту или пополните средства.`,
        "error"
      );
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      {userCards.length ? (
        <>
          <DialogTitle id="confirmation-dialog-title">
            выберите карту
          </DialogTitle>
          <DialogContent dividers>
            <RadioGroup
              ref={radioGroupRef}
              aria-label="ringtone"
              name="ringtone"
              value={value}
              onChange={handleChange}
            >
              {userCards.map((card, id) => (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    value={`${card.id}`}
                    control={<Radio />}
                    label={card.card_number}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {card.card_cash} руб.
                  </Typography>
                </div>
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCancel} color="primary">
              отменить платеж
            </Button>
            <Button onClick={handleOk} color="primary">
              подтвердить платеж
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle id="confirmation-dialog-title">
            нет других карт
          </DialogTitle>
          <Button autoFocus color="primary" onClick={handleCancel}>
            выйти
          </Button>
        </>
      )}
      {/* <DialogTitle id="confirmation-dialog-title">выберите карту</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {userCards.map((card, id) => (
            <div
              key={id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value={`${card.id}`}
                control={<Radio />}
                label={card.card_number}
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {card.card_cash} руб.
              </Typography>
            </div>
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          отменить платеж
        </Button>
        <Button onClick={handleOk} color="primary">
          подтвердить платеж
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

export default PaymentServicesList;
