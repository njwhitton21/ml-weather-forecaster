import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import cloudyBackgroundJPG from '../../../assets/cloudy-background.jpg';
import clearDayBackgroundJPG from '../../../assets/clear-day-background.jpg';
import clearNightBackgroundJPG from '../../../assets/clear-night-background.jpg';
import cloudyNightBackgroundJPG from '../../../assets/cloudy-night-background.jpg';
import partlyCloudyBackgroundJPG from '../../../assets/partly-cloudy-background.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginRight: '25px',
        marginLeft: '25px',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    dailyTile: {
        backgroundImage: `url(${cloudyNightBackgroundJPG})`,
        heigth: '200px',
        width: '400px',
    }
}));

const weatherData = [
    {
        title: 'Monday',
        image: partlyCloudyBackgroundJPG,
    },
    {
        title: 'Tuesday',
        image: clearDayBackgroundJPG,
    },
    {
        title: 'Wednesday',
        image: clearDayBackgroundJPG,
    },
    {
        title: 'Thursday',
        image: cloudyBackgroundJPG,
    },
    {
        title: 'Friday',
        image: partlyCloudyBackgroundJPG,
    },
    {
        title: 'Saturday',
        image: partlyCloudyBackgroundJPG,
    },
    {
        title: 'Sunday',
        image: cloudyBackgroundJPG,
    },
]

const DailyWeatherGrid = () => {

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <GridList className={classes.gridList}>
                {weatherData.map((tile) => (
                    <GridListTile style={{ height: '200px', width: '400px' }} key="day1" cols={2}>
                        <img src={tile.image}/>
                        <GridListTileBar style={{height: '200px'}}
                        title={tile.title}>
                        </GridListTileBar>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default DailyWeatherGrid;