import validate from 'validate.js'
import {constraints} from "./Constraint"

export default (values) => {                
    const validateResult = validate(values, constraints);//validate with validate.js
    const result = {}; 
   
    //get all constraint keys
    const constraintKeys = Object.keys(constraints);
   
    constraintKeys.forEach((key) => {       
        if (!validateResult[key]) {
            // put empty string, if validate gives no errror(undefined) for the key  
            result[key] = "";
        } else {
            // Turns the output value of error massages for eacch field into string instead of array             
            result[key] = validateResult[key][0];
        }
    });
    return result    
}
