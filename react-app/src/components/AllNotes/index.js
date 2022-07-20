import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { fetchAllNotes } from "../../store/notesReducer";

const AllNotes = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const allNotesObj = useSelector(state => state.notesReducer.userNotes);

    useEffect(() => {
        const getUserNotes = async () => {
            await dispatch(fetchAllNotes(user.id));
            setLoaded(true);
        };

        getUserNotes();
    }, [dispatch, user]);

    if (!loaded) return null;

    const allNotes = Object.values(allNotesObj.notes);

    const displayNotes = allNotes.map((note) => (
        <li key={note.id}>
            <NavLink to={`/notes/${note.id}`}>
                {note.title}
            </NavLink>
        </li>
    ));

    return (
        <>
            <div>
                <Link
                    to='/notes/new'
                >
                    Create New Note
                </Link>
            </div>
            <div>
                <h1>All Notes</h1>
                <ul>{displayNotes}</ul>
            </div>
        </>
    );
};


export default AllNotes;
