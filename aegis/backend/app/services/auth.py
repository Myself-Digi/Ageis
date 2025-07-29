from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from ..core.config import settings
from ..core.supabase import supabase
from ..schemas.user import UserCreate, User, TokenData


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt


def verify_token(token: str) -> Optional[TokenData]:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        if email is None:
            return None
        return TokenData(email=email)
    except JWTError:
        return None


async def authenticate_user(email: str, password: str) -> Optional[User]:
    """Authenticate a user with email and password"""
    try:
        # Query user from Supabase
        response = supabase.table("users").select("*").eq("email", email).execute()
        
        if not response.data:
            return None
        
        user_data = response.data[0]
        
        if not verify_password(password, user_data["password_hash"]):
            return None
        
        return User(**user_data)
    except Exception as e:
        print(f"Authentication error: {e}")
        return None


async def create_user(user: UserCreate) -> User:
    """Create a new user"""
    try:
        # Check if user already exists
        existing_user = supabase.table("users").select("*").eq("email", user.email).execute()
        if existing_user.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Hash password
        hashed_password = get_password_hash(user.password)
        
        # Create user in Supabase
        user_data = {
            "email": user.email,
            "full_name": user.full_name,
            "password_hash": hashed_password,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        response = supabase.table("users").insert(user_data).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create user"
            )
        
        created_user = response.data[0]
        return User(**created_user)
    except HTTPException:
        raise
    except Exception as e:
        print(f"User creation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )


async def get_user_by_email(email: str) -> Optional[User]:
    """Get user by email"""
    try:
        response = supabase.table("users").select("*").eq("email", email).execute()
        
        if not response.data:
            return None
        
        return User(**response.data[0])
    except Exception as e:
        print(f"Get user error: {e}")
        return None