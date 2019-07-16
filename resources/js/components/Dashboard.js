import React from "react";
import { withStyles } from "@material-ui/core/";
import { compose } from "redux";
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import MainDashboard from './MainDashboard'
import Post from './Post'

class Dashboard extends React.Component {  

  componentDidUpdate(prevProps, prevState) {  
    //error handling
    if(this.props.errorDashboard && this.props.errorDashboard.message==="Unauthenticated."){
        alert('session expired, logging out');
        this.handleLogout();  
    }else if(this.props.errorDashboard==='ECONNABORTED'){
        alert('timeout reached, please refresh the window');
        // window.location.reload();
    }else if(this.props.errorDashboard===0 ){
        console.log('error code 0, please refresh the window')
    }  
  }

  handleLogout = () => {
    localStorage.removeItem('tokenKontinentalist');
    window.location=`/login`;
  }

  render(){    
    const { classes} = this.props;    
    return (
        <div>   
            <div className={classes.dividerTop}></div>
            <div className={classes.dividerTopSmall}></div>
            <div className={classes.container}>                                                                
                <div className={classes.navbar}>
                    <div className={classes.logo}><span style={{cursor: 'pointer'}} onClick={()=>{this.props.history.push('/')}} >Kontinentalist</span></div> 
                    <div className={classes.navbarLink} onClick={this.handleLogout}>Logout</div>
                </div>   

                <hr className={classes.divider}/>

                <Switch>                 
                    <Route exact path={`/`} component={MainDashboard} />      
                    <Route path={`/:id`} component={Post} />                                 
                </Switch>                                                                                                                   
                                    
            </div>                  
        </div>       
    )
    }
};

const styles = theme => ({
    container: {
        padding: '20px 16%',
        boxSizing: 'border-box',      
        "@media (max-width: 1622px)": {
            padding: '20px 8%',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '20px 20px',
        }  
    },  
    navbar: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    logo: {
        flex: 1,
        fontSize: 24       
    },
    navbarLink: {
        cursor: 'pointer',
        padding: '0 20px',
    },
    divider: {
        margin: '20px 0 5px 0',
        borderColor: 'rgba(0,0,0,0.12)',
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
})

function mapStateToProps(state) {
    return {            
        errorDashboard: state.dashboard.error,
    };
}

export default compose(
    withRouter,
    withStyles(styles),   
    connect(mapStateToProps)
)(Dashboard);
  