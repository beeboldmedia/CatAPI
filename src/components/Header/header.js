import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className="toolbar">
          <Link to="/">
            <Typography variant="h6" color="inherit" noWrap>
              Waracle Test - CatAPI
            </Typography>
          </Link>
          <Link to="/upload">Upload</Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
