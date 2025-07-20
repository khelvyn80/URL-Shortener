from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import crud, schemas

Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

@app.post("/shorten", response_model=schemas.URLResponse)
def shorten_url(url: schemas.URLBase, db: Session = Depends(get_db)):
	return crud.create_short_url(db, url.original_url)

@app.get("/{short_code}")
def redirect_url(short_code: str, db: Session = Depends(get_db)):
	db_url = crud.get_url_by_code(db, short_code)
	if db_url:
		return {"original_url": db_url.original_url}
	raise HTTPException(status_code=404, detail="URL not found")
