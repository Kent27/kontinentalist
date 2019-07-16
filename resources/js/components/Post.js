import React from "react";
import { withStyles } from "@material-ui/core/";
import { compose } from "redux";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getPost } from "../actions/DashboardActions";
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackIos';

class Post extends React.Component {  

  componentDidMount(){
    this.props.dispatch(getPost(this.props.match.params.id));
  }
  handleToHome = () => {   
    this.props.history.push(`/`);       
  }

  render(){   
    const { classes, singlePost, error} = this.props;    
    return (                   
        <div className={classes.container}>      
            <IconButton classes={{root: classes.backIconButton}} aria-label="Back" onClick={this.handleToHome}>
                <BackIcon style={{width: 20, height: 20}}/>
                <span>Back</span>
            </IconButton>    
            {
                error && 
                <div>{error.message}</div>
            }  

            {
                singlePost &&
                <div>
                    <div className={classes.title}>{singlePost.title}</div>
                    <div>{singlePost.content}</div>
                    <div>{}</div>
                </div>
            }                      
            
        </div>                             
    )
  }
};

const styles = theme => ({
    container: {
       paddingTop: 30,
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
    bold: {
        fontWeight: 'bold',
    },
    button: {     
        marginBottom: 20,    
        boxShadow: 'unset',
        "&:active": {
          boxShadow: 'unset'
        },
      },
      gifLoader: {
        position: 'absolute',
        right: 10,
        top: 19,
    },
    formTitle: {
        flex: 1,
        fontSize: 25,
    },
    shownError: {
        display: 'block',
        color: '#f44336',
        fontWeight: 100,
    }, 
     hidden: {
         display: 'none',
     },    
      error: {
        color: '#f44336',
        fontSize: '0.75rem',
        margin: '10px auto',
      },
      footerImage: {
          opacity: .5,
      },
      successTitle: {
        marginBottom: 20,
      },
      noHover: {
          backgroundColor: '#EF9634',
          "&:hover": {
            backgroundColor: '#EF9634'
          },
      },
      red: {
        color: '#f04047'
    },
    noOverflow: {
        overflowY: 'unset',
    },
    closeWindowIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        cursor: 'pointer',
        padding: 6
    }, 
    dialogContent: {
        padding: '8px 24px 24px 24px'
    },
    backIconButton: {
        fontSize: 16
    }
})

function mapStateToProps(state) {
    return {      
        error: state.dashboard.error,
        singlePost: state.dashboard.singlePost,
    };
}

export default compose(
    withRouter,
    withStyles(styles),   
    connect(mapStateToProps)
)(Post);
  