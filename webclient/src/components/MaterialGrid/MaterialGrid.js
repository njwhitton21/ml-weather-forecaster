import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import HeaderBackground from '../../assets/Weather-Background.jpg';
import HourlyWeatherGrid from './WeatherGridList/HourlyWeatherGrid';
import DailyWeatherGrid from './WeatherGridList/DailyWeatherGrid';
import CurrentWeatherCard from './WeatherCard/CurrentWeatherCard';
import SearchBar from './SearchBar/SearchBar';
import { LocationList }  from '../../constants/LocationList';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        overflowY: 'hidden',
        paddingBottom: '50px',
    },
    topPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '75px',
        backgroundImage: `url(${HeaderBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
    leftPaper: {
        textAlign: 'center',
        height: 495,
        marginLeft: '25px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: 50,
    },
    overflow: {
        overflowX: 'hidden',
        paddingBottom: '5px',
        fontFamily: theme.typography.fontFamily,
    },
    weatherHeader: {
        textAlign: 'center',
    },
    currentWeather: {
        maxWidth: '250px',
        maxHeight: '250px',
    },
}))

const MaterialGrid = (props) => {
    
    const classes = useStyles();
     
    return(
            <div className={classes.overflow}>
                <Grid className={classes.root} container spacing={2} alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Paper className={classes.topPaper} style={{ marginTop: '-3px' }}>
                            <SearchBar locationList={LocationList} handleLocationSelect={props.handleLocationSelect} handleLocationSearch={props.handleLocationSearch}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <h3 className={classes.weatherHeader}>Current Weather</h3>
                        <CurrentWeatherCard 
                            className={classes.leftPaper} 
                            currentWeatherData={props.currentWeatherData}
                            location={props.location}/>
                    </Grid>
                    <Grid item xs={6}>
                        <h3 className={classes.weatherHeader}>12-Hour Weather Forecast</h3>
                        <HourlyWeatherGrid hourlyWeatherData={props.hourlyWeatherData}/>
                    </Grid>
                    <Grid item xs={12}>
                        <h3 className={classes.weatherHeader}>7-Day Weather Forecast</h3>
                        <DailyWeatherGrid />
                    </Grid>
                </Grid>
            </div>
    );
}

export default MaterialGrid;
