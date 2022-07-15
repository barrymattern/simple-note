from datetime import datetime
from .db import db


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.TIMESTAMP(timezone=True), nullable=False)
    updated_at = db.Column(db.TIMESTAMP(timezone=True),
                           nullable=False,
                           default=datetime.now())
    title = db.Column(db.String(255), nullable=False, unique=True)
    body = db.Column(db.Text, nullable=False)
    # image

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='notes')

    def to_dict(self):
        return {'id': self.id,
                'title': self.title,
                'body': self.body,
                'createdAt': self.create_at,
                'updatedAt': self.updated_at}
