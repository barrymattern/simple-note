from flask_login import login_required
from flask import Blueprint
from app.models import Note

note_routes = Blueprint('notes', __name__)


@note_routes.route('/<int:id>')
# @login_required
def note(id):
    '''
    GET Note by ID
    '''
    note = Note.query.get(id)
    if not note:
        return {'errors': ['Note does note exist']}, 404
    return note.to_dict()
