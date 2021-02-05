import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import waracleLogo from "../../static/images/waracle-logo.png";
import catIcon from "../../static/images/cat-icon.png";
import "./header.scss";

const Header = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className="toolbar">
          <Link className="homeButton" to="/">
            <img alt="cat-icon" src={catIcon} />
            <Typography variant="h6" color="inherit" noWrap>
              The CatAPI Challenge by
            </Typography>
            <img alt="cat-icon" src={waracleLogo} />
          </Link>
          <Link className="uploadButton" to="/upload">
            Upload your images!
            <CameraAltIcon />
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
