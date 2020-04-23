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
        backgroundColor: theme.palette.background.default,
        marginRight: '25px',
        borderRadius: '5px',
    },
    gridList: {
      width: '100%',
      height: '445px',

    },
    weatherSVG: {
        height: '40px',
        width: '40px',
        paddingBottom: '25px',
        paddingLeft: '30px',
        paddingTop: '7px',
    },
    gridListTile: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    weatherData: {
        fontSize: '20px',
        marginTop: '18px',
    },
    numericalWeatherData: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: 'auto',
        marginRight: '75px',
    },
    gridListTileBar: {
        height: '21px', 
        borderRadius: '5px', 
        backgroundColor: theme.palette.primary.dark,
        marginLeft: '5px',
        marginRight: '4px',
        paddingTop: '1px',
    },
    listTitleBar: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginRight: 'auto',
        paddingLeft: '45px',
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '50px',
        marginBottom: '2px',
        borderBottomLeftRadius: '5px',
        borderBottom: 'solid 2px',
        borderBottomColor: theme.palette.primary.dark,
    },
    weatherDataTitleContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: '45px',
    },
    weatherDataTitle: {
        marginLeft: '60px',
        fontSize: '25px',
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'white',
    },
}))

const HourlyWeatherGrid = (props) => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <div className={classes.listTitleBar}>
                <div className={classes.weatherDataTitle}>Description</div>
                <div className={classes.weatherDataTitleContainer}>
                    <div className={classes.weatherDataTitle}>Temp</div>
                    <div className={classes.weatherDataTitle}>Humidity</div>
                    <div className={classes.weatherDataTitle}>Pressure</div>
                    <div className={classes.weatherDataTitle}>Wind</div>
                </div>
            </div>
            <GridList className={classes.gridList}>
                {props.hourlyWeatherData.map((data) => (
                    <GridListTile cols={2} style={{height: '80px'}}>
                        <div className={classes.gridListTile}>
                            <img className={classes.weatherSVG} src={sunSVG} />
                            <div className={classes.weatherData} style={{ marginLeft: '70px' }}>Clear</div>
                            <div className={classes.numericalWeatherData}>
                                <div className={classes.weatherData}>{data.temperature}</div>
                                <div style={{fontSize: '20px', marginTop: '10px'}}>℉</div>
                                <div className={classes.weatherData} style={{ marginLeft: '100px' }}>{data.humidity}%</div>
                                <div className={classes.weatherData} style={{ marginLeft: '95px' }}>{data.pressure} hPa</div>
                                <div className={classes.weatherData} style={{ marginLeft: '70px' }}>Wind</div>
                            </div>
                            <GridListTileBar className={classes.gridListTileBar} title={data.time}/>
                        </div>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default HourlyWeatherGrid;