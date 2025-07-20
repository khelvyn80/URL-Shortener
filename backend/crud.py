import random, string
from sqlalchemy.orm import Session
from models import URL

def generate_code(length=6):
	return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def create_short_url(db: Session, original_url: str):
	short_code = generate_code()
	db_url = URL(original_url=original_url, short_code=short_code)
	db.add(db_url)
	db.commit()
	db.refresh(db_url)
	return db_url

def get_url_by_code(db: Session, code: str):
	return db.query(URL).filter(URL.short_code == code).first()
