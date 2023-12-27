import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Typography, Box, CardActions, ListItemIcon, ListItemButton, ListItemText, Collapse, Card, CardContent } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AirIcon from '@mui/icons-material/Air';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CloudIcon from '@mui/icons-material/Cloud';
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


const Map = ({ isLoading, coordinates, places, setCoordinates, setBounds, setChildClicked, weatherData, handleSelectedPlace, selectedPlace, openList }) => {
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
                debounced={true}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{
                    disableDefaultUI: true, zoomControl: true, streetViewControl: true, clickableIcons: true
                }}
                onChange={(event) => {
                    setCoordinates({ lat: event.center.lat, lng: event.center.lng });
                    getCurrentBounds(event)
                }}
                onChildClick={(child) => onPinClicked(child)}
            >
                {places?.length && places?.map((place, i) => (
                    <Markers classes={classes} place={place} lng={Number(place.longitude)} lat={Number(place.latitude)} key={i} handleSelectedPlace={handleSelectedPlace} selectedPlace={selectedPlace} />
                ))}
            </GoogleMapReact>
            <WeatherCard weatherData={weatherData} classes={classes} />
            <SearchBox classes={classes} isLoading={isLoading} setBounds={setBounds} currentBounds={currentBounds} setCoordinates={setCoordinates} openList={openList} />
        </Box>
    );
};
export default Map;

function WeatherCard({ weatherData, classes }) {
    const [expanded, setExpanded] = useState(false);
    const [openWeather, setOpenWeather] = useState(true)
    const kelvinToFahrenheit = (temp) => {
        const result = (temp - 273.15) * (9 / 5) + 32
        return result.toFixed(0)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Box className={openWeather ? classes.weatherContainer : classes.weatherContainerClose}>
            {weatherData?.current &&
                <>
                    <Box className={classes.weatherNotch} onClick={() => setOpenWeather(!openWeather)}>
                        <Box className={classes.weatherNotchContainer}>
                            {openWeather ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
                        </Box>
                        <Box className={classes.weatherNotchIcon}>
                            <CloudIcon />
                        </Box>
                    </Box>
                    <Card className={classes.weatherCard}>
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`} alt={weatherData.current.weather[0].description} />
                            </ListItemIcon>
                            <ListItemText primary={weatherData.current.weather[0].main} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText primary={`Daily Summary: ${weatherData.daily[0].summary}`} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <ThermostatIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Temperture: ${kelvinToFahrenheit(weatherData.current.temp)} ℉`} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <EmojiEmotionsIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Feels Like: ${kelvinToFahrenheit(weatherData.current.feels_like)} ℉`} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <AirIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Wind Speed: ${weatherData.current.wind_speed} metre/sec`} />
                        </ListItemButton>
                        <ListItemButton >
                            <ListItemIcon>
                                <ThunderstormIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Rain Possibility: ${weatherData.daily[0].pop * 100}%`} />
                        </ListItemButton>
                        {weatherData.alerts?.length > 0 &&
                            <>
                                <CardActions sx={{ padding: "0.5rem 1rem" }}>
                                    <ListItemIcon>
                                        <ErrorOutlineIcon color="error" onClick={handleExpandClick} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        {weatherData.alerts[0].event}
                                    </ListItemText>
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
                                    <CardContent sx={{ padding: "1rem" }}>
                                        <Typography paragraph>{weatherData.alerts[0].sender_name}</Typography>
                                        <Typography>
                                            {weatherData.alerts[0].description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </>
                        }
                    </Card>
                </>
            }
        </Box>
    )
}

function SearchBox({ classes, isLoading, setBounds, currentBounds, openList }) {
    return (
        <Box className={openList ? classes.searchbox : classes.searchboxClose}>
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

