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
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const fetchNewNote = (user_id, title, body) => async (dispatch) => {
    const response = await fetch('/api/notes/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, title, body })
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

const updateStateArr = (state, newId) => {
    state.push(newId);
    return state;
};

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTES:
            return { ...state, userNotes: action.payload };
        case CREATE_NEW_NOTE:
            return {
                ...state,
                userNotes: {
                    all_note_ids: updateStateArr(
                        state.userNotes.all_note_ids, action.payload.id
                    ),
                    notes: {
                        ...state.userNotes.notes,
                        [action.payload.id]: action.payload
                    }
                }
            }
        default:
            return state;
    }
};
