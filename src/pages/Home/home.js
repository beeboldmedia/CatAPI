import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./home.scss";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [catData, setCatData] = useState(null);
  const apiKey = process.env.REACT_APP_CAT_API_KEY;

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Cat Uploader
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Upload an image of your cat, vote, unvote, favourite & unfavourite
            to test functionality
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid}>
        <div>
          <h2>
            {catData !== null
              ? "Images of cats to appear here"
              : "No images have been uploaded yet"}
          </h2>
        </div>
        <Grid container spacing={3}></Grid>
      </Container>
    </>
  );
};

export default Home;
