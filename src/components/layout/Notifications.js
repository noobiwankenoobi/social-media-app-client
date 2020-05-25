// REACT
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// PLUGINS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI Stuff
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from "@material-ui/core";
// ICONS
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// REDUX
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

////////////////////
// NOTIFICATIONS //
///////////////////////////////////////////
class Notifications extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unreadNotificationIds = this.props.notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);
    this.props.markNotificationsRead(unreadNotificationIds);
  };

  /////////////
  // RENDER //
  ///////////
  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    // WHICH ICON TO SHOW
    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((notification) => notification.read === false)
        .length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter(
                  (notification) => notification.read === false
                ).length
              }
              color="white"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    // NOTIFICATIONS MARKUP
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((notification) => {
          const verb = notification.type === "like" ? "liked" : "commented on";
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? "primary" : "secondary";
          const icon =
            notification.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={notification.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${notification.recipient}/shout/${notification.shoutId}`}
              >
                {notification.sender} {verb} your shout {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );

    // RETURN
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}
/////////////////////////////////////////////////////////

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
