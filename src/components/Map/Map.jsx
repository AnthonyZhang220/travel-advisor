import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PlaceIcon from '@mui/icons-material/Place';

import useStyles from './MapStyles.js';

const Map = ({ coordinates, places, setCoordinates, setBounds, setChildClicked, weatherData, handleSelectedPlace }) => {
    const matches = useMediaQuery('(min-width:600px)');
    const classes = useStyles();

    return (
        <Box className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }}
                onChange={(event) => {
                    setCoordinates({ lat: event.center.lat, lng: event.center.lng });
                    setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.length && places?.map((place, i) => (
                    <Box
                        onClick={() => handleSelectedPlace(place)}
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                        sx={{
                            "&::after": {
                                content: `"${place.name}"`,
                                color: "black",
                                position: "absolute",
                                left: 25,
                                maxWidth: "80px",
                                fontWeight: "bolder",
                                verticalAlign: "middle",
                            }
                        }}

                    >
                        <PlaceIcon sx={{ fontSize: 30, color: "red", padding: 0, m: 0 }} />
                    </Box>
                ))}
                {weatherData?.list?.length && weatherData.list.map((data, i) => (
                    <Box key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt='' />
                    </Box>
                ))}
            </GoogleMapReact>

        </Box>
    );
};

export default Map;

