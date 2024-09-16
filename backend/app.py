from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import pickle
import os
import cv2
from pathlib import Path

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './uploads'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Load the pre-trained model and scaler
try:
    with open('soil_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
except (FileNotFoundError, EOFError) as e:
    print(f"Error loading model or scaler: {e}")
    model = None
    scaler = None

def preprocess_image(img_path):
    img = cv2.imread(img_path, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Failed to read image.")
    img_resized = cv2.resize(img, (128, 128), interpolation=cv2.INTER_AREA)
    img_flattened = img_resized.flatten().reshape(1, -1)
    return img_flattened

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Save the file
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        
        # Preprocess the image
        features = preprocess_image(filepath)
        
        if scaler:
            features = scaler.transform(features)
        
        if model:
            # Predict soil type
            prediction = model.predict(features)
            soil_types = {0: 'Alluvial', 1: 'Black', 2: 'Clay', 3: 'Red'}
            soil_label = soil_types.get(prediction[0], 'Unknown')
            return jsonify({'soil_type': soil_label})
        else:
            return jsonify({'error': 'Model or scaler not loaded'}), 500

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
