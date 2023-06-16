import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@mui/icons-material/Explore';
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
                <Typography variant="h5" className={classes.title} >
                    <div className={classes.logo}>
                        <TripOriginIcon />
                    </div>
                    Tripadvisor
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