import React from "react";
import { withStyles } from "@material-ui/core/";
import { compose } from "redux";
import { connect } from 'react-redux';
import { login } from '../actions/LoginActions';
import Button from "@material-ui/core/Button";
import LoginForm from './LoginForm';
import { withRouter } from 'react-router-dom'
import { submit } from 'redux-form'

class Login extends React.Component {  
  componentDidUpdate(prevProps, prevState) {
      if(this.props.fetched && !prevProps.fetched){
        localStorage.setItem("tokenKontinentalist", this.props.user.access_token);
        this.props.history.push("");
      }
  }

  handleSubmit = (data) => {    
    this.props.dispatch(login(data));
  }

  render(){   
    const { classes, fetching, error } = this.props;    
    return (
        <div className={classes.centerContainer}>   
            <div className={classes.dividerTop}></div>
            <div className={classes.dividerTopSmall}></div>
            <div className={classes.container}>               
                                         
                <div className={classes.title}>Dashboard Log In</div>                                                                                                                       
                                    
                <LoginForm onSubmit={this.handleSubmit} />                                                                                                                             
               
                <div>
                    <Button classes={{contained: classes.noHover}} disabled={fetching && !error} className={classes.button} variant="contained" onClick={() => this.props.dispatch(submit('LoginForm'))}>
                        <span>{fetching && !error?'Logging In': 'Log In'}</span>                                          
                    </Button>     
                    <div>
                    {
                        !fetching && error &&                                  
                        <div className={classes.error}>{`Error: ${error.status || error.message}`}</div>    
                    }
                    </div>  
                </div>
            </div>                  
        </div>       
    )
    }
};

const styles = theme => ({
    container: {
        padding: '20px 16%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 60px)',
        "@media (max-width: 1622px)": {
            padding: '20px 8%',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '20px 20px',
        }  
    },  
    title: {
        fontSize: 20,
        padding: '20px 0px',
    },
    dividerTop: {
        borderBottom: '24px solid #EF9634',
        paddingTop: 30,
        marginBottom: 3,
    },    
    dividerTopSmall: {
        borderBottom: '3px solid #EF9634',
        // marginTop: 30,
    }, 
    centerContainer: {
        textAlign: 'center',
        boxSizing: 'border-box',
        // minHeight: '100vh',
    },    
    button: {
        fontSize: 16,  
        // width: 153.201,
        // height: 35,  
        margin: '20px auto',
        display: 'block',
        letterSpacing: '1.5px',
        padding: '16px 32px',
        background: '#EF9634',      
        boxShadow: 'unset',
        "&:active": {
          boxShadow: 'unset'
        },
      },     
      error: {
        color: '#f44336',
        fontSize: '0.75rem',
        margin: '10px auto',
      },   
      noHover: {
          backgroundColor: '#EF9634',
          "&:hover": {
            backgroundColor: '#EF9634'
          },
      }
})

function mapStateToProps(state) {
    return {       
        fetching: state.login.fetching,
        fetched: state.login.fetched,
        error: state.login.error,
        user: state.login.user,
    };
}

export default compose(
    withRouter,
    withStyles(styles),   
    connect(mapStateToProps)
)(Login);
  