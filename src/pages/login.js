// REACT
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
// REDUX
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

// IMAGES
import AppIcon from "../images/expletive-emoji.png";
import axios from "axios";

// STYLES
const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
    width: 80,
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  button: {
    margin: "20px auto 20px auto",
    position: "relative",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: [],
    };
  }
  // ON FORM SUBMIT //
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };
  // ON FORM CHANGE //
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  /////////////
  // RENDER //
  ///////////
  render() {
    // PROPS
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt="shout" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br></br>
            <small>
              don't have an account? sign up
              <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.ui,
});

const mapActionsToProp = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProp
)(withStyles(styles)(login));
