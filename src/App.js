import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, Box } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "./api/index.js";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import "./App.scss"
import ListDetail from "./components/ListDetail/ListDetail.jsx";

const App = () => {
	const [type, setType] = useState("restaurants");
	const [rating, setRating] = useState("");

	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState(null);

	const [weatherData, setWeatherData] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [places, setPlaces] = useState([]);

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
	}, [rating]);

	useEffect(() => {
		if (bounds) {
			setIsLoading(true);

			getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
				setWeatherData(data)
			);

			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
				setFilteredPlaces([]);
				setRating("");
				setIsLoading(false);
			});
		}

	}, [bounds, type]);

	const handleSelectedPlace = (place) => {
		setSelectedPlace(place)
	}


	return (
		<Box className="app-container">
			<CssBaseline />
			<Grid item xs={12} md={3} sx={{ height: "100%", display: "flex", flex: "0 0 350px", flexDirection: "column" }}>
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
			</Grid>
			<Grid
				xs={12} md={9}
				sx={{ height: "100%", display: "flex", flex: 1 }}
			>
				<Map
					setChildClicked={setChildClicked}
					setBounds={setBounds}
					setCoordinates={setCoordinates}
					coordinates={coordinates}
					places={filteredPlaces?.length ? filteredPlaces : places}
					weatherData={weatherData}
					handleSelectedPlace={handleSelectedPlace}
				/>
				{selectedPlace ?
					<ListDetail selectedPlace={selectedPlace} handleSelectedPlace={handleSelectedPlace} />
					:
					null
				}
			</Grid>
		</Box>
	);
};

export default App;
