import React, { Component } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import "../../style/Detail.css";
import "../../index.css";
import Loading from "../common/Loading";
import striptags from "striptags";

class Detail extends Component {
  constructor() {
    super();

    this.state = {
      gameData: [],
      loading: false,
      error: null,
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
        this.setState({
          gameData: response.data,
          loading: false,
          error: null,
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
    const { loading, error, gameData } = this.state;

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
        <h1 className="Detail-heading">{gameData.name}</h1>

        <div className="Detail-container">
          <div className="Detail-item">
            Released On:{" "}
            <span className="Detail-value">{gameData.released}</span>
          </div>
          <div className="Detail-item">
            Rating: <span className="Detail-value">{gameData.rating}</span>
          </div>
          <div className="Detail-item">
            Ratings Count:{" "}
            <span className="Detail-value">{gameData.ratings_count}</span>
          </div>
          <div className="Detail-item">
            Description: {striptags(gameData.description)}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
