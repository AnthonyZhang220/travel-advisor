import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating'

import useStyles from './PlaceDetailsStyles'

const PlaceDetails = ({ place, selected, refProp }) => {

    const classes = useStyles();

    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    return (
        <Card elevation={6}>
            <CardMedia style={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : null}
                title={place.name} />
            <CardContent>
                <Typography gutterBottom variant='h5'>{place.name}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating size="large" value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant="subtitles1">out of {place.nums_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitles1">{place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography
                        variant="subtitle1">Ranking</Typography>
                    <Typography
                        gutterBottom variant="subtitles1">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box my={1} display="flex" justifyContent="space-between" alignItems='center' >
                        <img src={award.images.small} alt={award.display_name}></img>
                        <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({ name }) => (
                    <Chip key={name} size="small" label={name} className={classes.chip}></Chip>
                ))}
                {place?.address && (
                    <Typography gutterBottom variant="subtitle2" color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon>{place.address}</LocationOnIcon>
                    </Typography>
                )}
                {place?.address && (
                    <Typography gutterBottom variant="subtitle2" color='textSecondary' className={classes.spacing}>
                        <PhoneIcon>{place.phone}</PhoneIcon>
                    </Typography>
                )}
                <CardActions>
                    <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>Trip Advisory</Button>
                </CardActions>
                <CardActions>
                    <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>Website</Button>
                </CardActions>
            </CardContent>


        </Card>
    );
};

export default PlaceDetails;