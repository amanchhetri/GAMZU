import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "../../style/Table.css";

const Table = (props) => {
  const { games, history } = props;

  return (
    <div className="Table-container">
      <table className="Table">
        <thead className="Table-head">
          <tr>
            <th>Game</th>
            <th>Released Date</th>
            <th>Rating/5</th>
            <th>Ratings Count</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody className="Table-body">
          {games.map((game) => (
            <tr key={game.id} onClick={() => history.push(`/games/${game.id}`)}>
              <td>{game.name}</td>
              <td>
                <span className="Table-dollar">{game.released}</span>
              </td>
              <td>
                <span className="Table-dollar">{game.rating}</span>
              </td>
              <td>
                <span className="Table-dollar">{game.ratings_count}</span>
              </td>
              <td>
                <span className="Table-dollar">{game.added}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  games: PropTypes.array.isRequired,
};

export default withRouter(Table);
