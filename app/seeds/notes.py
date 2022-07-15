from datetime import datetime
from app.models import db, Note


def seed_notes():
    note = Note(title='First Note!',
                body='Hopefully I can learn more things through all of this!',
                created_at=datetime.now(),
                user_id=1)

    db.session.add(note)
    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
