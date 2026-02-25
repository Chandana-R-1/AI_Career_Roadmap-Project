from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    skills = Column(JSON, default=[])
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CareerRoadmap(Base):
    __tablename__ = "roadmaps"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    career_title = Column(String)
    roadmap_data = Column(JSON) # List of steps
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User")
