// REACT
import React, { Component } from "react";
import axios from "axios";

// MUI
import Grid from "@material-ui/core/Grid";

// COMPONENT
class home extends Component {
  state = {
    shouts: null,
  };

  componentDidMount() {
    axios
      .get("/shouts")
      .then((res) => {
        console.log(res.data);
        this.setState({
          shouts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let recentShoutsMarkup = this.state.shouts ? (
      this.state.shouts.map((shout) => <p>{shout.body}</p>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentShoutsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
