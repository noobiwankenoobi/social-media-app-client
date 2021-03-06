// REACT
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import MyButton from "../../util/MyButton";
// ICONS
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

// REDUX
import { connect } from "react-redux";
import { deleteShout } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    top: "10%",
    left: "90%",
  },
};

///////////////////
// DELETE SHOUT //
//////////////////////////////////////
class DeleteShout extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  deleteShout = () => {
    this.props.deleteShout(this.props.shoutId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Shout"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this shout?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteShout} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
////////////////////////////////////////////

DeleteShout.propTypes = {
  deleteShout: PropTypes.func.isRequired,
  shoutId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { deleteShout })(withStyles(styles)(DeleteShout));
