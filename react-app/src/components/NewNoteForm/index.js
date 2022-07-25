import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes, fetchNewNote } from "../../store/notesReducer";

const NewNoteForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notesReducer.userNotes);

    useEffect(() => {
        if (!notes) dispatch(fetchAllNotes(user.id));
    }, [dispatch, user.id, notes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = await dispatch(fetchNewNote(user.id, title, body));
        history.push(`/notes/${note.id}`);
    };

    const updateTitle = (e) => setTitle(e.target.value);
    const updateBody = (e) => setBody(e.target.value);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title' >Title </label>
                <input
                    type='text'
                    className='title'
                    placeholder='Title of Note'
                    value={title}
                    onChange={updateTitle}
                />
                <label htmlFor='title' >Body </label>
                <textarea
                    type='text'
                    className='body'
                    placeholder='What do you want to write?'
                    value={body}
                    onChange={updateBody}
                />
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
};


export default NewNoteForm;
