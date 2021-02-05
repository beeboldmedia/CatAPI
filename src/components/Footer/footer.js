import React from "react";
import Typography from "@material-ui/core/Typography";
import "./footer.scss";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <footer className="footer">
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        A Waracle coding test by Robert Henderson
      </Typography>
      <Copyright />
    </footer>
  );
};

export default Footer;
