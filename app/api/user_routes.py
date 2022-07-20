from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Note

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    '''
    GET all Users
    '''
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    '''
    GET User by ID
    '''
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/notes')
# @login_required
def user_notes(id):
    '''
    GET all Notes by User ID
    '''
    notes = Note.query.filter_by(user_id=id).all()
    return {'notes': {note.id: note.to_dict() for note in notes},
            'all_note_ids': [note.id for note in notes]}
