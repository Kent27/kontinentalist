const initialState = {};

export default function(state=initialState, action){  
    switch(action.type){                      
        case 'SIGN_IN_PENDING':
            return {...state, fetching: true, fetched: false, error: null};
        case 'SIGN_IN_REJECTED':
            return {...state, fetching: false, error: action.payload.response.data && action.payload.response.data, user: null}
        case 'SIGN_IN_FULFILLED':            
            return {...state, fetching: false, fetched: true, user: action.payload.data, error: null};

        default:
            return state;
    }      
}