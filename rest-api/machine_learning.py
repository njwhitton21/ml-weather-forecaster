from pickle import load
import time
from tensorflow import keras
from pytemp import pytemp
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from utils import reshape_dataset

def predict_hourly_weather(dataset, previous_hours=24):
    
    full_predictions = []
    
    # get current time
    current_time = dataset['time']
    current_time.reverse()
    current_time = current_time[0]
  
    # make predictions
    temp_prediction = predict_hourly_temperature(dataset['temperature'])
    pressure_prediction = predict_hourly_pressure(dataset['pressure'])
    humidity_prediction = predict_hourly_humidity(dataset['humidity'])

    # build up json object
    for i, data in enumerate(temp_prediction[0]):
        
        # determine the time for each of the next 12 hours
        current_time = current_time + 3600
        time_string = time.strftime("%I:%M %p", time.localtime(current_time))
        if(time_string[0] == "0"):
            time_string = time_string[1 : len(time_string)]
        
        # add time and predictions to json object
        full_predictions.append({
            'time': time_string,
            'temperature': temp_prediction[0][i],
            'pressure': pressure_prediction[0][i],
            'humidity': humidity_prediction[0][i],
        })
    
    return full_predictions

def predict_hourly_temperature(dataset, previous_hours=24):
    
    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)

    # load scaler for temperature forecasting model
    value_scaler = load(open('temperature_scaler.pkl', 'rb'))
    
    # scale the hourly dataset
    scaled_dataset = value_scaler.transform(reshaped_dataset)
    scaled_dataset = np.array([scaled_dataset])
    # load temperature forecasting model
    temperature_model = keras.models.load_model("temp_model.h5")

    # predict the weather for the next 12 hours
    prediction = temperature_model.predict(scaled_dataset)
    prediction = value_scaler.inverse_transform(prediction)
    prediction = pytemp(prediction, 'kelvin', 'fahrenheit')
    prediction = np.rint(prediction)
    
    return prediction.tolist()

def predict_hourly_pressure(dataset, previous_hours=24):

    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)

    # load scaler for pressure forecasting model
    value_scaler = load(open('pressure_scaler.pkl', 'rb'))
    
    # scale the hourly dataset
    scaled_dataset = value_scaler.transform(reshaped_dataset)
    scaled_dataset = np.array([scaled_dataset])
    
    # load pressure forecasting model
    pressure_model = keras.models.load_model("pressure_model.h5")

    # predict the weather for the next 12 hours
    prediction = pressure_model.predict(scaled_dataset)
    prediction = value_scaler.inverse_transform(prediction)
    prediction = np.rint(prediction)
    
    return prediction.tolist()

def predict_hourly_humidity(dataset, previous_hours=24):

    # convert from decimal to percentage
    for i, data in enumerate(dataset):
        dataset[i] = dataset[i] * 100

    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)

    # load scaler for humidity forecasting model
    value_scaler = load(open('humidity_scaler.pkl', 'rb'))
    
    # scale the hourly dataset
    scaled_dataset = value_scaler.transform(reshaped_dataset)
    scaled_dataset = np.array([scaled_dataset])
    
    # load humidity forecasting model
    humidity_model = keras.models.load_model("humidity_model.h5")

    # predict the weather for the next 12 hours
    prediction = humidity_model.predict(scaled_dataset)
    prediction = value_scaler.inverse_transform(prediction)
    prediction = np.rint(prediction)
    
    return prediction.tolist()