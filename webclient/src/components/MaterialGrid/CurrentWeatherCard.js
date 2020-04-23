import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import sunSVG from '../../assets/sun.svg';
import stormSVG from '../../assets/storm.svg';
import rainSVG from '../../assets/raining.svg';
import moonSVG from '../../assets/moon.svg';
import partlyCloudySVG from '../../assets/cloudy.svg';
import cloudySVG from '../../assets/cloud.svg';
import loadingSVG from '../../assets/loading.svg';

const useStyles = makeStyles((theme) => ({
    svgImage: {
        height: '260px',
        width: '260px',
        marginLeft: '50px',
        marginTop: '20px',
    },
    cardTop: {
        display: 'flex',
        justifyContent: 'flex-start',
        height: '300px',
    },
    cardMiddle: {
        display: 'flex',
        justifyContent: 'flex-start',
        height: '45px',
    },
    cardBottom: {
        display: 'flex',
        justifyContent: 'flex-start',
        height: '95px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'max-content',
        paddingTop: '25px',
    },
    locationTitle: {
        fontSize: '40px',
        marginBottom: 'auto',
        marginLeft: '25px',
        color: 'black',
    },
    weatherDataContainerLeft: {
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'black',
        paddingRight: '35px',
        borderRight: 'solid black 2px',
    },
    weatherDataContainerInner: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '35px',
        color: 'black',
        paddingRight: '35px',
        borderRight: 'solid black 2px',
    },
    weatherDataContainerRight: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '35px',
        color: 'black',
    },
    weatherDataTitle: {
        borderBottom: 'solid rgba(97, 97, 97, 0.9) 2px',
        fontWeight: 'bold',
        fontSize: '25px',
        marginTop: '10px',
        height: '30px',
    },
    weatherData: {
        marginTop: '15px',
        marginBottom: '10px',
        fontSize: '20px',
    },
    temperatureContainer: {
        height: '300px',
        marginLeft: 'auto',
    },
    temperature: {
        fontSize: '181px',
        width: 'min-content',
        marginLeft: 'auto',
        marginRight: '30px',
        marginBottom: '-20px',
        color: 'black',
    },
    highLowTemp: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 'max-content',
    },
    backgroundOverlay: {
        textAlign: 'center',
        height: 495,
        backgroundColor: '#ffffff2e',
    },
  }));

const CurrentWeatherCard = (props) => {

    const classes = useStyles();
    const currentWeatherData = props.currentWeatherData;

    return(
        <Paper className={props.className} style={{ backgroundImage: `url(${props.currentWeatherData.backgroundImage})` }}>
            <div className={classes.backgroundOverlay}>
                <div className={classes.cardTop}>
                    {currentWeatherData.icon !== "-" ?
                        <img className={classes.svgImage} src={currentWeatherData.icon}/>
                        : <img src={loadingSVG} style={{ marginLeft: '75px' }}/>
                    }
                    <div className={classes.temperatureContainer}>
                        {currentWeatherData.temperature !== "-" ?
                            <div className={classes.temperature}>{currentWeatherData.temperature}℉</div>
                            : <img src={loadingSVG} style={{ marginRight: '100px', marginTop: '20px' }}></img>
                        }
                        <div className={classes.highLowTemp}>
                            <div className={classes.weatherDataContainerInner}>
                                <div className={classes.weatherDataTitle}>Hi</div>
                                <div className={classes.weatherData}>66℉</div>
                            </div>
                            <div className={classes.weatherDataContainerRight}>
                                <div className={classes.weatherDataTitle}>Lo</div>
                                <div className={classes.weatherData}>32℉</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.cardMiddle}>
                    <div className={classes.locationTitle}>Westmoreland, New York</div>
                </div>
                <div style={{ height: '95px' }}>
                    <div className={classes.cardBottom}>
                        <div className={classes.weatherDataContainerLeft}>
                            <div className={classes.weatherDataTitle}>Description</div>
                            {currentWeatherData.description !== "-" ?
                                <div className={classes.weatherData}>{currentWeatherData.description}</div>
                                : <img src={loadingSVG} style={{ marginTop: '15px', height: '25px', width: '25px' }}></img>
                            }
                        </div>
                        <div className={classes.weatherDataContainerInner}>
                            <div className={classes.weatherDataTitle}>Humidity</div>
                            {currentWeatherData.humidity !== "-" ?
                                <div className={classes.weatherData}>{currentWeatherData.humidity}%</div>
                                : <img src={loadingSVG} style={{ marginTop: '15px', height: '25px', width: '25px' }}></img>
                            }
                        </div>
                        <div className={classes.weatherDataContainerInner}>
                            <div className={classes.weatherDataTitle}>Pressure</div>
                            {currentWeatherData.pressure !== "-" ?
                                <div className={classes.weatherData}>{currentWeatherData.pressure} hPa</div>
                                : <img src={loadingSVG} style={{ marginTop: '15px', height: '25px', width: '25px' }}></img>
                            }
                        </div>
                        <div className={classes.weatherDataContainerRight}>
                            <div className={classes.weatherDataTitle}>Wind</div>
                            {currentWeatherData.windSpeed !== "-" ?
                                <div className={classes.weatherData}>{currentWeatherData.windBearing} {currentWeatherData.windSpeed} mph</div>
                                : <img src={loadingSVG} style={{ marginTop: '15px', height: '25px', width: '25px' }}></img>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
}

export default CurrentWeatherCard;