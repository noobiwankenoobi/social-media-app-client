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
};
