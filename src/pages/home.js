// REACT
import React, { Component } from "react";
import PropTypes from "prop-types";
// MUI
import Grid from "@material-ui/core/Grid";
// REDUX
import { connect } from "react-redux";
import { getShouts } from "../redux/actions/dataActions";

// COMPONENTS
import Shout from "../components/Shout";
import Profile from "../components/Profile";

//////////////////////
// HOME PAGE ROUTE //
///////////////////////////////////////
class home extends Component {
  componentDidMount() {
    this.props.getShouts();
  }

  // RENDER //
  render() {
    const { shouts, loading } = this.props.data;

    let recentShoutsMarkup = !loading ? (
      shouts.map((shout) => <Shout key={shout.shoutId} shout={shout} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentShoutsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
/////////////////////////////////////////////
home.propTypes = {
  getShouts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getShouts })(home);
