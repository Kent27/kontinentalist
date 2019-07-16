import React from "react";
import { withStyles } from "@material-ui/core/";
import { compose } from "redux";
import { connect } from 'react-redux';
import { submit } from 'redux-form'
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom'
import MainDashboardTable from "./MainDashboardTable";
import { addPost, updatePost, deletePost, resetError } from "../actions/MainDashboardActions";
import { getAllPost } from "../actions/DashboardActions";
import AddPostForm from "./AddPostForm";
import EditPostForm from "./EditPostForm";

const maxData = 20;

class MainDashboard extends React.Component {  
  constructor(props){
      super(props);
      this.state = {
        open: false,
        openEdit: false,    
        openDelete: false,
        openedData: {},
        activePage: 0,
        category: '',
        anchorElMore: null,
        selectedIdMore: '0',  
        statusMore: false,
      }
  }

  componentDidUpdate(prevProps, prevState) {
    if( (this.props.fetched && !prevProps.fetched) && !this.props.error ){
        const options = {offset: this.state.activePage*20, sort: this.state.sort}
        this.props.dispatch(getAllPost(options));
        this.handleClose();
    }
  }

  handleSelectPost = (postId) => () =>{   
    this.props.history.push(`/${postId}`);       
  }

  handleSubmit = (data) => {   
    this.props.dispatch(addPost(data));  
  }

  handleSubmitEdit = (data) => {      
    this.props.dispatch(updatePost(data));      
  }

  handleSubmitDelete = () => {
   if(this.props.post.total -1 > 0){
        //if on the last page, -1 to current page 
        if(Math.ceil(this.props.post.total/maxData) === this.state.activePage+1 && this.props.post.total%maxData===1){
            this.setState({activePage: this.state.activePage - 1})
        }
    }         

    this.props.dispatch(deletePost(this.state.openedData));        
  }

  handleChange = (state, value) => {
      this.setState({[state]: value})
  }

  handleMore = (selectedIdMore, event)  => {
    this.setState({ anchorElMore: event.currentTarget, selectedIdMore });
  };

  handleOpen = (dialog, postId=null) => () => {      
    if(postId){
        const openedData = this.props.post.result.find((data) => {
            return data.id===postId;
        });
        this.setState({ [dialog]: true, openedData });
    }else{
        this.setState({ [dialog]: true });
    }     
  }

  handleClose = () => {
    this.props.dispatch(resetError());
    this.setState({ open:false, openEdit: false, openDelete: false, anchorElMore: null });
  }

  render(){   
    const { classes, error, fetching} = this.props;    
    return (                   
        <div className={classes.container}>  
            <Button style={{marginBottom: 30}} variant="contained" onClick={this.handleOpen('open')}>Add New Post</Button>                       
            <MainDashboardTable activePage={this.state.activePage}
                handleMore={this.handleMore} handleChange={this.handleChange} handleSelectPost={this.handleSelectPost}/>

            {/* More menu */}
            <Menu
                id="simple-menu"
                anchorEl={this.state.anchorElMore}
                open={Boolean(this.state.anchorElMore)}
                onClose={this.handleClose}
            >
                <MenuItem onClick={this.handleOpen('openEdit', this.state.selectedIdMore)}>Edit</MenuItem>               
                <MenuItem className={classes.red} onClick={this.handleOpen('openDelete', this.state.selectedIdMore)}>Delete</MenuItem>
            </Menu>

            {/* Add Dialog */}
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
                classes={{paper: classes.noOverflow}}
                fullWidth
            >
                <IconButton className={classes.closeWindowIcon} aria-label="Close" onClick={this.handleClose}>
                    <CloseIcon style={{width: 30, height: 30}}/>
                </IconButton>      
                <DialogTitle id="form-dialog-title">
                    <div className={classes.flex}>
                        <div className={classes.formTitle}>Create New Post</div>                       
                    </div>            
                </DialogTitle>
                <DialogContent classes={{root: classes.dialogContent}}>                                  
                    <AddPostForm onSubmit={this.handleSubmit}/>
                    <div className={error?classes.shownError:classes.hidden}>
                        {`Error: ${error && error.message}`}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button disabled={fetching && !error}  variant="contained" onClick={() => this.props.dispatch(submit('AddPostForm'))} >
                        <span>{fetching && !error?'Saving': 'Save'}</span>                    
                        
                    </Button>               
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                open={this.state.openEdit}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
                classes={{paper: classes.noOverflow}}
                fullWidth
                >
                <IconButton className={classes.closeWindowIcon} aria-label="Close" onClick={this.handleClose}>
                    <CloseIcon style={{width: 30, height: 30}}/>
                </IconButton>                                  
                <DialogTitle id="form-dialog-title">
                    <div className={classes.flex}>
                        <div className={classes.formTitle}>{this.state.openedData.title}</div>                       
                    </div>       
                </DialogTitle>
                <DialogContent classes={{root: classes.dialogContent}}>                                      
                    <EditPostForm onSubmit={this.handleSubmitEdit} data={this.state.openedData}/>
                    <div className={error?classes.shownError:classes.hidden}>
                        {`Error: ${error && error.message}`}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button disabled={fetching && !error}  variant="contained" onClick={() => this.props.dispatch(submit('EditPostForm'))} >
                        <span>{fetching && !error?'Saving': 'Save'}</span>                    
                        
                    </Button>                          
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog
                open={this.state.openDelete}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                classes={{paper: classes.noOverflow}}
                >
                <IconButton className={classes.closeWindowIcon} aria-label="Close" onClick={this.handleClose}>
                    <CloseIcon style={{width: 30, height: 30}}/>
                </IconButton>      
                <DialogTitle id="form-dialog-title">{this.state.openedData.title}</DialogTitle>
                <DialogContent classes={{root: classes.dialogContent}}>
                        <DialogContentText>Are you sure to delete this post?</DialogContentText>     
                        <div className={error?classes.shownError:classes.hidden}>
                        {`Error: ${error && error.message}`}
                    </div>                                      
                </DialogContent>
                <DialogActions>          
                    <form>                             
                    <Button disabled={fetching && !error}  variant="contained" onClick={this.handleSubmitDelete} >
                        <span>{fetching && !error?'Deleting': 'Delete'}</span>                    
                        
                    </Button>   
                    </form>               
                </DialogActions>
            </Dialog>
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
    }
})

function mapStateToProps(state) {
    return {       
        fetching: state.mainDashboard.fetching,
        fetched: state.mainDashboard.fetched,
        error: state.mainDashboard.error,

        post: state.dashboard.post,
    };
}

export default compose(
    withRouter,
    withStyles(styles),   
    connect(mapStateToProps)
)(MainDashboard);
  