// REACT
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// COMPONENTS
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

// OTHER
import dayjs from "dayjs";
// ICONS
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
// REDUX
import { connect } from "react-redux";
import { getShout, clearErrors } from "../../redux/actions/dataActions";
// FUNCTIONS

// STYLES
const styles = (theme) => ({
  ...theme.spreadThis,

  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 40,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: 10,
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
  },
});

///////////////////
// SHOUT DIALOG //
//////////////////////////////////////
class ShoutDialog extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getShout(this.props.shoutId);
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      shout: {
        body,
        createdAt,
        userImage,
        shoutId,
        userHandle,
        likeCount,
        commentCount,
        comments,
      },
      ui: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className="spinnerDiv">
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton shoutId={shoutId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm shoutId={shoutId} />
        <hr className={classes.invisibleSeparator} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand shout"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
//////////////////////////////////////

ShoutDialog.propTypes = {
  getShout: PropTypes.func.isRequired,
  shoutId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  shout: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  shout: state.data.shout,
  ui: state.ui,
});

const mapActionsToProps = {
  getShout,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ShoutDialog));
