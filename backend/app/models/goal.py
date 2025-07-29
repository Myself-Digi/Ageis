from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum


class GoalStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    PAUSED = "paused"
    CANCELLED = "cancelled"


class GoalPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class GoalBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: GoalPriority = GoalPriority.MEDIUM
    status: GoalStatus = GoalStatus.ACTIVE
    target_date: Optional[datetime] = None
    category: Optional[str] = None
    milestones: Optional[list[str]] = []


class GoalCreate(GoalBase):
    pass


class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[GoalPriority] = None
    status: Optional[GoalStatus] = None
    target_date: Optional[datetime] = None
    category: Optional[str] = None
    milestones: Optional[list[str]] = None


class GoalInDB(GoalBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class Goal(GoalInDB):
    pass