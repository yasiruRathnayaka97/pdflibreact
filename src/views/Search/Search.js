import React, { Component } from 'react';
import Alert from '../Base/AlertsSearch/AlertsSearch';
import Forms from '../Base/FormsSearch/FormsSearch';
import Modals from "../Base/ModalsSearch/ModalsSearch";
import { connect } from "react-redux";
import io from 'socket.io-client';
import { searchAction } from "../../Actions";
import {
  Col,
  Row,
} from 'reactstrap';
const config=require('dotenv').config();
const base=process.env.REACT_APP_REST_API_BASE;
var parse = require('html-react-parser');

const mapStateToProps = state => {
  return { s: state.searchReducer.search ,
      status:state.searchReducer.status ,
      loading:state.searchReducer.loading,
      jwt:state.signReducer.jwt}
}
const mapDispatchToProps=(dispatch)=> {
  return {
    search: (search,status,loading) => dispatch(searchAction(search,status,loading))
  };
}
class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
      search:'',
      status:'',
      results:[]
    }
    this.search=this.search.bind(this);
   
  }
   
    
  async search(){
    if (this.props.search!='' ){
       fetch(base+'/searcher/search',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "search": this.props.s,
         "jwt":this.props.jwt,
         "status":this.props.status
        
        })
       }).then(res=>res.json()).then(json=>{
       this.setState({
        search:this.props.s,
        results:json.results,
        status:this.props.status,
       })

     }
       )
       
    }
    else{
      this.setState({
        search:'',
        results : [],
        status:''
       })
    }
 this.props.search(this.props.s,this.props.status,false);
       
  }
  render() {
    if(this.props.s!=this.state.search && this.props.loading==true || this.props.status!=this.state.status && this.props.loading==true ){
      this.search();
    }
 
    return (
      <div className="animated fadeIn">
          <Col  xs="12" md="12">
            <Forms/>  
         <Row>
            {this.state.results.map((value,index)=>{
              var sentence=value.sentence.replace(/[^\x20-\x7E]/g,' ')
              return (<Col xs="12" md="6" key ={index}><Alert content={parse(sentence)} heading={value.heading||''} status={this.props.status||''} email={value.email||''} pdfID={value.pdfID||''}/></Col>)})}
         </Row>
        
          </Col>
            <Modals />
      </div>
      
    );
  
}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

