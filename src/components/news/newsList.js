import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import { useStyles } from "./newsList.style";
const NewsList = ({ news }) => {
  const classes = useStyles();
  return (
    <Grid container>
      {news.map((item, id) => (
        <Grid item xs={3} key={id}>
          <Paper className={classes.paper}>
            <Card className={classes.root}>
              <CardActionArea href={item.url} target="_blank">
                <CardMedia
                  className={classes.media}
                  image={`${item.urlToImage}`}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {item.source.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardAction}>
                <Button
                  size="small"
                  color="primary"
                  href={item.url}
                  target="_blank"
                >
                  Подробнее
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsList;
