import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  container: {
    height: "100vh",
  },
  profileTitleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "50px",
  },
  profileTitle: {
    marginRight: "auto",
  },
  userSettings: {
    marginRight: "20px",
  },
}));
