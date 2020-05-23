// REACT
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";

import Typography from "@material-ui/core/Typography";

// ICONS
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
// OTHER
import dayjs from "dayjs";

/////////////
// STYLES //
///////////////////////////////////////////////////////
const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        // color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
});

/////////////////////
// STATIC PROFILE //
////////////////////////////////////////////
const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            // LOCATION
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            // WEBSITE //
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </Fragment>
            // JOINED DATE
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
};
///////////////////////////////////////////////////

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
