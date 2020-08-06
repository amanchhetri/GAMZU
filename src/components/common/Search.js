import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";
import Loading from "./Loading";
import "../../style/Search.css";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      searchQuery: "",
      loading: false,
    };
  }

  handleChange = (event) => {
    const inputValue = event.target.value;

    this.setState({
      searchQuery: inputValue,
    });

    // If searchQuery isn't present, don't send request to server
    if (!inputValue) {
      return "";
    }

    this.setState({ loading: true });

    axios.get(`${API_URL}/games?search=${inputValue}`).then((response) => {
      this.setState({ loading: false, searchResults: response.data.results });
    });
  };

  handleRedirect(gameSlug) {
    // Clear input value and close autocomplete container,
    // By clearing searchQuery state
    this.setState({
      searchQuery: "",
      searchResults: [],
    });

    this.props.history.push(`/games/${gameSlug}`);
  }

  renderSearchResults = () => {
    const { searchQuery, searchResults, loading } = this.state;

    if (!searchQuery) {
      return "";
    }

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="Search-result"
              onClick={() => this.handleRedirect(result.slug)}
            >
              {result.name}
            </div>
          ))}
        </div>
      );
    }
    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">No Results Found</div>
        </div>
      );
    }
  };

  render() {
    const { loading, searchQuery } = this.state;

    return (
      <div className="Search">
        <span className="Search-icon" />

        <input
          className="Search-input"
          type="text"
          placeholder="Search by Game Name"
          onChange={this.handleChange}
          value={searchQuery}
        />
        {loading && (
          <div className="Search-loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default withRouter(Search);
