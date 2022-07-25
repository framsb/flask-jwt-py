from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self,username,email,password):
        self.username = username
        self.email = email
        self.password = password
        self.is_active = True
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "registration_date": self.registration_date,
            # do not serialize the password, its a security breach
        }