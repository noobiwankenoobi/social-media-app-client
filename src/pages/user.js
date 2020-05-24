// REACT
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// COMPONENTS
import Shout from "../components/shout/Shout";
import StaticProfile from "../components/profile/StaticProfile";
import ShoutSkeleton from "../util/ShoutSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
// MUI
import Grid from "@material-ui/core/Grid";
// REDUX
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    shoutIdParam: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const shoutId = this.props.match.params.shoutId;

    if (shoutId) this.setState({ shoutIdParam: shoutId });

    // GET USER DATA
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { shouts, loading } = this.props.data;
    const { shoutIdParam } = this.state;

    const shoutsMarkup = loading ? (
      <ShoutSkeleton />
    ) : shouts === null ? (
      <p>No shouts from this user</p>
    ) : !shoutIdParam ? (
      shouts.map((shout) => <Shout key={shout.shoutId} shout={shout} />)
    ) : (
      shouts.map((shout) => {
        if (shout.shoutId !== shoutIdParam)
          return <Shout key={shout.shoutId} shout={shout} />;
        else return <Shout key={shout.shoutId} shout={shout} openDialog />;
      })
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={8} xs={12}>
          {shoutsMarkup}
        </Grid>
      </Grid>
    );
  }
}
//////////////////////////////////////////////

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
