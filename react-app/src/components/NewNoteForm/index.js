import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewNoteForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('dispatch info!')
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
