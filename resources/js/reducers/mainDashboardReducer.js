const initialState = {};

export default function(state=initialState, action){  
    switch(action.type){                  
        case 'ADD_POST_PENDING':
            return {...state, fetching: true, fetched: false, error: null};
        case 'ADD_POST_REJECTED':
            return {...state, fetching: false, error: action.payload.response.data && action.payload.response.data}
        case 'ADD_POST_FULFILLED':            
            return {...state, fetching: false, fetched: true, error: null};

        case 'UPDATE_POST_PENDING':
            return {...state, fetching: true, fetched: false, error: null};
        case 'UPDATE_POST_REJECTED':
            return {...state, fetching: false, error: action.payload.response.data && action.payload.response.data}
        case 'UPDATE_POST_FULFILLED':            
            return {...state, fetching: false, fetched: true, error: null};   

        case 'DELETE_POST_PENDING':
            return {...state, fetching: true, fetched: false, error: null};
        case 'DELETE_POST_REJECTED':
            return {...state, fetching: false, error: action.payload.response.data && action.payload.response.data}
        case 'DELETE_POST_FULFILLED':            
            return {...state, fetching: false, fetched: true, error: null};

        case 'RESET_ERROR_MAIN_DASHBOARD':            
            return {...state, error: null };     
        default:
            return state;
    }      
}