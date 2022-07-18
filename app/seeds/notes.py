from datetime import datetime
from app.models import db, Note


def seed_notes():
    note1 = Note(title='First Note!',
                 body='Hopefully I can learn more things through all of this!',
                 created_at=datetime.now(),
                 user_id=1)
    note2 = Note(title='Second Note!',
                 body='I\'m definitely learning more as I go.',
                 created_at=datetime.now(),
                 user_id=1)
    note3 = Note(title='Third Note!',
                 body='Now I just need to continue learning/remembering',
                 created_at=datetime.now(),
                 user_id=1)

    db.session.add_all([note1, note2, note3])
    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
