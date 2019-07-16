import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'
// import Checkbox from '@material-ui/core/Checkbox';
// import Button from '@material-ui/core/Button';
// import matchSorter from 'match-sorter'
import Pagination from "./customTable/Pagination";
// import ThComponent from "../../components/customTable/ThComponent";
// import ActionCell from "./ActionCell";
import MoreHoriz from '@material-ui/icons/MoreHoriz';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
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
            // if(this.props.reset && !prevProps.reset){            
            //     if(this.props.category){
            //         const sortId = this.props.category.substring(0, this.props.category.indexOf('-'));
            //         const sortDescOri = this.props.category.substring(this.props.category.indexOf('-'));
            //         const sortDesc = sortDescOri==='-desc'?true:false;
            //         this.table.state.sorted=[{id: sortId, desc: sortDesc}];
            //     }                
            //     this.table.state.page=0;                     
            // } 
            this.setState({
                data: this.props.post?this.props.post.result:undefined,
                pages: this.props.post.total>0?Math.ceil(+this.props.post.total/maxData):1,
                loading: false
            });
           
        }              
      }

    fetchData = (state, instance) => {
      
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({ loading: true });
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
      
        const order = state.sorted[0] && state.sorted[0].desc?'-desc':'-asc';
        let sorted = state.sorted[0] && `${state.sorted[0].id}${order}`;   
    
        if(!sorted || sorted===undefined){
            sorted=this.props.category;
        }

        // this.props.handleChange('category', sorted);//set state category
        // if(this.props.selectedCollectionId){
        //     this.props.dispatch((getCollection(this.props.selectedCollectionId)));
        // }else{
            const options = {offset: state.page*20/*, sort: sorted, q: this.props.searchKeyword*/}
            this.props.dispatch(getAllPost(options));        
        // }              
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
                // filterable= {true}    
                // defaultFilterMethod= {(filter, row, column) => {                   
                //     return matchSorter(row, filter.value, { keys: [filter.id] })
                // }}          
                resizable={false}                                
                columns={[    
                    {
                        Header: 'Author',
                        accessor: 'user_name',
                        Cell: props => <span title={props.value}>{props.value}</span>,          
                        style: centerPointerCell,                          
                        filterAll: true,
                        sortable: false,
                        headerStyle: headerStyle             
                    },       
                    {
                        Header: 'Title',
                        accessor: 'title',
                        Cell: props => <span title={props.value}>{props.value}</span>,          
                        style: centerPointerCell,                          
                        filterAll: true,
                        sortable: false,
                        headerStyle: headerStyle             
                    },   
                    {
                        Header: 'Content',
                        accessor: 'content',
                        Cell: props => <span>{props.value}</span>,          
                        style: centerPointerCell,                          
                        filterAll: true,
                        sortable: false,
                        headerStyle: headerStyle             
                    },                                                            
                    {
                        Header: 'Date Created',
                        accessor: 'created_at',                       
                        Cell: props =>  <span>{ `${(new Date(props.value)).getDate()} ${month[(new Date(props.value)).getMonth()]} ${(new Date(props.value)).getFullYear()}` }</span>,                        
                        style: centerPointerCell,                          
                        filterAll: true,
                        sortable: false,
                        headerStyle: headerStyle                
                    },     
                    {
                        Header: 'Last Modified',
                        accessor: 'updated_at',                 
                        Cell: props =>  <span>{ `${(new Date(props.value)).getDate()} ${month[(new Date(props.value)).getMonth()]} ${(new Date(props.value)).getFullYear()}` }</span>,                        
                        style: centerPointerCell,                          
                        filterAll: true,
                        sortable: false,
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
                // ThComponent = {ThComponent}            
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
  