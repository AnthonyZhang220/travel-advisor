import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Box } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './ListStyles';

import Header from "../Header/Header";

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading, setCoordinates }) => {
    const [elRefs, setElRefs] = useState([]);
    const [autocomplete, setAutocomplete] = useState(null);
    const classes = useStyles();

    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
    };

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <Box className={classes.whole}>
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Box className={classes.container}>
                <Box className={classes.options}>
                    <Typography variant="h6">Restaurant, Hotels & Attractions</Typography>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="type">Type</InputLabel>
                        <Select id="type" value={type} onChange={(e) => setType(e.target.value)} autoWidth label="type">
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="rating">Rating</InputLabel>
                        <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} autoWidth label={`${rating} `}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="3">Above 3.0</MenuItem>
                            <MenuItem value="4">Above 4.0</MenuItem>
                            <MenuItem value="4.5">Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className={classes.listcontainer}>
                    {isLoading ? (
                        <Box className={classes.loading}>
                            <CircularProgress size="5rem" />
                        </Box>
                    ) : (
                        <>
                            <Grid container className={classes.list}>
                                {places?.map((place, i) => (
                                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                                        <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} key={i} />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default List;