const initialState = {};

export default function(state=initialState, action){  
    switch(action.type){            
        case 'GET_ALL_POST_PENDING':
            return {...state, fetchingGetAllPost: true, error: null, fetchedGetAllPost: false};
        case 'GET_ALL_POST_REJECTED':
            return {...state, fetchingGetAllPost: false, error: action.payload.response && action.payload.response.data, post: null}
        case 'GET_ALL_POST_FULFILLED':            
            return {...state, fetchingGetAllPost: false, fetchedGetAllPost: true, post: action.payload.data};
            
        case 'GET_SINGLE_POST_PENDING':
            return {...state, fetchingGetSinglePost: true, error: null, fetchedGetSinglePost: false};
        case 'GET_SINGLE_POST_REJECTED':
            return {...state, fetchingGetSinglePost: false, error: action.payload.response && action.payload.response.data, singlePost: null}
        case 'GET_SINGLE_POST_FULFILLED':            
            return {...state, fetchingGetSinglePost: false, fetchedGetSinglePost: true, singlePost: action.payload.data};
        
        case 'RESET_SINGLE_POST':            
            return {...state, singlePost: null };     

        default:
            return state;
    }      
}