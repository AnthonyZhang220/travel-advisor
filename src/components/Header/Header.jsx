import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TripOriginIcon from '@mui/icons-material/TripOrigin';

import useStyles from './HeaderStyles';


const Header = ({ onPlaceChanged, onLoad }) => {
    const classes = useStyles();

    return (
        <AppBar className={classes.header} position="relative" style={{
            background:
                "#34e0a1"
        }}>
            <Toolbar className={classes.toolbar}>
                <Box className={classes.logo}>
                    <TripOriginIcon />
                    <Typography variant="h6" className={classes.title} >
                        Tripadvisor
                    </Typography>
                </Box>
                <Box className={classes.searchContainer}>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className={classes.autocomplete}>
                        <Box className={classes.search}>
                            <Box className={classes.searchIcon}>
                                <SearchIcon />
                            </Box>
                            <InputBase placeholder="Search Maps" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </Box>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;