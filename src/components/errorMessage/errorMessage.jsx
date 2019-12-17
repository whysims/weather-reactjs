import React from "react";
import PropTypes from "prop-types";
import ErrorIcon from "@material-ui/icons/Error";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const ErrorMessage = props => {
  const { message } = props;
  return (
    <Snackbar
      style={{ backgroundColor: "amber" }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={!!message}
    >
      <SnackbarContent
        message={
          <span>
            <ErrorIcon /> {message}
          </span>
        }
      ></SnackbarContent>
    </Snackbar>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string
};
export default ErrorMessage;
