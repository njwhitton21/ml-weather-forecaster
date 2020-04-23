import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import MaterialAppBar from '../../components/MaterialAppBar/MaterialAppBar';
import MaterialDrawer from '../../components/MaterialDrawer/MaterialDrawer';
import MaterialGrid from '../../components/MaterialGrid/MaterialGrid';
import blueGrey from '@material-ui/core/colors/blueGrey';
import sunSVG from '../../assets/sun.svg';
import stormSVG from '../../assets/storm.svg';
import rainSVG from '../../assets/raining.svg';
import moonSVG from '../../assets/moon.svg';
import partlyCloudySVG from '../../assets/cloudy.svg';
import cloudySVG from '../../assets/cloud.svg';
import cloudyBackgroundJPG from '../../assets/cloudy-background.jpg';
import clearDayBackgroundJPG from '../../assets/clear-day-background.jpg';
import clearNightBackgroundJPG from '../../assets/clear-night-background.jpg';
import cloudyNightBackgroundJPG from '../../assets/cloudy-night-background.jpg';
import partlyCloudyBackgroundJPG from '../../assets/partly-cloudy-background.jpg';

//Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
//Loading svg loading.io website free license 

const primary = blueGrey[900];

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[700],
            dark: blueGrey[900],
            light: blueGrey[200],
        },
        secondary: blueGrey,
        text: {
            primary: '#fff',
            secondary: '#303030',
        },
        background: {
            default: blueGrey[200],
            paper: blueGrey[200],
        },
    },
})

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            hourlyWeatherData: [],
            currentWeatherData: {
                temperature: '-',
                pressure: '-',
                humidity: '-',
                windSpeed: '-',
                icon: '-',
                description: '-',
                backgroundImage: '',
            },
        }
        console.log("MainPage constructor");
    }

    componentDidMount() {
        fetch('http://192.168.1.145:5001/weather')
            .then(response => response.json())
            .then(data => this.setState({ 
                hourlyWeatherData: data.twelveHourForecast,
                currentWeatherData: this.determineCurrentWeatherIcon(data.currentWeather), 
            }));
    }

    handleDrawerOpen = () => {
        this.setState({drawerOpen: true});
    }

    handleDrawerClosed = () => {
        this.setState({drawerOpen: false});
    }

    determineCurrentWeatherIcon = (currentWeatherData) => {
        let icon = ""
        let description = ""
        let backgroundImage = ""
        
        switch(currentWeatherData.icon) {
            case 'clear-day':
                icon = sunSVG;
                description = "Clear";
                backgroundImage = clearDayBackgroundJPG;
                break;
            case 'clear-night':
                icon = moonSVG;
                description = "Clear";
                backgroundImage = clearNightBackgroundJPG;
                break;
            case 'rain':
                icon = rainSVG;
                description = "Rain";
                break;
            case 'cloudy':
                icon = cloudySVG;
                description = "Cloudy";
                backgroundImage = cloudyBackgroundJPG;
                break;
            case 'partly-cloudy-day':
                icon = partlyCloudySVG;
                description = "Partly Cloudy";
                backgroundImage = partlyCloudyBackgroundJPG;
                break;
            case 'partly-cloudy-night':
                icon = partlyCloudySVG;
                description = "Partly Cloudy";
                backgroundImage = cloudyNightBackgroundJPG;
                break;
            case 'thunderstorm':
                icon = stormSVG;
                description = "Thunderstorms";
                break;
        }
        
        currentWeatherData.icon = icon;
        currentWeatherData.description = description;
        currentWeatherData.backgroundImage = backgroundImage;
        return currentWeatherData;
    }

    render() {

        return(
            <div>
                <ThemeProvider theme={theme}>
                    <MaterialAppBar handleDrawerOpen={this.handleDrawerOpen}></MaterialAppBar>
                    <MaterialDrawer open={this.state.drawerOpen} handleDrawerClosed={this.handleDrawerClosed}></MaterialDrawer>
                    <MaterialGrid 
                        hourlyWeatherData={this.state.hourlyWeatherData}
                        currentWeatherData={this.state.currentWeatherData}></MaterialGrid>
                </ThemeProvider>
            </div>
        );
    }
}

export default MainPage;