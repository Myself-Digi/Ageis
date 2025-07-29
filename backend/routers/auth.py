from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from supabase_client import get_supabase

router = APIRouter()

class AuthPayload(BaseModel):
    email: EmailStr
    password: str


def _handle_error(response):
    if response.get("error"):
        raise HTTPException(status_code=400, detail=response["error"]["message"])


@router.post("/signup")
async def signup(payload: AuthPayload):
    supabase = get_supabase()
    result = supabase.auth.sign_up({"email": payload.email, "password": payload.password})
    _handle_error(result)
    return {"user": result["user"], "session": result["session"]}


@router.post("/login")
async def login(payload: AuthPayload):
    supabase = get_supabase()
    result = supabase.auth.sign_in_with_password({"email": payload.email, "password": payload.password})
    _handle_error(result)
    return {"user": result["user"], "session": result["session"]}