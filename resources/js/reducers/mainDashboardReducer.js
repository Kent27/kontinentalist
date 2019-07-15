const initialState = {};

export default function(state=initialState, action){  
    switch(action.type){                     
        case 'UPDATE_USER_PENDING':
            return {...state, fetching: true, fetched: false, error: null};
        case 'UPDATE_USER_REJECTED':
            return {...state, fetching: false, error: action.payload.response.data && action.payload.response.data}
        case 'UPDATE_USER_FULFILLED':            
            return {...state, fetching: false, fetched: true, error: null};

        default:
            return state;
    }      
}