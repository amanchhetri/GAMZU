import React, { Component } from "react";
import Header from "../common/Header";
import { API_URL } from "../../config";
import axios from "axios";
import "../../style/Detail.css";
import "../../index.css";
import Loading from "../common/Loading";
import WebLogo from "../../images/web2.png";

class Detail extends Component {
  constructor() {
    super();

    this.state = {
      gameData: [],
      loading: false,
      error: null,
      platforms: [],
      genres: [],
      developers: [],
      stores: [],
    };
  }

  componentDidMount() {
    const gameName = this.props.match.params.name;

    this.fetchGame(gameName);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      // Get new game name from url
      const newGameName = nextProps.match.params.name;

      this.fetchGame(newGameName);
    }
  }

  fetchGame(gameName) {
    this.setState({ loading: true });

    axios
      .get(`${API_URL}/games/${gameName}`)
      .then((response) => {
        const res = response.data;
        this.setState({
          gameData: res,
          loading: false,
          error: null,
          platforms: res.parent_platforms,
          genres: res.genres,
          developers: res.developers,
          stores: res.stores,
        });
        console.log(this.state);
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err.response.statusText,
        });
      });
  }

  render() {
    const {
      loading,
      error,
      gameData,
      platforms,
      genres,
      developers,
      stores,
    } = this.state;

    // Render only loading component if loading state is set to true
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }

    // Render only error message, if error occured while fetching data
    if (error) {
      return <div className="error">{error}</div>;
    }

    return (
      <div
        className="Detail"
        style={{ backgroundImage: `url(${gameData.background_image})` }}
      >
        <div className="Detail-header">
          <Header />
        </div>
        <h1 className="Detail-heading">{gameData.name}</h1>

        <div className="Detail-container">
          <a href={gameData.website} target="_blank" rel="noopener noreferrer">
            <img src={WebLogo} alt="logo" className="Web-logo" />
          </a>
          <div className="Detail-item">
            Released On:{" "}
            <span className="Detail-value">{gameData.released}</span>
          </div>
          <div className="Detail-item">
            Metacritic:{" "}
            <span className="Detail-value">{gameData.metacritic}</span>
          </div>
          <div className="Detail-item">
            Platforms:{" "}
            {platforms.map((platform) => {
              return (
                <span className="Detail-value" key={platform.platform.id}>
                  {platform.platform.name}
                </span>
              );
            })}
          </div>
          <div className="Detail-item">
            Genres:{" "}
            {genres.map((genre) => {
              return (
                <span className="Detail-value" key={genre.id}>
                  {genre.name}
                </span>
              );
            })}
          </div>
          <div className="Detail-item">
            About: <p className="Detail-para">{gameData.description_raw}</p>
          </div>
          <div className="Detail-item">
            Where to buy:{" "}
            {stores.map((store) => {
              return (
                <span className="Detail-value" key={store.id}>
                  {store.store.name}
                </span>
              );
            })}
          </div>
          <div className="Detail-item">
            Developers:{" "}
            {developers.map((dev) => {
              return (
                <span className="Detail-value" key={dev.id}>
                  {dev.name}
                </span>
              );
            })}
          </div>
          <div className="Detail-item">
            Rating: <span className="Detail-value">{gameData.rating} / 5</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
