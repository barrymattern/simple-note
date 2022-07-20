const GET_ALL_NOTES = 'notes/GET_ALL_NOTES';
const CREATE_NEW_NOTE = 'notes/CREATE_NEW_NOTES';

const getAllNotes = (notes) => ({
    type: GET_ALL_NOTES,
    payload: notes
});

const createNewNote = (noteData) => ({
    type: CREATE_NEW_NOTE,
    payload: noteData
});

export const fetchAllNotes = (userID) => async (dispatch) => {
    const response = await fetch(`/api/users/${userID}/notes`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllNotes(data));
    }
};

export const fetchNewNote = (title, body) => async (dispatch) => {
    const response = await fetch('/api/notes/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createNewNote(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTES:
            return { ...state, userNotes: action.payload };
        case CREATE_NEW_NOTE:
            return {/* !!!!!!!!!! DEFINE !!!!!!!!!! */}
        default:
            return state;
    }
};
