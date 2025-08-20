from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load Model On Startup
model = joblib.load("my_model.pkl")

app = FastAPI()

class InputData(BaseModel):
    feature1: float
    feature2: float
    # TO DO: Add fields matching your model input!

@app.post("/predict")
def predict(data: InputData):
    X = [[data.feature1, data.feature2]]
    prediction = model.predict(X)
    return {"prediction": prediction.tolist()}
