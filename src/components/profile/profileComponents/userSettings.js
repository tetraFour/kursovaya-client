import React from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";

import { useSnackbar } from "notistack";
import { useStyles } from "../profile.styles";

import { url } from "../../../utils/apiUrl";

const UserSettings = ({ userUniqueId, getUser, userAuth }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpenSnackbar = (name, variant) =>
    enqueueSnackbar(name, { variant });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openChangeNameDialog, setOpenChangeNameDialog] = React.useState(false);

  const [openCheckProfileDialog, setOpenCheckProfileDialog] = React.useState(
    false
  );

  const [login, setLogin] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const loginChangeHandler = (event) => {
    setLogin(event.target.value);
  };

  const submitNameChangeHandler = async () => {
    try {
      await axios.put(`${url}/users/changeName/${userUniqueId}`, {
        newName: name,
      });
      handleClickOpenSnackbar("успешная смена имени", "success");
      getUser();
      handleCloseOpenChangeNameDialog();
    } catch (error) {
      handleClickOpenSnackbar(error.response.data.responseContent, "error");
    }
  };
  const submitLoginChangeHandler = async () => {
    try {
      await axios.put(`${url}/users/changeLogin/${userUniqueId}`, {
        newLogin: login,
      });
      handleClickOpenSnackbar("успешная смена login", "success");
      getUser();
      handleCloseChangeLoginDialog();
    } catch (error) {
      handleClickOpenSnackbar(error.response.data.responseContent, "error");
    }
  };
  const submitEmailChangeHandler = async () => {
    try {
      await axios.put(`${url}/users/changeEmail/${userUniqueId}`, {
        newEmail: email,
      });
      handleCloseChangeEmailDialog();
      getUser();
      handleClickOpenSnackbar("успешная смена email", "success");
    } catch (error) {
      handleClickOpenSnackbar(error.response.data.responseContent, "error");
    }
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const handleClickOpenChangeNameDialog = () => {
    setOpenChangeNameDialog(true);
  };

  const handleCloseOpenChangeNameDialog = () => {
    setOpenChangeNameDialog(false);
  };
  const handleClickOpenCheckProfileDialog = () => {
    setOpenCheckProfileDialog(true);
  };

  const handleClickCloseCheckProfileDialog = () => {
    setOpenCheckProfileDialog(false);
  };
  const [openChangeLoginDialog, setOpenChangeLoginDialog] = React.useState(
    false
  );

  const handleClickOpenChangeLoginDialog = () => {
    setOpenChangeLoginDialog(true);
  };

  const handleCloseChangeLoginDialog = () => {
    setOpenChangeLoginDialog(false);
  };
  const [openChangeEmailDialog, setOpenChangeEmailDialog] = React.useState(
    false
  );

  const handleClickOpenChangeEmailDialog = () => {
    setOpenChangeEmailDialog(true);
  };

  const handleCloseChangeEmailDialog = () => {
    setOpenChangeEmailDialog(false);
  };

  return (
    <div className={classes.userSettings}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        настройки
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickOpenCheckProfileDialog}>профиль</MenuItem>
        <MenuItem onClick={handleClickOpenChangeNameDialog}>
          сменить имя
        </MenuItem>
        <MenuItem onClick={handleClickOpenChangeLoginDialog}>
          сменить логин
        </MenuItem>
        <MenuItem onClick={handleClickOpenChangeEmailDialog}>
          сменить email
        </MenuItem>
      </Menu>
      <Dialog
        open={openChangeNameDialog}
        onClose={handleCloseOpenChangeNameDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Изменить имя</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="имя"
            type="text"
            fullWidth
            onChange={nameChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOpenChangeNameDialog} color="primary">
            отменить
          </Button>
          <Button onClick={submitNameChangeHandler} color="primary">
            изменить
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openChangeLoginDialog}
        onClose={handleCloseChangeLoginDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">изменить логин</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="логин"
            type="text"
            fullWidth
            onChange={loginChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangeLoginDialog} color="primary">
            отменить
          </Button>
          <Button onClick={submitLoginChangeHandler} color="primary">
            изменить
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openChangeEmailDialog}
        onClose={handleCloseChangeEmailDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">изменить email</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="email"
            type="email"
            fullWidth
            onChange={emailChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangeEmailDialog} color="primary">
            отменить
          </Button>
          <Button onClick={submitEmailChangeHandler} color="primary">
            изменить
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCheckProfileDialog}
        onClose={handleClickCloseCheckProfileDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Профиль</DialogTitle>
        <DialogContent>имя: {userAuth.name}</DialogContent>
        <DialogContent>логин: {userAuth.login}</DialogContent>
        <DialogContent>email: {userAuth.email}</DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseCheckProfileDialog} color="primary">
            закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserSettings;
