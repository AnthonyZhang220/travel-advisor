import React, { useState, useEffect, useRef } from "react";
import { CssBaseline, Box, responsiveFontSizes } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { getPlacesData, getWeatherData } from "./api/index.js";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import ListDetail from "./components/ListDetail/ListDetail.jsx";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import "./App.scss"

const App = () => {
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

	const listRef = useRef(null)

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

	useEffect(() => {
		const listEle = document.getElementById("list-section")
		if (openList) {
			listEle.classList.add("list-close")
		} else {
			listEle.classList.remove("list-close")
		}
	}, [openList])

	let theme = createTheme();
	theme = responsiveFontSizes(theme)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box className="app-container">
				<Box className="list-section" id="list-section" ref={listRef}>
					<Box className="list">
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
						<Box className="listdetail">
							<ListDetail selectedPlace={selectedPlace} handleSelectedPlace={handleSelectedPlace} />
						</Box>
					}
					<Box className="notch" onClick={handleToggleList}>
						<Box className="notch-container">
							{openList ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
						</Box>
					</Box>
				</Box>
				<Box className="map-section">
					<Map
						weatherData={weatherData}
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
