import { deepOrange } from "@material-ui/core/colors";

export default {
  palette: {
    primary: {
      main: "#ff1744",
    },
    secondary: deepOrange,
  },
  typography: {
    userNextVariants: true,
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
  },
  progress: {
    position: "absolute",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  image: {
    margin: "20px auto 20px auto",
  },
};
