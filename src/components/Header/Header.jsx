import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TripOriginIcon from '@mui/icons-material/TripOrigin';

import useStyles from './HeaderStyles';

const Header = ({ onPlaceChanged, onLoad }) => {
    const classes = useStyles();

    return (
        <AppBar position="relative" style={{
            background:
                "#34e0a1"
        }}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.title} >
                    <div className={classes.logo}>
                        <TripOriginIcon />
                        Tripadvisor
                    </div>
                </Typography>
                <Box display="flex">
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search Maps" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;