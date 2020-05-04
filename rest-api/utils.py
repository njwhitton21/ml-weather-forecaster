import numpy as np
from tensorflow import keras
import pandas as pd

def reshape_dataset(dataset):
    new_dataset = dataset

    for i, data in enumerate(dataset):
        new_dataset[i] = [data]
    
    return new_dataset  

def get_cardinal_direction(angle):
    if(angle >= 350 or angle <= 10):
        return "N"
    elif(angle > 10 or angle < 80):
        return "NE"
    elif(angle >= 80 or angle <= 100 ):
        return "E"
    elif(angle > 100 or angle < 170):
        return "SE"
    elif(angle >= 170 or angle <= 190):
        return "S"
    elif(angle > 190 or angle < 260):
        return "SW"
    elif(angle >= 260 or angle <= 280):
        return "W"
    elif(angle > 280 or angle < 350):
        return "NW"
    
def get_lat_lng(location):
    city_state = location.split(', ')

    uscities_csv = pd.read_csv("uscities-lat-lng.csv")
    uscities_dataset = pd.DataFrame(data=uscities_csv)

    lat = uscities_dataset.loc[(uscities_dataset['city'] == city_state[0]) & 
        (uscities_dataset['state_id'] == city_state[1]), 'lat'].iloc[0]

    lng = uscities_dataset.loc[(uscities_dataset['city'] == city_state[0]) & 
        (uscities_dataset['state_id'] == city_state[1]), 'lng'].iloc[0]

    lat_lng = {
        'lat': lat,
        'lng': lng
    }
    
    return lat_lng

def convert_description(description):
    if "partly" in description:
        return "partly-cloudy"
    elif "clear" in description:
        return "clear"
    elif "rain" in description:
        return "rain"
    elif "cloudy" in description:
        return "cloudy"
    elif "fog" in description:
        return "cloudy"
    elif "sleet" in description:
        return "sleet"
    elif "snow" in description:
        return "snow"
    elif "thunderstorm" in description:
        return "thunderstorm"