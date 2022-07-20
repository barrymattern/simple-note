import React, { useState } from "react";

const NewNoteForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

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
