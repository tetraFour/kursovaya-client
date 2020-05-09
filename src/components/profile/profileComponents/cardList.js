import React from "react";

import UserCard from "./userCard";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

const CardList = ({ userCards, getCards, userUniqueId }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      {userCards.length ? (
        userCards.map((userCard, id) => (
          <div key={id}>
            <UserCard
              userUniqueId={userUniqueId}
              card={userCard}
              allCards={userCards}
              getCards={getCards}
            />
          </div>
        ))
      ) : (
        <Box className={classes.box}>
          <Typography className={classes.typography} variant="h4">
            У вас нет активных карт
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default CardList;
