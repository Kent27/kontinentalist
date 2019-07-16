import React, { Component } from "react";
import MuiTextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";

class TextField extends Component {
  render() {
    const { classes, endAdornment, ...props } = this.props;
    return (
      <MuiTextField
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput
          },
          endAdornment: endAdornment
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.bootstrapFormLabel
        }}
        {...props}
      />
    );
  }
}

const styles = theme => ({
  bootstrapRoot: {
    padding: 0,
    "label + &": {
      marginTop: 6
    }
  },
  bootstrapInput: {
    marginTop: 16,
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    fontWeight: 100,
    padding: "10px 12px",
    width: "calc(100% - 24px)",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    // marginTop: 16,
    fontSize: 17.33,
    fontWeight: "bold"
  }
});

export default withStyles(styles)(TextField);
