from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ai_engine import ai_engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Career Roadmap API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    skills_text: str
    academic_background: Optional[str] = None

class PredictionResponse(BaseModel):
    extracted_skills: List[str]
    predicted_careers: List[str]

class RoadmapStep(BaseModel):
    step: int
    skill: str
    status: str
    learning_resource: str
    project_idea: str

class RoadmapResponse(BaseModel):
    career: str
    roadmap: List[RoadmapStep]

@app.post("/predict", response_model=PredictionResponse)
async def predict_careers(user_input: UserInput):
    skills = ai_engine.extract_skills(user_input.skills_text)
    if not skills:
        raise HTTPException(status_code=400, detail="No skills identified from input.")
    
    careers = ai_engine.predict_careers(skills)
    return {
        "extracted_skills": skills,
        "predicted_careers": careers
    }

@app.post("/generate-roadmap", response_model=RoadmapResponse)
async def generate_roadmap(career: str, skills: List[str]):
    roadmap = ai_engine.generate_roadmap(skills, career)
    return {
        "career": career,
        "roadmap": roadmap
    }

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Career Roadmap API"}
