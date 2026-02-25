import re

class AIEngine:
    def __init__(self):
        # Initial predefined mappings for career prediction
        self.skill_career_map = {
            "web development": ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
            "data science": ["Data Scientist", "Data Analyst", "Machine Learning Engineer"],
            "machine learning": ["Machine Learning Engineer", "AI Researcher"],
            "cybersecurity": ["Security Analyst", "Ethical Hacker", "Security Engineer"],
            "cloud computing": ["Cloud Architect", "DevOps Engineer"],
            "mobile development": ["Android Developer", "iOS Developer", "React Native Developer"]
        }
        
        # Skill gaps for targeted careers (example)
        self.career_requirements = {
            "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Next.js", "State Management"],
            "Backend Developer": ["Python", "FastAPI", "SQL", "Docker", "Algorithms"],
            "Data Scientist": ["Python", "Statistics", "Pandas", "Scikit-Learn", "Data Visualization"],
            "Machine Learning Engineer": ["Python", "Deep Learning", "TensorFlow", "PyTorch", "Model Deployment"],
        }

    def extract_skills(self, text):
        """
        Simple pattern-based skill extraction for the initial version.
        In a real app, this would use spaCy or a more complex NLP model.
        """
        all_skills = [
            "python", "javascript", "react", "next.js", "html", "css", "sql", 
            "mongodb", "docker", "kubernetes", "machine learning", "data science",
            "fastapi", "flask", "java", "c++", "aws", "azure", "cloud"
        ]
        text = text.lower()
        extracted = []
        for skill in all_skills:
            if re.search(rf"\b{re.escape(skill)}\b", text):
                extracted.append(skill)
        return extracted

    def predict_careers(self, skills):
        """
        Predict career paths based on extracted skills.
        """
        predictions = set()
        skills_lower = [s.lower() for s in skills]
        
        for category, careers in self.skill_career_map.items():
            if category in skills_lower:
                predictions.update(careers)
        
        # Also check for specific tech overlap
        if "python" in skills_lower and "sql" in skills_lower:
            predictions.add("Backend Developer")
            predictions.add("Data Analyst")
        if "javascript" in skills_lower or "react" in skills_lower:
            predictions.add("Frontend Developer")
            
        return list(predictions) if predictions else ["General Software Engineer"]

    def generate_roadmap(self, current_skills, target_career):
        """
        Identify skill gaps and generate a learning roadmap.
        """
        requirements = self.career_requirements.get(target_career, ["Basic Programming", "Advanced Concepts", "Projects"])
        current_skills_set = set(s.lower() for s in current_skills)
        
        roadmap = []
        for idx, req in enumerate(requirements):
            status = "Completed" if req.lower() in current_skills_set else "Pending"
            roadmap.append({
                "step": idx + 1,
                "skill": req,
                "status": status,
                "learning_resource": f"Search for {req} courses on Coursera/Udemy/YouTube",
                "project_idea": f"Build a project using {req}"
            })
            
        return roadmap

ai_engine = AIEngine()
