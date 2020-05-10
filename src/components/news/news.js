import React, { useEffect, useState } from "react";

import axios from "axios";

import NewsList from "./newsList";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useStyles } from "./newsList.style";

const NEWS_URL =
  "https://newsapi.org/v2/top-headlines?country=ru&apiKey=b2dd9ebb18cd41f481e282915f4c0ffc";

export default function News() {
  const [news, setNews] = useState([]);
  const [isNewsLoaded, setIsNewsLoaded] = useState(false);

  const classes = useStyles();

  const fetchNews = async () => {
    const result = await axios(NEWS_URL);
    setNews(result.data.articles);
    setIsNewsLoaded(true);
  };

  useEffect(() => {
    fetchNews();
  }, []);
  console.log(news);
  return (
    <div className={classes.root}>
      <Typography
        variant="h2"
        component="h3"
        gutterBottom
        className={classes.headTitle}
      >
        Новости
      </Typography>
      {isNewsLoaded ? (
        <NewsList news={news} />
      ) : (
        <CircularProgress color="secondary" className={classes.progressBar} />
      )}
    </div>
  );
}
