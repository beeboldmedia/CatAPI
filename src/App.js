import React, { useState, useEffect } from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Home from "./pages/Home/home";
import Upload from "./pages/Upload/upload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [catImages, setCatImages] = useState(null);
  const [favourites, setFavourites] = useState(null);
  const [votes, setVotes] = useState(null);
  const [catUploadedData, setCatUploadedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_CAT_API_KEY;

  useEffect(() => {
    setLoading(true);
    fetchCatData();
  }, [catUploadedData]);

  async function fetchCatData() {
    setLoading(true);
    await Promise.all([
      fetch("https://api.thecatapi.com/v1/images?limit=100", {
        headers: {
          "x-api-key": apiKey,
        },
      }),
      fetch("https://api.thecatapi.com/v1/favourites?limit=100", {
        headers: {
          "x-api-key": apiKey,
        },
      }),
      fetch("https://api.thecatapi.com/v1/votes?limit=100", {
        headers: {
          "x-api-key": apiKey,
        },
      }),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        setCatImages(data[0]);
        setFavourites(data[1]);
        setVotes(data[2]);
      })
      .catch((err) => console.log("Error", err));
    setLoading(false);
  }

  async function postFavourite(catId) {
    setLoading(true);
    await fetch("https://api.thecatapi.com/v1/favourites", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "x-api-key": apiKey,
        "content-type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ image_id: catId }),
    })
      .then((response) => response.json())
      .then((data) => console.log("favouriteData", data))
      .catch((err) => console.log("Error", err));
    setLoading(false);
  }

  async function postUnfavourite(catId) {
    setLoading(true);
    await fetch(`https://api.thecatapi.com/v1/favourites/${catId}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "x-api-key": apiKey,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => response.json())
      .then((data) => console.log("unfavouriteData", data))
      .catch((err) => console.log("Error", err));
    setLoading(false);
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home
            loading={loading}
            catImages={catImages}
            favourites={favourites}
            votes={votes}
            postFavourite={postFavourite}
            postUnfavourite={postUnfavourite}
          />
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
