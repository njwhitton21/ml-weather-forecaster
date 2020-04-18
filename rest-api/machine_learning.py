from pickle import load
from tensorflow import keras
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from utils import reshape_dataset

def predict_hourly_weather(dataset, previous_hours=24):
    
    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)

    # load scaler for temperature forecasting model
    value_scaler = load(open('temperature_scaler.pkl', 'rb'))
    
    # scale the hourly dataset
    scaled_dataset = value_scaler.transform(reshaped_dataset)
    scaled_dataset = np.array([scaled_dataset])
    print(scaled_dataset.shape)
    # load temperature forecasting model
    temperature_model = keras.models.load_model("temp_model.h5")

    dataset = [[[0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], ]]
    dataset = np.array(dataset)
    
    # predict the weather for the next 12 hours
    # prediction = temperature_model.predict(scaled_dataset)

    return prediciton.tolist()

