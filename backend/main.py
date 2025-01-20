import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

# Load the dataset
file_path = 'general/Disease_symptom_and_patient_profile_dataset.csv'  # Update the path if necessary
data = pd.read_csv(file_path)

# Load the model and encoders
model = joblib.load('general/general.pkl')

# Load the CKD model and scaler
ckd_model = joblib.load('chronic/chronic_kidney_model.pkl')
ckd_scaler = joblib.load('chronic/chronic_kidney_scaler.pkl')

# Load Heart Disease model and scaler
heart_model = joblib.load('heart/heart_disease_model.pkl')
heart_scaler = joblib.load('heart/heart_disease_scaler.pkl')

# Load the Diabetes model and scaler
diabetes_model = joblib.load('diabetes/diabetes_model.pkl')
diabetes_scaler = joblib.load('diabetes/diabetes_scaler.pkl')

# Define the input schema for CKD
class ChronicKidneyInput(BaseModel):
    Bp: float  # Blood Pressure
    Sg: float  # Specific Gravity
    Al: float  # Albumin
    Su: float  # Sugar
    Rbc: float  # Red Blood Cells
    Bu: float  # Blood Urea
    Sc: float  # Serum Creatinine
    Sod: float  # Sodium
    Pot: float  # Potassium
    Hemo: float  # Hemoglobin
    Wbcc: float  # White Blood Cell Count
    Rbcc: float  # Red Blood Cell Count
    Htn: int    # Hypertension (1=Yes, 0=No)

# Define the input schema
class DiseaseInput(BaseModel):
    Disease: str
    Fever: str
    Cough: str
    Fatigue: str
    Difficulty_Breathing: str
    Age: int
    Gender: str
    Blood_Pressure: str
    Cholesterol_Level: str

# Define the input schema for Diabetes
class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

# Initialize FastAPI
app = FastAPI()

# Add CORSMiddleware to the app
origins = [
    "http://localhost",  # Allow frontend from localhost
    "http://localhost:8000",  # Allow frontend from localhost with a specific port
    "*",  # Allow all origins (be cautious with this in production)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define input schema
class UserInput(BaseModel):
    Fever: str
    Cough: str
    Fatigue: str
    Difficulty_Breathing: str
    Age: int
    Gender: str
    Blood_Pressure: str
    Cholesterol_Level: str

# Define the input schema for heart disease
class HeartDiseaseInput(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

# Default route
@app.get("/")
def read_root():
    return {"message": "Welcome to the Disease Prediction API. Use the /docs endpoint for detailed API usage."}

@app.post("/general_diseases/find_diseases")
def find_diseases(input_data: UserInput):
    # Filter data based on user input
    filtered_data = data[
        (data['Fever'] == input_data.Fever) &
        (data['Cough'] == input_data.Cough) &
        (data['Fatigue'] == input_data.Fatigue) &
        (data['Difficulty Breathing'] == input_data.Difficulty_Breathing) &
        (data['Age'] == input_data.Age) &
        (data['Gender'] == input_data.Gender) &
        (data['Blood Pressure'] == input_data.Blood_Pressure) &
        (data['Cholesterol Level'] == input_data.Cholesterol_Level)
    ]

    # Get diseases with a positive outcome
    positive_diseases = filtered_data[filtered_data['Outcome Variable'] == 'Positive']['Disease'].unique()

    if len(positive_diseases) == 0:
        return {"Success": False, "Message": "No diseases found with the given input.", "Disease Count": len(positive_diseases)}

    return {"Success": True, "Diseases": list(positive_diseases), "Disease Count": len(positive_diseases)}

# Define the predict endpoint
@app.post("/general_diseases/predict")
def predict(input_data: DiseaseInput):
    # Load encoders and encode input data
    encoders = {}
    for col in ['Disease', 'Fever', 'Cough', 'Fatigue', 'Difficulty_Breathing', 
                'Gender', 'Blood_Pressure', 'Cholesterol_Level']:
        encoders[col] = joblib.load(f'general/{col}_encoder.pkl')
    
    # Encode inputs
    input_values = [
        encoders['Disease'].transform([input_data.Disease])[0],
        encoders['Fever'].transform([input_data.Fever])[0],
        encoders['Cough'].transform([input_data.Cough])[0],
        encoders['Fatigue'].transform([input_data.Fatigue])[0],
        encoders['Difficulty_Breathing'].transform([input_data.Difficulty_Breathing])[0],
        input_data.Age,
        encoders['Gender'].transform([input_data.Gender])[0],
        encoders['Blood_Pressure'].transform([input_data.Blood_Pressure])[0],
        encoders['Cholesterol_Level'].transform([input_data.Cholesterol_Level])[0]
    ]
    
    # Ensure input is a DataFrame with the correct feature names
    feature_names = ['Disease', 'Fever', 'Cough', 'Fatigue', 'Difficulty Breathing', 
                     'Age', 'Gender', 'Blood Pressure', 'Cholesterol Level']
    input_df = pd.DataFrame([input_values], columns=feature_names)

    # Predict
    prediction = model.predict(input_df)[0]
    return {"Prediction": True if prediction == 1 else False, "Disease_Name" : input_data.Disease}

# Chronic Kidney Disease Prediction Endpoint
@app.post("/chronic_kidney_disease/predict")
def predict_ckd(input_data: ChronicKidneyInput):
    # Convert input to DataFrame
    input_dict = input_data.dict()
    input_df = pd.DataFrame([input_dict])
    
    # Scale the input data
    input_scaled = ckd_scaler.transform(input_df)

    # Predict using the CKD model
    prediction = ckd_model.predict(input_scaled)[0]

    return {"Prediction": True if prediction == 1 else False}

# Heart Disease Prediction Endpoint
@app.post("/heart_disease/predict")
def predict_heart_disease(input_data: HeartDiseaseInput):
    # Convert input to DataFrame
    input_dict = input_data.dict()
    input_df = pd.DataFrame([input_dict])
    
    # Scale the input data
    input_scaled = heart_scaler.transform(input_df)

    # Predict using the Heart Disease model
    prediction = heart_model.predict(input_scaled)[0]

    return {"Prediction": True if prediction == 1 else False}

# Diabetes Disease Prediction Endpoint
@app.post("/diabetes/predict")
def predict_diabetes(input_data: DiabetesInput):
    # Convert input to DataFrame
    input_dict = input_data.dict()
    input_df = pd.DataFrame([input_dict])
    
    # Scale the input data
    input_scaled = diabetes_scaler.transform(input_df)

    # Predict using the Diabetes model
    prediction = diabetes_model.predict(input_scaled)[0]

    return {"Prediction": True if prediction == 1 else False}
