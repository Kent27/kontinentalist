import React from "react"
import TextField from "../shared/TextField"
export default ({input, label, meta: {touched, error}, ...custom}) => {
    return (
   <TextField error={touched && error?true:false} label={label} helperText={touched ? error : undefined} {...input} {...custom}/> 
)}