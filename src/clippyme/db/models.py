import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from clippyme.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    credits_balance = Column(Integer, default=10) # Default free credits
    
    # Relationships
    jobs = relationship("VideoJob", back_populates="owner")

class VideoJob(Base):
    __tablename__ = "video_jobs"

    id = Column(String, primary_key=True, index=True) # UUID string
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Metadata
    source_type = Column(String, nullable=False) # 'url' or 'file'
    source_path = Column(String, nullable=False) # original url or filename
    status = Column(String, default="pending") # pending, processing, complete, error
    
    # Timestamps
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))
    
    # JSON payload for generic results/options
    result_data = Column(JSON, nullable=True)
    error_message = Column(String, nullable=True)

    owner = relationship("User", back_populates="jobs")
