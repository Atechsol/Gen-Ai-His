import tensorflow as tf
import pickle
import numpy as np

# Load the trained model
model = tf.keras.models.load_model('LSTM_final.h5')

# Load the tokenizer
with open('tokenizer_final.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Load the vocabulary array
vocab_array = np.array(list(tokenizer.word_index.keys()))
n_words = 2
def make_prediction(text):
    for _ in range(n_words):
        # Tokenize and pad the input text
        text_tokenize = tokenizer.texts_to_sequences([text])
        text_padded = tf.keras.preprocessing.sequence.pad_sequences(text_tokenize, maxlen=14)
        
        # Predict the next word
        predictions = model.predict(text_padded)
        prediction_index = np.argmax(predictions, axis=-1)[0]
        prediction_word = vocab_array[prediction_index - 1]
        
        # Append the predicted word to the text
        text += " " + prediction_word
    
    return text