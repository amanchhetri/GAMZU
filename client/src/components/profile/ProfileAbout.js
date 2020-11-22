import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ProfileAbout extends Component {
    render() {
        const {profile} = this.props;

        // Favorite Genre
        const genres = profile.favGenre.map((genre, index) => (
            <div key={index} className="p-3">
                <i className="fa fa-check" /> {genre}
            </div>
        ));

        return (
            <div>
            <h3 className="text-center text-info">Favorite Genre</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {genres}
              </div>
            </div>
            </div>
        )
    }
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
