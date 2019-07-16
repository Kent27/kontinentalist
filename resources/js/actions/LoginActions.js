import axios from "axios";

  export function login(data) { 
    return dispatch => {      
        dispatch({
          type: "LOGIN",    
          payload: axios.post(
            `${process.env.MIX_HOSTNAME}/api/login`,           
            data,
            {
              headers: {'content-type': 'application/json'},        
            }        
          )
        })   
                      
    }
  }