import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes } from "../../store/notesReducer";

const Note = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const allNotesObj = useSelector(state => state.notesReducer.userNotes);
    
    const allNotes = Object.values(allNotesObj.notes);

    const displayNotes = allNotes.map(note => (
        <li key={note.id}>
            <div>
                <h3>{note.title}</h3>
                <p>{note.updatedAt}</p>
            </div>
            <div>
                <p>{note.body}</p>
            </div>
        </li>
    ));

    useEffect(() => {
        const get_user_notes = async () => {
            await dispatch(fetchAllNotes(user.id));
            setLoaded(true);
        };

        get_user_notes();
    }, [dispatch, user]);

    if (!loaded) return null;

    return(
        <div>
            <h1>Notes</h1>
            <ul>{displayNotes}</ul>
        </div>
    );
};


export default Note;
