import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '500px',
        margin: 'auto',
        marginTop: '10px',
        backgroundColor: theme.palette.primary.light,
    },
    autocomplete: {
        width: '450px',
    },
    searchButtonContainer: {
        backgroundColor: '#455a64',
        borderRadius: '3px',
        marginLeft: '5px',
    }
}))

const SearchBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Autocomplete
            id="searchBar"
            options={props.locationList}
            getOptionLabel={(option) => option.title}
            classes={{ root: classes.autocomplete }}
            renderInput={(params) => <TextField {...params} label="Search City" variant="outlined"/>}
            onChange={props.handleLocationSelect}
            />
            <div className={classes.searchButtonContainer}>
                <IconButton onClick={props.handleLocationSearch}>
                    <SearchIcon style={{ color: 'white', marginTop: '4px' }}/>
                </IconButton>
            </div>
        </div>
      );
}

export default SearchBar;