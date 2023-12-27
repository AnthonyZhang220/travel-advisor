import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Typography, Box, Button, CardActions, ListItemIcon, ListItemButton, ListItemText, Collapse, Card, CardContent } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AirIcon from '@mui/icons-material/Air';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { styled } from '@material-ui/core';

import useStyles from './MapStyles.js';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const Map = ({ isLoading, coordinates, places, setCoordinates, setBounds, setChildClicked, weatherData, handleSelectedPlace, selectedPlace }) => {
    const classes = useStyles();
    const [currentBounds, setCurrentBounds] = useState({})
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }
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
                {weatherData &&
                    <Card className={classes.weatherCard}>
                        <CardContent>
                            <ListItemButton>
                                <ListItemIcon>
                                    <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather.icon}@2x.png`} alt={weatherData.current.weather.description} />
                                </ListItemIcon>
                                <ListItemText primary={weatherData.current.weather.main} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemText primary={`Daily Summary:${weatherData.daily.summary}`} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ThermostatIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Temperture: ${weatherData.current.temp}`} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <EmojiEmotionsIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Feels Like: ${weatherData.current.feels_like}`} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AirIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Wind Speed:${weatherData.current.wind_speed} metre/sec`} />
                            </ListItemButton>
                            <ListItemButton >
                                <ListItemIcon>
                                    <ThunderstormIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Rain Possibility: ${weatherData.daily.pop * 100}%`} />
                            </ListItemButton>
                        </CardContent>
                        {weatherData.alerts &&
                            <>
                                <CardActions disableSpacing>
                                    <Button onClick={handleExpandClick} color="error">
                                        Alerts
                                    </Button>
                                    <Typography>
                                        {weatherData.alerts?.event}
                                    </Typography>
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show alert"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>{weatherData.alert?.sender_name}</Typography>
                                        <Typography paragraph>
                                            {weatherData.alerts?.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </>
                        }
                    </Card>
                }
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

