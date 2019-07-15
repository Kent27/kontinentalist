import React from "react";
import ReduxTextFieldMui from "./reduxForm/ReduxTextFieldMui";
import Grid from "@material-ui/core/Grid"
import {Field, reduxForm, clearFields} from "redux-form"
import validateToString from "../utils/ValidatorToString"
import { withStyles } from "@material-ui/core/";

class LoginForm extends React.Component {  

  render(){
    const { handleSubmit, } = this.props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>                 
                <Grid item xs={12}>
                    <Field inputProps={{style: inputTextStyle}} fullWidth name="email" component={ReduxTextFieldMui} placeholder="Username" />
                </Grid>       
                <Grid item xs={12}>
                    <Field inputProps={{style: inputTextStyle}} fullWidth name="password" type="password" component={ReduxTextFieldMui} placeholder="Password" />
                </Grid>                                                         
            </Grid>
        </form>
    )
  }
};

const inputTextStyle = {
    letterSpacing: '1.5px',
}

const styles = theme => ({
    inputText: {
        letterSpacing: '2px',
    }
})


// const selector = formValueSelector('LoginForm')
const afterSubmit = (result, dispatch) => dispatch(clearFields('LoginForm', false, false, 'password'))
// dispatch(reset('LoginForm'));

export default reduxForm({
    form: "LoginForm",
    onSubmitSuccess: afterSubmit,
    validate: validateToString
})(withStyles(styles)(LoginForm))