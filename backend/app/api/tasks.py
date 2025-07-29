from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from datetime import datetime

from ..core.supabase import supabase
from ..models.task import Task, TaskCreate, TaskUpdate
from ..api.auth import verify_token

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=Task)
async def create_task(task: TaskCreate, token_data=Depends(verify_token)):
    """Create a new task"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Create task in Supabase
        task_data = {
            "user_id": user_id,
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "status": task.status,
            "due_date": task.due_date.isoformat() if task.due_date else None,
            "estimated_duration": task.estimated_duration,
            "tags": task.tags,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        response = supabase.table("tasks").insert(task_data).execute()
        
        if response.data:
            task_record = response.data[0]
            return Task(
                id=task_record["id"],
                user_id=task_record["user_id"],
                title=task_record["title"],
                description=task_record["description"],
                priority=task_record["priority"],
                status=task_record["status"],
                due_date=datetime.fromisoformat(task_record["due_date"]) if task_record["due_date"] else None,
                estimated_duration=task_record["estimated_duration"],
                tags=task_record["tags"],
                created_at=datetime.fromisoformat(task_record["created_at"]),
                updated_at=datetime.fromisoformat(task_record["updated_at"]),
                completed_at=datetime.fromisoformat(task_record["completed_at"]) if task_record["completed_at"] else None
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create task"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/", response_model=List[Task])
async def get_tasks(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    token_data=Depends(verify_token)
):
    """Get tasks for current user"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Build query
        query = supabase.table("tasks").select("*").eq("user_id", user_id)
        
        if status:
            query = query.eq("status", status)
        if priority:
            query = query.eq("priority", priority)
            
        query = query.order("created_at", desc=True).range(offset, offset + limit - 1)
        response = query.execute()
        
        tasks = []
        for task_record in response.data:
            tasks.append(Task(
                id=task_record["id"],
                user_id=task_record["user_id"],
                title=task_record["title"],
                description=task_record["description"],
                priority=task_record["priority"],
                status=task_record["status"],
                due_date=datetime.fromisoformat(task_record["due_date"]) if task_record["due_date"] else None,
                estimated_duration=task_record["estimated_duration"],
                tags=task_record["tags"],
                created_at=datetime.fromisoformat(task_record["created_at"]),
                updated_at=datetime.fromisoformat(task_record["updated_at"]),
                completed_at=datetime.fromisoformat(task_record["completed_at"]) if task_record["completed_at"] else None
            ))
        
        return tasks
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/{task_id}", response_model=Task)
async def get_task(task_id: str, token_data=Depends(verify_token)):
    """Get a specific task"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Get task from Supabase
        response = supabase.table("tasks").select("*").eq("id", task_id).eq("user_id", user_id).execute()
        
        if response.data:
            task_record = response.data[0]
            return Task(
                id=task_record["id"],
                user_id=task_record["user_id"],
                title=task_record["title"],
                description=task_record["description"],
                priority=task_record["priority"],
                status=task_record["status"],
                due_date=datetime.fromisoformat(task_record["due_date"]) if task_record["due_date"] else None,
                estimated_duration=task_record["estimated_duration"],
                tags=task_record["tags"],
                created_at=datetime.fromisoformat(task_record["created_at"]),
                updated_at=datetime.fromisoformat(task_record["updated_at"]),
                completed_at=datetime.fromisoformat(task_record["completed_at"]) if task_record["completed_at"] else None
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.put("/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: TaskUpdate, token_data=Depends(verify_token)):
    """Update a task"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Prepare update data
        update_data = {"updated_at": datetime.utcnow().isoformat()}
        
        if task_update.title is not None:
            update_data["title"] = task_update.title
        if task_update.description is not None:
            update_data["description"] = task_update.description
        if task_update.priority is not None:
            update_data["priority"] = task_update.priority
        if task_update.status is not None:
            update_data["status"] = task_update.status
            if task_update.status == "done":
                update_data["completed_at"] = datetime.utcnow().isoformat()
        if task_update.due_date is not None:
            update_data["due_date"] = task_update.due_date.isoformat()
        if task_update.estimated_duration is not None:
            update_data["estimated_duration"] = task_update.estimated_duration
        if task_update.tags is not None:
            update_data["tags"] = task_update.tags
        
        # Update task in Supabase
        response = supabase.table("tasks").update(update_data).eq("id", task_id).eq("user_id", user_id).execute()
        
        if response.data:
            task_record = response.data[0]
            return Task(
                id=task_record["id"],
                user_id=task_record["user_id"],
                title=task_record["title"],
                description=task_record["description"],
                priority=task_record["priority"],
                status=task_record["status"],
                due_date=datetime.fromisoformat(task_record["due_date"]) if task_record["due_date"] else None,
                estimated_duration=task_record["estimated_duration"],
                tags=task_record["tags"],
                created_at=datetime.fromisoformat(task_record["created_at"]),
                updated_at=datetime.fromisoformat(task_record["updated_at"]),
                completed_at=datetime.fromisoformat(task_record["completed_at"]) if task_record["completed_at"] else None
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.delete("/{task_id}")
async def delete_task(task_id: str, token_data=Depends(verify_token)):
    """Delete a task"""
    try:
        # Get current user
        user_response = supabase.auth.get_user()
        user_id = user_response.user.id
        
        # Delete task from Supabase
        response = supabase.table("tasks").delete().eq("id", task_id).eq("user_id", user_id).execute()
        
        if response.data:
            return {"message": "Task deleted successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )