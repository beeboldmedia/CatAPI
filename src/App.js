import React, { useState, useEffect } from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Home from "./pages/Home/home";
import Upload from "./pages/Upload/upload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const [catImages, setCatImages] = useState(null);
  const [favourites, setFavourites] = useState(null);
  const [votes, setVotes] = useState(null);
  const [catUploadedData, setCatUploadedData] = useState(null);
  const [catFavouriteData, setCatFavouriteData] = useState(null);
  const [catUnfavouriteData, setCatUnfavouriteData] = useState(null);
  const [catVoteData, setCatVoteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_CAT_API_KEY;

  useEffect(() => {
    fetchCatData();
  }, [catFavouriteData, catUnfavouriteData, catVoteData, catUploadedData]); // eslint-disable-line react-hooks/exhaustive-deps

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
      .then((data) => setCatFavouriteData(data))
      .catch((err) => console.log("Error", err));
  }

  async function postUnfavourite(catId) {
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
      .then((data) => setCatUnfavouriteData(data))
      .catch((err) => console.log("Error", err));
  }

  async function postVote(catId, value) {
    await fetch("https://api.thecatapi.com/v1/votes", {
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
      body: JSON.stringify({ image_id: catId, value: parseFloat(value) }),
    })
      .then((response) => response.json())
      .then((data) => setCatVoteData(data))
      .catch((err) => console.log("Error", err));
  }

  return (
    <Router className="root">
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
            postVote={postVote}
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
