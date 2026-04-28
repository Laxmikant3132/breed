import tensorflow as tf
from tensorflow.keras import layers, models
import os

def create_mock_model(save_path):
    # Ensure directory exists
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    
    # Create a very simple model with EfficientNetB0-like input
    model = models.Sequential([
        layers.Input(shape=(224, 224, 3)),
        layers.Conv2D(32, (3, 3), activation='relu'),
        layers.GlobalAveragePooling2D(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(10, activation='softmax')
    ])
    
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    
    # Save as .h5
    model.save(save_path)
    print(f"Mock model created and saved to {save_path}")

if __name__ == "__main__":
    model_path = os.path.join(os.getcwd(), "backend", "models", "breed_classifier.h5")
    create_mock_model(model_path)
