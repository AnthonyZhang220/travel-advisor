import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, Divider } from '@material-ui/core';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItem, ListItemIcon, List, ListItemText, Collapse, IconButton } from "@material-ui/core"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PublicIcon from '@mui/icons-material/Public';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

import useStyles from './ListDetailStyles';

const ListDetail = ({ selectedPlace, handleSelectedPlace }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const copyToClip = (value) => {
        window.navigator.clipboard.writeText(value)
    }

    return (
        <Box className={classes.placeContainer} >
            <IconButton size={15} onClick={() => handleSelectedPlace(null)} className={classes.closeIcon}>
                <CloseIcon />
            </IconButton>
            <CardMedia
                style={{ width: "100%", height: "240px", borderRadius: "8px 8px 0 0" }}
                image={selectedPlace.photo ? selectedPlace.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={selectedPlace.name}
            />
            <CardContent className={classes.cardcontent}>
                <Box display="flex" >
                    <Box>
                        <Typography gutterBottom variant="h5">{selectedPlace.name}</Typography>
                        <Box display="flex" justifyContent="flex-start">
                            <Typography gutterBottom variant='subtitle2' component="legend">{Number(selectedPlace.rating).toFixed(1)}</Typography>
                            <Rating name="read-only" size="small" precision={0.1} value={Number(selectedPlace.rating)} readOnly />
                            <Typography gutterBottom variant='subtitle2' component="legend">{`(${selectedPlace.num_reviews})`} * {selectedPlace.price_level}</Typography>
                        </Box>
                        {selectedPlace?.awards?.map((award) => (
                            <Box display="flex" justifyContent="flex-start" my={1} alignItems="center">
                                <img src={award.images.small} alt='' />
                                <Typography gutterBottom variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                            </Box>
                        ))}
                        {selectedPlace?.cuisine?.map(({ name }) => (
                            <Chip key={name} size="large" label={name} className={classes.chip} />
                        ))}
                    </Box>
                </Box>
                <Divider variant="fullWidth" />
                {selectedPlace.address && (
                    <ListItemButton onClick={() => copyToClip(selectedPlace.address)}>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedPlace.address} primaryTypographyProps={{ variant: "body2" }} />
                    </ListItemButton>
                )
                }
                {selectedPlace.phone && (
                    <ListItemButton onClick={() => copyToClip(selectedPlace.phone)}>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedPlace.phone} primaryTypographyProps={{ variant: "body2" }} />
                    </ListItemButton>
                )
                }
                <ListItemButton>
                    <ListItemIcon>
                        <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary={selectedPlace.is_closed ? " Closed" : "Open"} primaryTypographyProps={{ variant: "body2" }} />
                </ListItemButton>
                {selectedPlace.website && (
                    <ListItemButton onClick={() => window.open(selectedPlace.website, '_blank')}>
                        <ListItemIcon>
                            <PublicIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedPlace.website} primaryTypographyProps={{ variant: "body2" }} />
                    </ListItemButton>
                )
                }
                {selectedPlace.email && (
                    <ListItemButton onClick={() => copyToClip(selectedPlace.email)}>
                        <ListItemIcon>
                            <AlternateEmailIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedPlace.email} primaryTypographyProps={{ variant: "body2" }} />
                    </ListItemButton>
                )}
            </CardContent>
            <Divider variant="fullWidth" />
            <CardActions>
                <Button size="small" color="primary" variant="outlined" onClick={() => window.open(selectedPlace.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size="small" color="primary" variant="outlined" onClick={() => window.open(selectedPlace.website, '_blank')}>
                    Website
                </Button>
            </CardActions>
        </Box>
    );
};

export default ListDetail;