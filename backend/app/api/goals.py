from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from datetime import datetime

from ..core.supabase import supabase
from ..models.goal import Goal, GoalCreate, GoalUpdate
from ..api.auth import verify_token

router = APIRouter(prefix="/goals", tags=["goals"])


@router.post("/", response_model=Goal)
async def create_goal(goal: GoalCreate, token_data=Depends(verify_token)):
    """Create a new goal"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Create goal in Supabase
        goal_data = {
            "user_id": user_id,
            "title": goal.title,
            "description": goal.description,
            "priority": goal.priority,
            "status": goal.status,
            "target_date": goal.target_date.isoformat() if goal.target_date else None,
            "category": goal.category,
            "milestones": goal.milestones,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        response = supabase.table("goals").insert(goal_data).execute()
        
        if response.data:
            goal_record = response.data[0]
            return Goal(
                id=goal_record["id"],
                user_id=goal_record["user_id"],
                title=goal_record["title"],
                description=goal_record["description"],
                priority=goal_record["priority"],
                status=goal_record["status"],
                target_date=datetime.fromisoformat(goal_record["target_date"]) if goal_record["target_date"] else None,
                category=goal_record["category"],
                milestones=goal_record["milestones"],
                created_at=datetime.fromisoformat(goal_record["created_at"]),
                updated_at=datetime.fromisoformat(goal_record["updated_at"]),
                completed_at=datetime.fromisoformat(goal_record["completed_at"]) if goal_record["completed_at"] else None
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create goal"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/", response_model=List[Goal])
async def get_goals(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    category: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    token_data=Depends(verify_token)
):
    """Get goals for current user"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Build query
        query = supabase.table("goals").select("*").eq("user_id", user_id)
        
        if status:
            query = query.eq("status", status)
        if priority:
            query = query.eq("priority", priority)
        if category:
            query = query.eq("category", category)
            
        query = query.order("created_at", desc=True).range(offset, offset + limit - 1)
        response = query.execute()
        
        goals = []
        for goal_record in response.data:
            goals.append(Goal(
                id=goal_record["id"],
                user_id=goal_record["user_id"],
                title=goal_record["title"],
                description=goal_record["description"],
                priority=goal_record["priority"],
                status=goal_record["status"],
                target_date=datetime.fromisoformat(goal_record["target_date"]) if goal_record["target_date"] else None,
                category=goal_record["category"],
                milestones=goal_record["milestones"],
                created_at=datetime.fromisoformat(goal_record["created_at"]),
                updated_at=datetime.fromisoformat(goal_record["updated_at"]),
                completed_at=datetime.fromisoformat(goal_record["completed_at"]) if goal_record["completed_at"] else None
            ))
        
        return goals
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/{goal_id}", response_model=Goal)
async def get_goal(goal_id: str, token_data=Depends(verify_token)):
    """Get a specific goal"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Get goal from Supabase
        response = supabase.table("goals").select("*").eq("id", goal_id).eq("user_id", user_id).execute()
        
        if response.data:
            goal_record = response.data[0]
            return Goal(
                id=goal_record["id"],
                user_id=goal_record["user_id"],
                title=goal_record["title"],
                description=goal_record["description"],
                priority=goal_record["priority"],
                status=goal_record["status"],
                target_date=datetime.fromisoformat(goal_record["target_date"]) if goal_record["target_date"] else None,
                category=goal_record["category"],
                milestones=goal_record["milestones"],
                created_at=datetime.fromisoformat(goal_record["created_at"]),
                updated_at=datetime.fromisoformat(goal_record["updated_at"]),
                completed_at=datetime.fromisoformat(goal_record["completed_at"]) if goal_record["completed_at"] else None
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Goal not found"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.put("/{goal_id}", response_model=Goal)
async def update_goal(goal_id: str, goal_update: GoalUpdate, token_data=Depends(verify_token)):
    """Update a goal"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Prepare update data
        update_data = {"updated_at": datetime.utcnow().isoformat()}
        
        if goal_update.title is not None:
            update_data["title"] = goal_update.title
        if goal_update.description is not None:
            update_data["description"] = goal_update.description
        if goal_update.priority is not None:
            update_data["priority"] = goal_update.priority
        if goal_update.status is not None:
            update_data["status"] = goal_update.status
            if goal_update.status == "completed":
                update_data["completed_at"] = datetime.utcnow().isoformat()
        if goal_update.target_date is not None:
            update_data["target_date"] = goal_update.target_date.isoformat()
        if goal_update.category is not None:
            update_data["category"] = goal_update.category
        if goal_update.milestones is not None:
            update_data["milestones"] = goal_update.milestones
        
        # Update goal in Supabase
        response = supabase.table("goals").update(update_data).eq("id", goal_id).eq("user_id", user_id).execute()
        
        if response.data:
            goal_record = response.data[0]
            return Goal(
                id=goal_record["id"],
                user_id=goal_record["user_id"],
                title=goal_record["title"],
                description=goal_record["description"],
                priority=goal_record["priority"],
                status=goal_record["status"],
                target_date=datetime.fromisoformat(goal_record["target_date"]) if goal_record["target_date"] else None,
                category=goal_record["category"],
                milestones=goal_record["milestones"],
                created_at=datetime.fromisoformat(goal_record["created_at"]),
                updated_at=datetime.fromisoformat(goal_record["updated_at"]),
                completed_at=datetime.fromisoformat(goal_record["completed_at"]) if goal_record["completed_at"] else None
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Goal not found"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.delete("/{goal_id}")
async def delete_goal(goal_id: str, token_data=Depends(verify_token)):
    """Delete a goal"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Delete goal from Supabase
        response = supabase.table("goals").delete().eq("id", goal_id).eq("user_id", user_id).execute()
        
        if response.data:
            return {"message": "Goal deleted successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Goal not found"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )