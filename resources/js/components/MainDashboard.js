import React from "react";
import { withStyles } from "@material-ui/core/";
import { compose } from "redux";
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom'
// import MainDashboardTable from "./MainDashboardTable";
// import { updateUser } from "../../actions/MainDashboardActions";
import { getAllUser } from "../../actions/DashboardActions";

class MainDashboard extends React.Component {  
  constructor(props){
      super(props);
      this.state = {
          activePage: 0,
      }
  }

  componentDidMount(){
    
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.fetched && !prevProps.fetched){
        const options = {offset: this.state.activePage*20}
        // this.props.dispatch(getAllUser(options));
    }
  }
    
//   handleToggleEnabled = (data) => () => {
//     // this.props.dispatch(updateUser(data));
//   }

//   handleChange = (state, value) => {
//       this.setState({[state]: value})
//   }

  render(){   
    const { classes} = this.props;    
    return (                   
        <div className={classes.container}>                     
            Main Dashboard
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
        // fontSize: 16,  
        // width: 153.201,
        // height: 35,  
        // margin: '20px auto',
        // display: 'block',
        // letterSpacing: '1.5px',
        // padding: '16px 32px',
        // background: '#EF9634',  
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
      }
})

function mapStateToProps(state) {
    return {       
        fetching: state.mainDashboard.fetching,
        fetched: state.mainDashboard.fetched,
        error: state.mainDashboard.error,
    };
}

export default compose(
    withRouter,
    withStyles(styles),   
    connect(mapStateToProps)
)(MainDashboard);
  