import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Pagination from "./customTable/Pagination";
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import {withRouter} from 'react-router-dom'
import { getAllPost } from '../actions/DashboardActions';
import { connect } from 'react-redux';
import { compose } from "redux";

const maxData = 20;
class MainDashboardTable extends React.Component {             
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          pages: 1,
          loading: true
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if( (this.props.fetchingPost && !prevProps.fetchingPost) || (this.props.fetchingGetAllPost && !prevProps.fetchingGetAllPost) ){
            this.setState({loading: true});
        }
        if( (!this.props.fetchingPost && prevProps.fetchingPost) || (!this.props.fetchingGetAllPost && prevProps.fetchingGetAllPost) ){
            this.setState({loading: false});
        }
       
       if( (this.props.fetchedGetAllPost && !prevProps.fetchedGetAllPost) || (JSON.stringify(this.props.post)!==JSON.stringify(prevProps.post)) ){           
            this.setState({
                data: this.props.post?this.props.post.result:undefined,
                pages: this.props.post.total>0?Math.ceil(+this.props.post.total/maxData):1,
                loading: false
            });           
        }       
        
        //change page if parent component changes it
        if( (this.props.activePage !== prevProps.activePage) && this.props.activePage!==this.table.state.page){         
            this.table.state.page = this.props.activePage;
        }   
      }

    fetchData = (state, instance) => {
        this.setState({ loading: true });           
        
        const order = state.sorted[0] && state.sorted[0].desc?'-desc':'-asc';
        let sorted = state.sorted[0] && `${state.sorted[0].id}${order}`;   
        if(!sorted || sorted===undefined){
            sorted=this.props.category;
        }
        this.props.handleChange('sort', sorted);

        const options = {offset: state.page*20, sort: sorted}
        this.props.dispatch(getAllPost(options));                    
    }

    render(){    
        const { data, pages, loading } = this.state;
    
        return (  
            <div>               
                <ReactTable
                style={this.props.fetchingGetAllPost || (data && data.length>0)?{display:'flex', border: 'none'}:{display: 'none'}}
                ref={table=> this.table=table}
                manual
                data={data?data:[]}                   
                className="-highlight"            
                defaultPageSize={data && data.length<maxData?data.length:maxData}
                pages={pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                onFetchData={this.fetchData} // Request new data when things change                    
                resizable={false}                                
                columns={[    
                    {
                        Header: 'Author',
                        accessor: 'user_id',
                        Cell: props => <span title={props.value}>{props.original.user_name}</span>,          
                        style: centerPointerCell,                          
                        filterAll: true,                        
                        headerStyle: headerStyle             
                    },       
                    {
                        Header: 'Title',
                        accessor: 'title',
                        Cell: props => <span title={props.value}>{props.value}</span>,          
                        style: centerPointerCell,                          
                        filterAll: true,                        
                        headerStyle: headerStyle             
                    },   
                    {
                        Header: 'Content',
                        accessor: 'content',
                        Cell: props => <span>{props.value}</span>,          
                        style: centerPointerCell,                          
                        filterAll: true,                        
                        headerStyle: headerStyle             
                    },                                                            
                    {
                        Header: 'Date Created',
                        accessor: 'created_at',                       
                        Cell: props =>  <span>{ `${(new Date(props.value)).getDate()} ${month[(new Date(props.value)).getMonth()]} ${(new Date(props.value)).getFullYear()}` }</span>,                        
                        style: centerPointerCell,                          
                        filterAll: true,                        
                        headerStyle: headerStyle                
                    },     
                    {
                        Header: 'Last Modified',
                        accessor: 'updated_at',                 
                        Cell: props =>  <span>{ `${(new Date(props.value)).getDate()} ${month[(new Date(props.value)).getMonth()]} ${(new Date(props.value)).getFullYear()}` }</span>,                        
                        style: centerPointerCell,                          
                        filterAll: true,                        
                        headerStyle: headerStyle      
                    },                                                            
                    {     
                        Header: '',
                        accessor: 'id',
                        Cell: props => {return (                                                   
                            <IconButton style={smallPadding} aria-label="More" onClick={ event => {
                                this.props.handleMore(props.value, event)
                            }}>
                                <MoreHoriz style={{width: 35, height: 35}}/>
                            </IconButton>                                                                           
                        )},
                        style: actionCell,    
                        filterable: false,
                        sortable: false,
                        headerStyle: headerStyle,
                        width: 75,
                    }
                ]}          
                PaginationComponent = {Pagination}                       
                getTdProps={(state, rowInfo, column, instance) => {
                    return {
                        onClick: (e, handleOriginal) => {                       
                        // IMPORTANT! React-Table uses onClick internally to trigger
                        // events like expanding SubComponents and pivots.
                        // By default a custom 'onClick' handler will override this functionality.
                        // If you want to fire the original onClick handler, call the
                        // 'handleOriginal' function.
                        if (handleOriginal && column.id==='id') {                            
                            handleOriginal();
                        }else if(handleOriginal){
                            handleOriginal();
                            this.props.handleSelectPost(rowInfo.row.id)();
                        }
                        }
                    };
                }}
                getTrGroupProps={(state, rowInfo, column, instance) => {
                    return {
                    style: {
                        border: 'none',
                    }              
                    };
                }}  
                getTheadProps={(state, rowInfo, column, instance) => {
                    return {
                    style: {
                        boxShadow: 'unset',
                    }              
                    };
                }}  
                onPageChange={(pageIndex) => {                  
                    this.props.handleChange('activePage', pageIndex);                 
                 }}       
                /> 
            
                {
                    this.props.post && this.props.post.total==='0' || (!this.props.fetchingGetAllPost && (!data || data.length===0))?
                    <div style={emptyData}>No Records Found</div>
                    :
                    null
                }   
            
            </div>                                         
        )
    }    
}

const actionCell = {    
    whiteSpace: 'normal',
    textAlign: 'center',
    // opacity: 0
}
// const buttonAction = {    
//     margin: '5px',
//     opacity: '1'
// }

const centerPointerCell = {
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: 16.82,
    fontWeight: 100,
    border: 'none',
    margin: 'auto',
}

const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 900,
    border: 'none'
}

const smallPadding = {
    padding: 6,
}

const emptyData={
    textAlign: 'center',
    marginTop: 60,
}

const month = [];
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

function mapStateToProps(state) {
    return {     
        fetchingPost: state.mainDashboard.fetching,        

        fetchedGetAllPost: state.dashboard.fetchedGetAllPost,        
        fetchingGetAllPost: state.dashboard.fetchingGetAllPost,       
        post: state.dashboard.post,       
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(MainDashboardTable);
  