import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllNotes, fetchDeleteNote } from "../../store/notesReducer";

const Note = () => {
    const [loaded, setLoaded] = useState(false);
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const allNotesObj = useSelector(state => state.notesReducer.userNotes);

    useEffect(() => {
        if (allNotesObj) {
            setLoaded(true);
        } else {
            const getUserNotes = async () => {
                await dispatch(fetchAllNotes(user.id))
                setLoaded(true);
            };

            getUserNotes();
        }
    }, [dispatch, allNotesObj, user]);

    if (!loaded) return null;

    const note = allNotesObj.notes[noteId]

    const handleClick = async (e) => {
        e.preventDefault();
        
        await dispatch(fetchDeleteNote(noteId));
        return history.push('/notes');
    };

    return (
        <>
            {note &&
                <div>
                    <div>
                        <h3>{note.title}</h3>
                        <small>{note.updatedAt}</small>
                    </div>
                    <div>
                        <p>{note.body}</p>
                    </div>
                </div>
            }
            <button
                className='btn delete-btn'
                onClick={handleClick}
            >
                Delete
            </button>
        </>
    );
};


export default Note;
