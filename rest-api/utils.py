import numpy as np
from tensorflow import keras

def reshape_dataset(dataset):
    new_dataset = dataset

    for i, data in enumerate(dataset):
        new_dataset[i] = [data]
    
    return new_dataset



model = keras.models.Sequential([
    keras.layers.LSTM(30, return_sequences=True, input_shape=[None, 1]),
    keras.layers.LSTM(30, return_sequences=True),
    keras.layers.LSTM(30),
    keras.layers.Dense(12)
])

model.load_weights("temp_model_weights.h5")


dataset = [[[0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5], [0.5]]]
dataset = np.array(dataset)

prediction = model.predict(dataset)

print(prediction)
    