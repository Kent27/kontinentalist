import React from "react";
import ReduxTextField from "./reduxForm/ReduxTextField";
import Grid from "@material-ui/core/Grid"
import {Field, reduxForm} from "redux-form"
import validateToString from "../utils/ValidatorToString"
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'


class AddPostForm extends React.Component {  
  render(){
    const { handleSubmit, error } = this.props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>                
                <Grid item xs={12}>
                    <Field fullWidth name="title" component={ReduxTextField} label="Title"/>
                    <div style={shownError}>
                        {error && error.code===100 && error.detail.title}
                    </div> 
                </Grid>  
                <Grid item xs={12}>
                    <Field multiline rows={8} fullWidth name="content" component={ReduxTextField} label="Content"/>
                    <div style={shownError}>
                        {error && error.code===100 && error.detail.content}
                    </div> 
                </Grid>                                                                                                            
            </Grid>
        </form>
    )
  }
};

const shownError = {
    display: 'block',
    color: '#f44336',
    // fontWeight: 100,
    fontSize: '0.75rem',
};

function mapStateToProps(state) {
    return {      
        error: state.mainDashboard.error
    };
}

export default reduxForm({
    form: "AddPostForm",
    validate: validateToString,    
})(connect(mapStateToProps)(AddPostForm))
