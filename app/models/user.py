from datetime import datetime
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.TIMESTAMP(timezone=True), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=True),
                           nullable=False,
                           default=datetime.now())

    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    notes = db.relationship('Note',
                            back_populates='user',
                            cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {'id': self.id,
                'username': self.username,
                'email': self.email,
                'createdAt': self.created_at,
                'updateAt': self.updated_at}
