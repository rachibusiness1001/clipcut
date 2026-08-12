import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base

# Use SQLite by default for development, easily overridden with DATABASE_URL in .env
# We use aiosqlite for async SQLite
DEFAULT_DATABASE_URL = "sqlite+aiosqlite:///./data/clippyme.db"
DATABASE_URL = os.environ.get("DATABASE_URL", DEFAULT_DATABASE_URL)

engine = create_async_engine(
    DATABASE_URL,
    echo=os.environ.get("DEBUG_SQL", "false").lower() == "true",
    # sqlite requires connect_args check_same_thread=False
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
