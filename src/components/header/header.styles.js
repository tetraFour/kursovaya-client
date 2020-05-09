import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  links: {
    marginRight: "30px",
    color: "#3f51b5",
    textDecoration: "none",
    "&.active": {
      color: "#8295ff",
    },
  },
  header: {
    backgroundColor: "white",
  },
}));
