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

const Home = ({ catData, setCatData }) => {
  const classes = useStyles();

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
              ? "Your Uploaded Cat Photos"
              : "No images have been uploaded yet"}
          </h2>
          <Grid container spacing={3}>
            {catData !== null &&
              catData.map((cat) => (
                <Grid item xs={12} md={6} lg={3}>
                  <div style={{ width: "340px", height: "340px" }}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      key={cat.id}
                      alt="cat"
                      src={cat.url}
                    />
                  </div>
                </Grid>
              ))}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Home;
