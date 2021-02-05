import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./home.scss";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CircularProgress from "@material-ui/core/CircularProgress";

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
}));

const Home = ({
  loading,
  catImages,
  favourites,
  votes,
  postFavourite,
  postUnfavourite,
  postVote,
}) => {
  const classes = useStyles();
  const arrayOfFavourites =
    favourites !== null && favourites.map(({ image_id }) => image_id);

  const handleFavourite = (catId) => {
    if (arrayOfFavourites.includes(catId)) {
      let favourite = favourites.filter((x) => x.image_id === catId);
      postUnfavourite(favourite[0].id);
    } else {
      postFavourite(catId);
    }
  };

  const catScore = (catId) => {
    let scoresArray = votes
      .filter((x) => x.image_id === catId)
      .map(({ value }) => value);
    if (scoresArray.length > 0) {
      let replacingZerosArray = scoresArray
        .map((score) => (score === 0 ? score - 1 : score))
        .reduce((a, b) => a + b);
      return replacingZerosArray;
    } else {
      return 0;
    }
  };

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
            Cat Gallery
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            <Link href="/upload">Upload an image of your cat</Link>, vote up,
            vote down, favourite & unfavourite to test functionality
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid}>
        <div>
          <h2 className="title">
            {loading === true
              ? "Getting your images..."
              : "Your Uploaded Cat Images"}
          </h2>

          <Grid container className="gallery" spacing={3}>
            {loading === true ? (
              <CircularProgress />
            ) : (
              <>
                {catImages !== null && catImages.length !== 0 ? (
                  catImages.map((cat) => (
                    <Grid className="gridItem" key={cat.id} item>
                      <Paper
                        style={{ backgroundImage: `url(${cat.url})` }}
                        className="paper"
                        elevation={3}
                        square
                      >
                        <Tooltip title="Vote up!" aria-label="like">
                          <Fab
                            onClick={() => postVote(cat.id, 1)}
                            className="fab"
                          >
                            <ThumbUpIcon color="primary" />
                          </Fab>
                        </Tooltip>

                        <Tooltip title="Favourite!" aria-label="favourite">
                          <Fab
                            className="fab"
                            onClick={() => handleFavourite(cat.id)}
                          >
                            {arrayOfFavourites.includes(cat.id) === true ? (
                              <FavoriteIcon color="primary" />
                            ) : (
                              <FavoriteBorderIcon color="primary" />
                            )}
                          </Fab>
                        </Tooltip>

                        <Tooltip title="Vote down!" aria-label="dislike">
                          <Fab
                            className="fab"
                            onClick={() => postVote(cat.id, 0)}
                            aria-label="unlike"
                          >
                            <ThumbDownIcon color="secondary" />
                          </Fab>
                        </Tooltip>
                      </Paper>
                      <h3>Score: {catScore(cat.id)}</h3>
                    </Grid>
                  ))
                ) : (
                  <h3>
                    (your images will appear here when you start uploading)
                  </h3>
                )}
              </>
            )}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Home;
