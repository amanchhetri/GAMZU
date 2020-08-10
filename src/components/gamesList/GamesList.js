import React, { Component } from "react";
import axios from "axios";
import Header from "../common/Header";
import { API_URL } from "../../config";
import Loading from "../common/Loading";
import Table from "./Table";
import PageButtons from "./PageButtons";

class GamesList extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      games: [],
      error: null,
      totalPages: 0,
      page: 1,
      pageSize: 20,
    };
  }

  fetchGamesList() {
    this.setState({ loading: true });

    const { page, pageSize } = this.state;

    axios
      //.get(`${API_URL}/games?page=${page}&page_size=${pageSize}`)
      .get(
        `${API_URL}/games?dates=2020-01-01%2C2020-12-31&ordering=-added&page=${page}&page_size=${pageSize}`
      )
      .then((response) => {
        this.setState({
          loading: false,
          games: response.data.results,
          totalPages: Math.ceil(response.data.count / pageSize),
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err.response.statusText,
        });
      });
  }

  componentDidMount() {
    this.fetchGamesList();
  }

  handlePageButtonClick = (direction) => {
    let nextPage = this.state.page;

    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
    // if(direction === 'next') {
    //     nextPage++;
    // } else {
    //     nextPage--;
    // }

    this.setState(
      {
        page: nextPage,
      },
      () => this.fetchGamesList()
    );
  };

  render() {
    const { loading, error, games, page, totalPages } = this.state;
    // render only loading component, if loading state is set to true
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }

    // render only error message, if error occured while fetching data
    if (error) {
      return <div className="error">{error}</div>;
    }

    return (
      <div>
        <Header />
        <Table games={games} />
        <PageButtons
          page={page}
          totalPages={totalPages}
          handlePageButtonClick={this.handlePageButtonClick}
        />
      </div>
    );
  }
}

export default GamesList;
