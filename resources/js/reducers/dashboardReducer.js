const initialState = {};

export default function(state=initialState, action){  
    switch(action.type){            
        case 'GET_ALL_USER_PENDING':
            return {...state, fetchingGetAllUser: true, fetchedGetAllUser: false};
        case 'GET_ALL_USER_REJECTED':
            return {...state, fetchingGetAllUser: false, error: action.payload.response && action.payload.response.data, user: null, userTotal: null,}
        case 'GET_ALL_USER_FULFILLED':            
            return {...state, fetchingGetAllUser: false, fetchedGetAllUser: true, user: action.payload.data.data, userTotal: action.payload.data.total};

        default:
            return state;
    }      
}