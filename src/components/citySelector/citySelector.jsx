import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const CitySelector = props => {
  const classes = useStyles();

  const [city, setCity] = useState();

  const handleSubmit = event => {
    props.setCity(city);
    event.preventDefault();
  };

  return (
    <CardContent className={classes.root}>
      <Paper component="form" onSubmit={handleSubmit}>
        <InputBase
          placeholder="Search for a city"
          onChange={e => setCity(e.target.value)}
          className={classes.input}
        />
        <IconButton
          type="submit"
          aria-label="search"
          className={classes.iconButton}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </CardContent>
  );
};

export default CitySelector;
