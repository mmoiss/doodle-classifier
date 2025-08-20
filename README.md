# Doodle Classifier

A doodle classifier with a front end using an ML model trained on Google, Quick Draw! dataset. Please refer to the instructions below for setup.

## Clone Repository
```bash
git clone https://github.com/mmoiss/doodle-classifier.git
cd doodle-classifier
```

## 1️⃣ Backend 
### Requirements
- Python 3.9
- pip

### Instsall Dependencies
```bash
cd backend
pip install fastapi uvicorn joblib scikit-learn
```

### Running
```bash
uvicorn main:app --reload --port 8000
```

## 2️⃣ Frontend
### Requirements
- Node.js 18+

### Install Dependencies
```bash
cd frontend (cd ./frontend)
npm install
```

### Running
```bash
npm run dev
```
