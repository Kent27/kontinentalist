import axios from "axios";

export function addPost(data) {    
  return dispatch => {             
      dispatch({
        type: "ADD_POST",    
        payload: axios.post(
          `${process.env.MIX_HOSTNAME}/api/posts`,   
          data,                 
          {
            headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('tokenKontinentalist')}`},        
          }        
        )
      })                         
  }
}

  export function updatePost(data) {    
    return dispatch => {             
        dispatch({
          type: "UPDATE_POST",    
          payload: axios.patch(
            `${process.env.MIX_HOSTNAME}/api/posts/${data.id}`,   
            data,                 
            {
              headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('tokenKontinentalist')}`},        
            }        
          )
        })                         
    }
  }

  export function deletePost(data) {    
    return dispatch => {             
        dispatch({
          type: "DELETE_POST",    
          payload: axios.delete(
            `${process.env.MIX_HOSTNAME}/api/posts/${data.id}`,                              
            {
              headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('tokenKontinentalist')}`},        
            }        
          )
        })                         
    }
  }

  export function resetError() { 
    return dispatch => {
      dispatch({
        type: "RESET_ERROR_MAIN_DASHBOARD",     
      })
    }
  }