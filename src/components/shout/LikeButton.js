import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// ICONS
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// REDUX
import { connect } from "react-redux";
import { likeShout, unlikeShout } from "../../redux/actions/dataActions";
// COMPONENTS
import MyButton from "../../util/MyButton";

//////////////////
// LIKE BUTTON //
////////////////////////////////////////////
export class LikeButton extends Component {
  likedShout = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.shoutId === this.props.shoutId)
    )
      return true;
    else return false;
  };

  likeShout = () => {
    this.props.likeShout(this.props.shoutId);
  };

  unlikeShout = () => {
    this.props.unlikeShout(this.props.shoutId);
  };

  // RENDER
  render() {
    const { authenticated } = this.props.user;
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
    return likeButton;
  }
}
//////////////////////////////////////////////

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  shoutId: PropTypes.string.isRequired,
  likeShout: PropTypes.func.isRequired,
  unlikeShout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeShout,
  unlikeShout,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
