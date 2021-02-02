import React from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Home from "./pages/Home/home";
import Upload from "./pages/Upload/upload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/upload">
          <Upload />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}
