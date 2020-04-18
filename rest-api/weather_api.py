from pytemp import pytemp
import time
import requests

def get_hourly_data(latitude, longitude, current_time=int(time.time())):
    
    twenty_four_hour_temp = []
        
    # request historical hourly weather data
    response = requests.get("https://api.darksky.net/forecast/9c6d85ba3ad3ef68e12f3cc210d0b026/" + 
        "{},{},{}?exclude=flags,minutely,daily".format(latitude, longitude, current_time))
    payload = response.json()

    # get temp data for every hour before the current time
    # convert temp to kelvin and save to list
    twenty_four_hour_temp = process_hourly_data(payload, current_time)

    # if there isn't 24 hours of historical data, 
    # make an additional request to get the previous day's hourly data
    if(len(twenty_four_hour_temp) < 24):
        previous_day_time = current_time - (86000) # 24 hours converted to seconds
        response = requests.get("https://api.darksky.net/forecast/9c6d85ba3ad3ef68e12f3cc210d0b026/" + 
            "{},{},{}?exclude=flags,minutely,daily".format(latitude, longitude, previous_day_time))
        payload = response.json()
        
        # get hourly temp data from the previous day
        hourly_temp_past_day = process_hourly_data(payload, previous_day_time, current_day=False)

        # join both lists to form 24 hour dataset
        twenty_four_hour_temp = hourly_temp_past_day + twenty_four_hour_temp
    
    return twenty_four_hour_temp

def process_hourly_data(payload, time, current_day=True):
    
    kelvin_hourly_temp = []

    if(current_day):
        for weather in payload['hourly']['data']:
            if(weather['time'] <= time):
                temp_kelvin = pytemp(weather['temperature'], 'fahrenheit', 'kelvin')
                kelvin_hourly_temp.append(temp_kelvin)
    else:
        for weather in payload['hourly']['data']:
            if(weather['time'] >= time):
                temp_kelvin = pytemp(weather['temperature'], 'fahrenheit', 'kelvin')
                kelvin_hourly_temp.append(temp_kelvin)

    return kelvin_hourly_temp