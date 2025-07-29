from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class GoalCategory(str, Enum):
    CAREER = "career"
    PERSONAL = "personal"
    HEALTH = "health"
    FINANCIAL = "financial"
    LEARNING = "learning"
    RELATIONSHIPS = "relationships"
    OTHER = "other"


class GoalBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: GoalCategory = GoalCategory.OTHER
    target_date: Optional[datetime] = None
    is_active: bool = True


class GoalCreate(GoalBase):
    pass


class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[GoalCategory] = None
    target_date: Optional[datetime] = None
    is_active: Optional[bool] = None


class Goal(GoalBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True