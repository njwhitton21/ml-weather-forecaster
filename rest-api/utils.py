import numpy as np
from tensorflow import keras

def reshape_dataset(dataset):
    new_dataset = dataset

    for i, data in enumerate(dataset):
        new_dataset[i] = [data]
    
    return new_dataset  