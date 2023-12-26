import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Typography, Box } from '@material-ui/core';
import PlaceIcon from '@mui/icons-material/Place';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './MapStyles.js';

const Map = ({ isLoading, coordinates, places, setCoordinates, setBounds, setChildClicked, weatherData, handleSelectedPlace, selectedPlace }) => {
    const classes = useStyles();
    const [currentBounds, setCurrentBounds] = useState({})
    const onPinClicked = (child) => {
        setChildClicked(child)
    }

    const getCurrentBounds = (event) => {
        setCurrentBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw })
    }

    return (
        <Box className={classes.mapContainer}>
            <GoogleMapReact
                className={classes.map}
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, streetViewControl: true, clickableIcons: true, mapTypeControl: true }}
                onChange={(event) => {
                    setCoordinates({ lat: event.center.lat, lng: event.center.lng });
                    getCurrentBounds(event)
                }}
                onChildClick={(child) => onPinClicked(child)}
            >
                {places?.length && places?.map((place, i) => (
                    <Markers classes={classes} place={place} lng={Number(place.longitude)} lat={Number(place.latitude)} key={i} handleSelectedPlace={handleSelectedPlace} selectedPlace={selectedPlace} />
                ))}
                {weatherData?.list?.length && weatherData.list.map((data, i) => (
                    <Box key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt='' />
                    </Box>
                ))}
            </GoogleMapReact>
            <SearchBox classes={classes} isLoading={isLoading} setBounds={setBounds} currentBounds={currentBounds} setCoordinates={setCoordinates} />
        </Box>
    );
};
export default Map;

function SearchBox({ classes, isLoading, setBounds, currentBounds }) {
    return (
        <Box className={classes.searchbox}>
            <LoadingButton variant='outlined' loading={isLoading} loadingPosition="start" startIcon={<SearchIcon />} onClick={() => setBounds({ ne: currentBounds.ne, sw: currentBounds.sw })}>Search this area</LoadingButton>
        </Box>
    )
}

function Markers({ classes, handleSelectedPlace, place, selectedPlace }) {
    return (
        <Box
            onClick={() => handleSelectedPlace(place)}
            className={classes.markerContainer}
        >
            <Box sx={{ display: "block" }}>
                <PlaceIcon sx={{ fontSize: selectedPlace === place ? 45 : 30, color: "red", display: "block" }} />
            </Box>
            <Typography variant='caption' display='block'>{place.name}</Typography>
        </Box>
    )
}

