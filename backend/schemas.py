from pydantic import BaseModel

class URLBase(BaseModel):
	original_url: str

class URLResponse(URLBase):
	short_code: str
