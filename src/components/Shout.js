// REACT
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// PLUGINS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import { Card, Typography, CardContent, CardMedia } from "@material-ui/core";
import MyButton from "../util/MyButton";
// ICONS
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// COMPONENTS
import DeleteShout from "./DeleteShout";
import ShoutDialog from "./ShoutDialog";
// REDUX
import { connect } from "react-redux";
import { likeShout, unlikeShout } from "../redux/actions/dataActions";

// STYLES for COMPONENT
const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

//////////////////////
// SHOUT COMPONENT //
///////////////////////////////////////////////
class Shout extends Component {
  likedShout = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.shoutId === this.props.shout.shoutId
      )
    )
      return true;
    else return false;
  };

  likeShout = () => {
    this.props.likeShout(this.props.shout.shoutId);
  };

  unlikeShout = () => {
    this.props.unlikeShout(this.props.shout.shoutId);
  };

  render() {
    dayjs.extend(relativeTime);
    // PROPS
    const {
      classes,
      shout: {
        body,
        createdAt,
        userImage,
        userHandle,
        shoutId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    // LIKE BUTTON
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedShout() ? (
      <MyButton tip="Undo like" onClick={this.unlikeShout}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeShout}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    // DELETE BUTTON // Depends on authenticated
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteShout shoutId={shoutId} />
      ) : null;

    //RENDER
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
          <ShoutDialog shoutId={shoutId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}
//////////////////////////////////////////////////////////
Shout.propTypes = {
  likeShout: PropTypes.func.isRequired,
  unlikeShout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  shout: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeShout,
  unlikeShout,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Shout));
// export default Shout;
