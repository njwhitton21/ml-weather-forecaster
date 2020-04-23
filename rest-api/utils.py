import numpy as np
from tensorflow import keras

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
    