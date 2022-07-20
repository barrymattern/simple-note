const GET_ALL_NOTES = 'notes/GET_ALL_NOTES';

const getAllNotes = (notes) => ({
    type: GET_ALL_NOTES,
    payload: notes
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

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTES:
            return { ...state, notes: action.payload };
        default:
            return state;
    }
};
