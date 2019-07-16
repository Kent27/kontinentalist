import axios from "axios";

  export function getAllPost(options={}) { 
    return dispatch => {
      dispatch({
        type: "GET_ALL_POST",    
        payload: axios.get(
          `${process.env.MIX_HOSTNAME}/api/posts`,                
          {
            params: options,
            headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('tokenKontinentalist')}`},        
          }        
        )   
      })                   
    }
  }

  export function getPost(id) { 
    return dispatch => {
      dispatch({
        type: "GET_SINGLE_POST",    
        payload: axios.get(
          `${process.env.MIX_HOSTNAME}/api/posts/${id}`,                
          {       
            headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('tokenKontinentalist')}`},        
          }        
        )   
      })                   
    }
  }

  export function resetSinglePost() { 
    return dispatch => {
      dispatch({
        type: "RESET_SINGLE_POST",     
      })
    }
  }

