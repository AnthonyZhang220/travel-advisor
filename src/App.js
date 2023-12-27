import React, { useState, useEffect } from "react";
import { CssBaseline, Box, responsiveFontSizes } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { getPlacesData, getWeatherData } from "./api/index.js";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import ListDetail from "./components/ListDetail/ListDetail.jsx";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import useStyles from "./AppStyles.js";
import "./App.scss"

const App = () => {
	const classes = useStyles()
	const [type, setType] = useState("restaurants");
	const [rating, setRating] = useState("");
	const [openList, setOpenList] = useState(true)

	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState(null);

	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [places, setPlaces] = useState([]);

	const [weatherData, setWeatherData] = useState(null)
	const [childClicked, setChildClicked] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [selectedPlace, setSelectedPlace] = useState(null);


	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		setFilteredPlaces(places?.filter((place) => Number(place.rating) > rating));
	}, [rating, places]);

	useEffect(() => {
		if (bounds) {
			setIsLoading(true);


			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				if (data) {
					setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
				}
				setFilteredPlaces([]);
				setRating("");
				setIsLoading(false);
			});

			getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
				if (data) {
					setWeatherData(data)
				}
				setIsLoading(false)
			})
		}

	}, [bounds, type])

	const handleSelectedPlace = (place) => {
		console.log(place)
		setSelectedPlace(place)
	}

	const handleToggleList = () => {
		setOpenList((prev) => !prev)
	}

	let theme = createTheme();
	theme = responsiveFontSizes(theme)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box className={classes.appContainer}>
				<Box className={openList ? classes.listSection : classes.listSectionClose} >
					<Box className={classes.list}>
						<List
							isLoading={isLoading}
							childClicked={childClicked}
							places={filteredPlaces?.length ? filteredPlaces : places}
							type={type}
							setType={setType}
							rating={rating}
							setRating={setRating}
							setCoordinates={setCoordinates}
							selectedPlace={selectedPlace}
							handleSelectedPlace={handleSelectedPlace}
						/>
					</Box>
					{selectedPlace &&
						<Box className={classes.listDetail}>
							<ListDetail selectedPlace={selectedPlace} handleSelectedPlace={handleSelectedPlace} />
						</Box>
					}
					<Box className={classes.notch} onClick={handleToggleList}>
						<Box className={classes.notchContainer}>
							{openList ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
						</Box>
					</Box>
				</Box>
				
				<Box className={classes.mapSection}>
					<Map
						weatherData={weatherData}
						openList={openList}
						isLoading={isLoading}
						setChildClicked={setChildClicked}
						setBounds={setBounds}
						setCoordinates={setCoordinates}
						coordinates={coordinates}
						places={filteredPlaces?.length ? filteredPlaces : places}
						handleSelectedPlace={handleSelectedPlace}
						selectedPlace={selectedPlace}
					/>
				</Box>
			</Box>
		</ThemeProvider>
	);
};

export default App;
