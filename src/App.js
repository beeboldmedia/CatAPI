import React, { useState, useEffect } from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Home from "./pages/Home/home";
import Upload from "./pages/Upload/upload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [catData, setCatData] = useState(null);
  const [catUploadedData, setCatUploadedData] = useState(null);
  const apiKey = process.env.REACT_APP_CAT_API_KEY;

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images?limit=100", {
      headers: {
        "x-api-key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => setCatData(data));
  }, [catData, catUploadedData]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home catData={catData} setCatData={setCatData} />
        </Route>
        <Route path="/upload">
          <Upload setCatUploadedData={setCatUploadedData} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
