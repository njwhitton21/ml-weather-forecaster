from pytemp import pytemp
import time
import requests
import geopy
from utils import get_cardinal_direction

def get_hourly_data(latitude, longitude, current_time=int(time.time())):

    # request historical hourly weather data
    response = requests.get("https://api.darksky.net/forecast/9c6d85ba3ad3ef68e12f3cc210d0b026/" + 
        "{},{},{}?exclude=flags,minutely,daily".format(latitude, longitude, current_time))
    payload = response.json()

    # get temp data for every hour before the current time
    # convert temp to kelvin and save to list
    twenty_four_hour_weather = process_hourly_data(payload, current_time)

    # if there isn't 24 hours of historical data, 
    # make an additional request to get the previous day's hourly data
    if(len(twenty_four_hour_weather) < 24):
        previous_day_time = current_time - (86000) # 24 hours converted to seconds
        response = requests.get("https://api.darksky.net/forecast/9c6d85ba3ad3ef68e12f3cc210d0b026/" + 
            "{},{},{}?exclude=flags,minutely,daily".format(latitude, longitude, previous_day_time))
        payload = response.json()
        
        # get hourly temp data from the previous day
        hourly_weather_past_day = process_hourly_data(payload, previous_day_time, current_day=False)

        # join both lists to form 24 hour dataset
        twenty_four_hour_weather = {
            'temperature': hourly_weather_past_day['temperature'] + twenty_four_hour_weather['temperature'],
            'pressure': hourly_weather_past_day['pressure'] + twenty_four_hour_weather['pressure'],
            'humidity': hourly_weather_past_day['humidity'] + twenty_four_hour_weather['humidity'],
            'time': hourly_weather_past_day['time'] + twenty_four_hour_weather['time']
        }
    
    return twenty_four_hour_weather

def process_hourly_data(payload, time, current_day=True):
    
    hourly_time = []
    kelvin_hourly_temp = []
    hourly_pressure = []
    hourly_humidity = []

    if(current_day):
        for weather in payload['hourly']['data']:
            if(weather['time'] <= time):

                # add time
                hourly_time.append(weather['time'])

                # add temp data
                temp_kelvin = pytemp(weather['temperature'], 'fahrenheit', 'kelvin')
                kelvin_hourly_temp.append(temp_kelvin)

                # add pressure data
                hourly_pressure.append(weather['pressure'])

                #add humidity data
                hourly_humidity.append(weather['humidity'])
    else:
        for weather in payload['hourly']['data']:
            if(weather['time'] >= time):

                # add time
                hourly_time.append(weather['time'])

                # add temp data
                temp_kelvin = pytemp(weather['temperature'], 'fahrenheit', 'kelvin')
                kelvin_hourly_temp.append(temp_kelvin)

                # add pressure data
                hourly_pressure.append(weather['pressure'])

                # add humidity data
                hourly_humidity.append(weather['humidity'])

    completeHourlyWeather = {
        'time': hourly_time,
        'temperature': kelvin_hourly_temp, 
        'pressure': hourly_pressure,
        'humidity': hourly_humidity
    }

    return completeHourlyWeather

def get_current_data(latitude, longitude, current_time=int(time.time())):
    
    # create dictionary
    current_weather = {}

    # request current weather data
    response = requests.get("https://api.darksky.net/forecast/9c6d85ba3ad3ef68e12f3cc210d0b026/" + 
        "{},{},{}?exclude=flags,minutely,daily".format(latitude, longitude, current_time))
    payload = response.json()
    payload = payload['currently']

    current_weather['temperature'] = round(payload['temperature'])
    current_weather['humidity'] = payload['humidity'] * 100
    current_weather['pressure'] = round(payload['pressure'])
    current_weather['windSpeed'] = round(payload['windSpeed'])
    current_weather['windBearing'] = get_cardinal_direction(payload['windBearing'])
    current_weather['icon'] = payload['icon']
    
    return current_weather