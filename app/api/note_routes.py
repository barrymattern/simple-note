from datetime import datetime
from flask_login import login_required
from flask import Blueprint, request
from app.models import db, Note
from app.forms import NoteForm
from .utils import validation_errors_to_error_messages

note_routes = Blueprint('notes', __name__)


@note_routes.route('/<int:id>')
# @login_required
def get_note(id):
    '''
    GET Note by ID
    '''
    note = Note.query.get(id)
    if not note:
        return {'errors': ['Note does note exist']}, 404
    return note.to_dict()


@note_routes.route('/new', methods=['POST'])
# @login_required
def create_new_note():
    '''
    Create new Note
    '''
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note(title=form['title'].data,
                    body=form['body'].data,
                    created_at=datetime.now(),
                    user_id=1)  # TODO: remove when frontend form is created
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
