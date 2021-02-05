import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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

const Upload = (setCatUploadedData) => {
  const classes = useStyles();
  const apiKey = process.env.REACT_APP_CAT_API_KEY;
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function postData(formData) {
    setLoading(true);
    await fetch("https://api.thecatapi.com/v1/images/upload", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "x-api-key": apiKey,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setCatUploadedData(data))
      .catch((err) => console.log("Error", err));
    setLoading(false);
    handleOpen();
  }

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
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
            Select an image from your device and upload to your gallery
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item className="file-select-upload-buttons">
                {loading === true ? (
                  <CircularProgress />
                ) : (
                  <>
                    <input
                      hidden
                      id="image"
                      type="file"
                      onChange={(e) => handleFileSelect(e)}
                    />

                    <label htmlFor="image">
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
                    <label className="fileName">
                      {selectedFile && (
                        <span>
                          <b>File Name:</b> {selectedFile.name}
                        </span>
                      )}
                    </label>

                    {selectedFile && (
                      <Button
                        variant="outlined"
                        onClick={() => handleSubmit()}
                        color="primary"
                      >
                        Upload
                      </Button>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </div>
        </Container>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Success!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your photo was uploaded successfully...go to the home page to view
              your gallery or cancel to upload another
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button href="/" variant="outlined" color="primary">
              GO TO GALLERY
            </Button>

            <Button
              variant="outlined"
              onClick={() => handleClose()}
              color="primary"
              autoFocus
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Upload;
