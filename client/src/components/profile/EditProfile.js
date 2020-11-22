import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import {createProfile, getCurrentProfile} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import Header from '../common/Header';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            displayName: '',
            country: '',
            totalGamesPlayed: '',
            favGenre: '',
            instagram: '',
            facebook: '',
            steam: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Bring favGenre array back to CSV
            const favGenreCSV = profile.favGenre.join(',');

            // If profile doesn't exist, make empty string
            profile.displayName = !isEmpty(profile.displayName) ? profile.displayName : '';
            profile.country = !isEmpty(profile.country) ? profile.country : '';
            profile.totalGamesPlayed = !isEmpty(profile.totalGamesPlayed) ? profile.totalGamesPlayed : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
            profile.steam = !isEmpty(profile.social.steam) ? profile.social.steam : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';

            // Set component fields state
            this.setState({
                handle: profile.handle,
                displayName: profile.displayName,
                country: profile.country,
                totalGamesPlayed: profile.totalGamesPlayed,
                favGenre: favGenreCSV,
                instagram: profile.instagram,
                steam: profile.steam,
                facebook: profile.facebook,
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            displayName: this.state.displayName,
            country: this.state.country,
            totalGamesPlayed: this.state.totalGamesPlayed,
            favGenre: this.state.favGenre,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            steam: this.state.steam,
        }
        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors , displaySocialInputs} = this.state;

        let socialInputs;

        if(displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error = {errors.instagram}
                    />
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error = {errors.facebook}
                    />
                    <InputGroup
                        placeholder="Steam Profile URL"
                        name="steam"
                        icon="fab fa-steam"
                        value={this.state.steam}
                        onChange={this.onChange}
                        error = {errors.steam}
                    />
                </div>
            )
        }

        return (
            <div>
                <Header />
            
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error = {errors.handle}
                                    info = "A unique handle for your profile URL."
                                />
                                <TextFieldGroup 
                                    placeholder="* Display Name"
                                    name="displayName"
                                    value={this.state.displayName}
                                    onChange={this.onChange}
                                    error = {errors.displayName}
                                    info = "A unique handle for your profile URL."
                                />
                                <TextFieldGroup 
                                    placeholder="* Country"
                                    name="country"
                                    value={this.state.country}
                                    onChange={this.onChange}
                                    error = {errors.country}
                                    info = "A unique handle for your profile URL."
                                />
                                <TextFieldGroup 
                                    placeholder="* Total Games Played"
                                    name="totalGamesPlayed"
                                    value={this.state.totalGamesPlayed}
                                    onChange={this.onChange}
                                    error = {errors.totalGamesPlayed}
                                    info = "A unique handle for your profile URL."
                                />
                                <TextFieldGroup 
                                    placeholder="* Favorite Genre"
                                    name="favGenre"
                                    value={this.state.favGenre}
                                    onChange={this.onChange}
                                    error = {errors.favGenre}
                                    info = "A unique handle for your profile URL."
                                />

                                <div className="mb-3">
                                    <button type="button" onClick={() => {
                                        this.setState(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} className="btn btn-light">
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));
