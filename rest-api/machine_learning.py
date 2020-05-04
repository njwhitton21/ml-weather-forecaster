import pickle as pkl
import time
from tensorflow import keras
from pytemp import pytemp
import numpy as np
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from utils import reshape_dataset, get_cardinal_direction

def initalize_models():
    
    temperature_model = keras.models.load_model("ml/models/temp_model.h5")
    pressure_model = keras.models.load_model("ml/models/pressure_model.h5")
    humidity_model = keras.models.load_model("ml/models/humidity_model.h5")
    wd_model = keras.models.load_model("ml/models/wd_model.h5")
    ws_model = keras.models.load_model("ml/models/ws_model.h5")
    description_model = keras.models.load_model("ml/models/description_model.h5")

    initalize_models = {
        'temperature': temperature_model,
        'pressure': pressure_model,
        'humidity': humidity_model,
        'windDirection': wd_model,
        'windSpeed': ws_model,
        'description': description_model,
    }

    return initalize_models

def initalize_transforms():

    temperature_transform = pkl.load(open('ml/transforms/temperature_scaler.pkl', 'rb'))
    pressure_transform = pkl.load(open('ml/transforms/pressure_scaler.pkl', 'rb'))
    humidity_transform = pkl.load(open('ml/transforms/humidity_scaler.pkl', 'rb'))
    wd_transform = pkl.load(open('ml/transforms/wd_scaler.pkl', 'rb'))
    ws_transform = pkl.load(open('ml/transforms/ws_scaler.pkl', 'rb'))
    description_transform = pkl.load(open('ml/transforms/description_scaler.pkl', 'rb'))

    desc_encoder = LabelEncoder()
    desc_encoder.classes_ = np.load('ml/transforms/encoder_classes.npy')

    initalize_transforms = {
        'temperature': temperature_transform,
        'pressure': pressure_transform,
        'humidity': humidity_transform,
        'windDirection': wd_transform,
        'windSpeed': ws_transform,
        'description': {
            'transform': description_transform,
            'encoder': desc_encoder,
        },
    }

    return initalize_transforms


def predict_hourly_weather(dataset, models, transforms, previous_hours=24):
    
    full_predictions = []
    
    # get current time
    current_time = dataset['time']
    current_time.reverse()
    current_time = current_time[0]
  
    # make predictions
    temp_prediction = predict_hourly_temperature(dataset['temperature'], models['temperature'], 
                        transforms['temperature'])
    pressure_prediction = predict_hourly_pressure(dataset['pressure'], models['pressure'], transforms['pressure'])
    humidity_prediction = predict_hourly_humidity(dataset['humidity'], models['humidity'], transforms['humidity'])
    wd_prediction = predict_hourly_wind_direction(dataset['windDirection'], models['windDirection'], 
                        transforms['windDirection'])
    ws_prediction = predict_hourly_wind_speed(dataset['windSpeed'], models['windSpeed'], transforms['windSpeed'])
    description_prediction = predict_hourly_description(dataset['description'], models['description'],
                                transforms['description']['transform'], transforms['description']['encoder'])
    

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
            'windDirection': wd_prediction[0][i],
            'windSpeed': ws_prediction[0][i],
            'description': description_prediction[i],
        })
    
    return full_predictions

def predict_hourly_temperature(dataset, model, transform, previous_hours=24):
    
    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)
    
    # scale the hourly dataset
    scaled_dataset = transform.transform(reshaped_dataset)
    scaled_dataset = np.array([scaled_dataset])

    # predict the weather for the next 12 hours
    prediction = model.predict(scaled_dataset)
    prediction = transform.inverse_transform(prediction)
    prediction = pytemp(prediction, 'kelvin', 'fahrenheit')
    prediction = np.rint(prediction)
    
    return prediction.tolist()

def predict_hourly_pressure(dataset, model, transform, previous_hours=24):

    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)
    
    # scale the hourly dataset
    scaled_dataset = transform.transform(reshaped_dataset)
    scaled_dataset = np.array([scaled_dataset])

    # predict the weather for the next 12 hours
    prediction = model.predict(scaled_dataset)
    prediction = transform.inverse_transform(prediction)
    prediction = np.rint(prediction)
    
    return prediction.tolist()

def predict_hourly_humidity(dataset, model, transform, previous_hours=24):

    # convert from decimal to percentage
    for i, data in enumerate(dataset):
        dataset[i] = dataset[i] * 100

    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)

    # scale the hourly dataset
    scaled_dataset = transform.transform(reshaped_dataset)
    scaled_dataset = np.array([scaled_dataset])

    # predict the weather for the next 12 hours
    prediction = model.predict(scaled_dataset)
    prediction = transform.inverse_transform(prediction)
    prediction = np.rint(prediction)
    
    return prediction.tolist()

def predict_hourly_wind_direction(dataset, model, transform, previous_hours=24):

    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)
    
    # scale the hourly dataset
    scaled_dataset = transform.transform(reshaped_dataset)
    scaled_dataset = np.array([scaled_dataset])

    # predict the weather for the next 12 hours
    prediction = model.predict(scaled_dataset)
    prediction = transform.inverse_transform(prediction)
    prediction = np.rint(prediction)
    pred_list = prediction.tolist()

    # replace numerical value with cardinal direction
    for i, item in enumerate(pred_list[0]):
        pred_list[0][i] = get_cardinal_direction(pred_list[0][i])
    
    return pred_list

def predict_hourly_wind_speed(dataset, model, transform, previous_hours=24):

    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)

    # scale the hourly dataset
    scaled_dataset = transform.transform(reshaped_dataset)
    scaled_dataset = np.array([scaled_dataset])

    # predict the weather for the next 12 hours
    prediction = model.predict(scaled_dataset)
    prediction = transform.inverse_transform(prediction)
    prediction = np.rint(prediction)

    return prediction.tolist()

def predict_hourly_description(dataset, model, transform, encoder, previous_hours=24):

    # reshape the dataset to fit the shape accepted by the model
    reshaped_dataset = reshape_dataset(dataset)

    # encode the hourly dataset
    encoded_dataset = encoder.transform(reshaped_dataset)
    encoded_dataset = np.reshape(encoded_dataset, (encoded_dataset.shape[0], 1))

    # scale the hourly dataset
    scaled_dataset = transform.transform(encoded_dataset)
    scaled_dataset = np.array([scaled_dataset])

    # predict the weather for the next 12 hours
    prediction = model.predict(scaled_dataset)
    prediction = transform.inverse_transform(prediction)
    print(prediction)
    prediction = prediction.astype(int)
    prediction = np.reshape(prediction, (prediction.shape[1], 1))
    prediction = encoder.inverse_transform(prediction)

    return prediction.tolist()