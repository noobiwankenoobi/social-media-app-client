// REACT
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// COMPONENTS
import MyButton from "../../util/MyButton";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

// ICONS
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// REDUX
import { connect } from "react-redux";
import { postShout, clearErrors } from "../../redux/actions/dataActions";
// FUNCTIONS

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    marginTop: 10,
    float: "right",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "6%",
  },
});

///////////////////////////
// POST SHOUT COMPONENT //
//////////////////////////////////////////////
class PostShout extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.ui.errors) {
      this.setState({
        errors: nextProps.ui.errors,
      });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postShout({ body: this.state.body });
  };

  // RENDER
  render() {
    const { errors } = this.state;
    const {
      classes,
      ui: { loading },
    } = this.props;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Shout!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new shout</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SHOUT!"
                multiline
                rows="3"
                placeholder="Shout at someone on the internet"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
///////////////////////////////////////////////

PostShout.propTypes = {
  postShout: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

export default connect(mapStateToProps, { postShout, clearErrors })(
  withStyles(styles)(PostShout)
);
