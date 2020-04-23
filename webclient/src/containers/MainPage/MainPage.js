import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MaterialAppBar from '../../components/MaterialAppBar/MaterialAppBar';
import MaterialDrawer from '../../components/MaterialDrawer/MaterialDrawer';
import MaterialGrid from '../../components/MaterialGrid/MaterialGrid';
import CssBaseline from '@material-ui/core/CssBaseline';
import teal from '@material-ui/core/colors/teal';
import { makeStyles } from '@material-ui/core/styles';
import sunSVG from '../../assets/sun.svg';
import stormSVG from '../../assets/storm.svg';
import rainSVG from '../../assets/raining.svg';
import moonSVG from '../../assets/moon.svg';
import partlyCloudySVG from '../../assets/cloudy.svg';
import cloudySVG from '../../assets/cloud.svg';

//Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
//Loading svg loading.io website free license 

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'Helvetica', 
            'Arial', 
            'sans-serif',
        ]
    },
    palette: {
        primary: teal,
        secondary: teal,
        text: {
            primary: '#fff',
            secondary: '#303030',
        },
        background: {
            default: '#303030',
            paper: '#80cbc4',
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
        switch(currentWeatherData.icon) {
            case 'clear-day':
                icon = sunSVG;
                description = "Clear";
                break;
            case 'clear-night':
                icon = moonSVG;
                description = "Clear";
                break;
            case 'rain':
                icon = rainSVG;
                description = "Rain";
                break;
            case 'cloudy':
                icon = cloudySVG;
                description = "Cloudy";
                break;
            case 'partly-cloudy-day':
                icon = partlyCloudySVG;
                description = "Partly Cloudy";
                break;
            case 'partly-cloudy-night':
                icon = partlyCloudySVG;
                description = "Partly Cloudy";
                break;
            case 'thunderstorm':
                icon = stormSVG;
                description = "Thunderstorms";
                break;
        }
        
        currentWeatherData.icon = icon;
        currentWeatherData.description = description;
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