import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

interface SearchFieldProps {
  placeholderText: string;
  onSearch: (value: string) => void;
  onReset: () => void;
}

function SearchField({ placeholderText, onSearch, onReset }: SearchFieldProps) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  function handleSearch(event) {
    event.preventDefault();
    onSearch(searchText);
  }

  function handleReset(event) {
    event.preventDefault();
    setSearchText('');
    onReset();
  }

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSearch} onReset={handleReset} variant="outlined">
      <InputBase
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className={classes.input}
        placeholder={placeholderText}
        inputProps={{ 'aria-label': placeholderText }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" type="reset" className={classes.iconButton} aria-label="clear">
        <ClearIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchField;
