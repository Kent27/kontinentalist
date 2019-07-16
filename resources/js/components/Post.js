import React from "react";
import { withStyles } from "@material-ui/core/";
import { compose } from "redux";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getPost, resetSinglePost } from "../actions/DashboardActions";
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackIos';

class Post extends React.Component {  

  componentWillUnmount(){
    this.props.dispatch(resetSinglePost());
  }
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
  