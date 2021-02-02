import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import "./upload.scss";

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

const Upload = () => {
  const classes = useStyles();
  const apiKey = process.env.REACT_APP_CAT_API_KEY;
  const [selectedFile, setSelectedFile] = useState(null);
  const [catUploadedData, setCatUploadedData] = useState(null);
  console.log(catUploadedData);

  // Example POST method implementation:
  async function postData(formData) {
    const response = await fetch("https://api.thecatapi.com/v1/images/upload", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "x-api-key": apiKey,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: formData, // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((data) => setCatUploadedData(data)); // parses JSON response into native JavaScript objects
  }

  console.log("selectedFile", selectedFile);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    console.log("file", files);
    setSelectedFile(files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    postData(formData);
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
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item className="file-select-upload-buttons">
                <input
                  hidden
                  id="faceImage"
                  type="file"
                  onChange={(e) => handleFileSelect(e)}
                />

                <label htmlFor="faceImage">
                  <Button
                    variant="outlined"
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    Select Image
                  </Button>
                </label>
                <br />
                <label>
                  {selectedFile ? selectedFile.name : "Select Image"}
                </label>

                <Button onClick={() => handleSubmit()} color="primary">
                  Upload
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid}>
        <Grid container spacing={3}></Grid>
      </Container>
    </>
  );
};

export default Upload;
