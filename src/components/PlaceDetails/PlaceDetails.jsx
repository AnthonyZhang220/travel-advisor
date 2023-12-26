import React, { Fragment } from 'react';
import { Box, Button, CardMedia, CardContent, CardActions, Chip, Divider } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Typography } from '@mui/material';
import Rating from '@material-ui/lab/Rating';

import useStyles from './PlaceDetailsStyles';

const PlaceDetails = ({ place, selected, refProp, handleSelectedPlace }) => {
    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const classes = useStyles();

    return (
        <Fragment>
            <Box
                sx={{
                    p: 2,
                    backgroundColor: selected ? "#f1f2f3" : "inherit", "&:hover": {
                        backgroundColor: "#f1f2f3"
                    }
                }}
                onClick={() => handleSelectedPlace(place)}
            >
                <CardContent className={classes.cardcontent}>
                    <Box display="flex">
                        <Box>
                            <Typography variant="h6">{place.name}</Typography>
                            <Box display="flex" justifyContent="flex-start">
                                <Typography variant='subtitle2' component="legend">{Number(place.rating).toFixed(1)}</Typography>
                                <Rating name="read-only" size="small" precision={0.1} value={Number(place.rating)} readOnly />
                                <Typography variant='subtitle2' component="legend">{`(${place.num_reviews})`} · {place.price_level}</Typography>
                                <Typography variant="subtitle2" sx={{ color: place.is_closed ? "#ff2400" : "#007500" }} component="legend">
                                    {place.is_closed ? "Closed" : "Open"}
                                </Typography>
                            </Box>
                            {place?.awards?.map((award) => (
                                <Box display="flex" justifyContent="flex-start" my={1} alignItems="center">
                                    <img src={award.images.small} alt='' />
                                    <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                                </Box>
                            ))}
                            {place?.cuisine?.map(({ name }) => (
                                <Chip key={name} size="small" label={name} className={classes.chip} />
                            ))}
                            {place.address && (
                                <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                                    <LocationOnIcon />{place.address}
                                </Typography>
                            )}
                            <Box display="flex" justifyContent="flex-start">
                            </Box>
                        </Box>
                        <CardMedia
                            style={{ height: "100px", width: "100px", borderRadius: "8px", objectFit: "contain", marginLeft: "auto" }}
                            image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                            title={place.name}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" variant="outlined" onClick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" variant="outlined" onClick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </Box>
            <Divider variant="fullWidth" />
        </Fragment>
    );
};

export default PlaceDetails;