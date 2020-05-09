import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  box: {
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  typography: {
    color: "#a9a7a7",
  },

  container: {
    justifyContent: "flex-start",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
  },
  root: {
    flexGrow: 1,
    minWidth: 275,
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 140,
    // backgroundColor: theme.palette.info.light,
    backgroundPosition: "top",
  },
  headTitle: {
    textAlign: "center",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  progressBar: {
    margin: "0 auto",
  },
  cardAction: {
    marginTop: "auto",
  },
  userCardDeleteOption: {
    color: "#c51162",
  },
  converterDialog: {
    minWidth: 400,
  },
}));
