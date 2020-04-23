import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import sunSVG from '../../assets/sun.svg';
import stormSVG from '../../assets/storm.svg';
import rainSVG from '../../assets/raining.svg';
import moonSVG from '../../assets/moon.svg';
import parlyCloudySVG from '../../assets/cloudy.svg';
import cloudySVG from '../../assets/cloud.svg';
import '../../css/Weather-Page.css';

//https://www.flaticon.com/packs/weather-78

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginRight: '25px',
        borderRadius: '5px',
    },
    gridList: {
      width: '100%',
      height: '500px',

    },
    weatherSVG: {
        height: '50px',
        width: '50px',
        paddingBottom: '25px',
        WebkitAnimation: 'spin 4s linear infinite',
    },
    gridListTile: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    weatherData: {
        fontSize: '30px',
        marginLeft: '50px',
        marginTop: '10px',
        marginBottom: '31px',
    },
    numericalWeatherData: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: 'auto',
        marginRight: '50px',
    }
}))

const HourlyWeatherGrid = (props) => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <GridList className={classes.gridList}>
                {props.hourlyWeatherData.map((data) => (
                    <GridListTile cols={2} style={{height: '80px'}}>
                        <div className={classes.gridListTile}>
                            <img className={classes.weatherSVG} src={sunSVG} />
                            <div className={classes.weatherData}>Clear</div>
                            <div className={classes.numericalWeatherData}>
                                <div className={classes.weatherData}></div>
                                <div style={{fontSize: '20px', marginTop: '5px'}}>{data.temperature}℉</div>
                                <div className={classes.weatherData}>{data.humidity}%</div>
                                <div className={classes.weatherData}>{data.pressure} hPa</div>
                                <div className={classes.weatherData}>WD</div>
                                <div className={classes.weatherData}>WS</div>
                            </div>
                            <GridListTileBar style={{height: '20px'}}
                                title={data.time}>
                            </GridListTileBar>
                        </div>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default HourlyWeatherGrid;