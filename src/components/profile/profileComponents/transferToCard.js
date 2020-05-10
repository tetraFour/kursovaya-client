import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useSnackbar } from "notistack";

import { useStyles } from "./styles";

import { url } from "../../../utils/apiUrl";

function ConfirmationDialogRaw(props) {
  const {
    onClose,
    value: valueProp,
    open,
    id,
    allCards,
    handleClose,
    getCards,
    handleTransferDialogClose,
    ...other
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState(valueProp);
  const [transferMoney, setTransferMoney] = useState(0);
  const radioGroupRef = useRef(null);

  const handleClickOpenSnackbar = (name, variant) =>
    enqueueSnackbar(name, { variant });

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

  const handleChangeTransferMoney = (event) => {
    setTransferMoney(+event.target.value);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    try {
      onClose(value);
      handleClose();
      const result = await axios.put(`${url}/cards/transferMoney/${id}`, {
        transferMoney,
        cardNumber: value,
      });
      await getCards();
      handleClickOpenSnackbar(result.data.responseContent, "success");
      await axios.post(`${url}/payment_history/createPaymentHistory/1`, {
        info: "успешный перевод на другую карту",
        cost: transferMoney,
      });
    } catch (error) {
      handleClickOpenSnackbar(error.response.data.responseContent, "error");
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //   console.log(value);
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
      {allCards.length ? (
        <>
          <DialogTitle id="confirmation-dialog-title">
            Выберите карту
          </DialogTitle>
          <DialogContent dividers>
            <RadioGroup
              ref={radioGroupRef}
              aria-label="ringtone"
              name="ringtone"
              value={value}
              onChange={handleChange}
              style={{ marginBottom: "40px" }}
            >
              {allCards.map((card, id) => (
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
            <DialogContentText>
              сколько вы хотите зачислить средств?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Сумма"
              helperText="руб. коп."
              type="email"
              fullWidth
              onChange={handleChangeTransferMoney}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={handleCancel}>
              отменить операцию
            </Button>
            <Button onClick={handleOk} color="primary">
              перевести деньги
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
    </Dialog>
  );
}

export default function ConfirmationDialog({
  allCards,
  value,
  transferOpen,
  getCards,
  handleTransferDialogClose,
  handleClose,
  id,
}) {
  const classes = useStyles();

  return (
    <>
      <ConfirmationDialogRaw
        classes={{
          paper: classes.paper,
        }}
        id={id}
        keepMounted
        open={transferOpen}
        onClose={handleTransferDialogClose}
        value={value}
        allCards={allCards}
        handleClose={handleClose}
        getCards={getCards}
      />
    </>
  );
}
