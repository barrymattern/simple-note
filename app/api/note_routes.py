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
                    user_id=form['user_id'].data,
                    created_at=datetime.now(),
                    updated_at=datetime.now())
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@note_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_note(id):
    '''
    Delete Note by ID
    '''
    note = Note.query.get(id)

    try:
        db.session.delete(note)
        db.session.commit()
        return {'success': f'Note {id} deleted'}
    except BaseException as err:
        return {'errors': err}, 500
