// REACT
import React, { Component } from "react";
import { Link } from "react-router-dom";
// PLUGINS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//MUI Stuff
import { withStyles } from "@material-ui/core/styles";
import { Card, Typography, CardContent, CardMedia } from "@material-ui/core";

// STYLES for COMPONENT
const styles = {
  card: {
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

class Shout extends Component {
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
    } = this.props;

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
          <Typography variant="body1">{body}</Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Shout);
// export default Shout;
