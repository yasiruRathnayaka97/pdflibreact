import React, { Component } from "react";
import { connect } from "react-redux";
import { moreInfoAction } from "../../../Actions";
import io from 'socket.io-client';
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
const base=process.env.REACT_APP_REST_API_BASE
const socket = io('http://localhost:8080');
const mapDispatchToProps = dispatch => {
  return {
    toggleInfo: (field, id,pdfID,uploaderID, info) => dispatch(moreInfoAction(field, id,pdfID, uploaderID,info))
  };
};
const mapStateToProps = state => {
  return {
    id: state.moreInfoReducer.id,
    pdfID:state.moreInfoReducer.pdfID,
    uploaderID:state.moreInfoReducer.uploaderID,
    field:state.moreInfoReducer.field,
    info: state.moreInfoReducer.info,
    jwt:state.signReducer.jwt,
    loading:state.searchReducer.loading
  };
};
class ModalsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      id:null,   
      results:{
      }
    };
    this.process=this.process.bind(this);
    this.requestOrDownload=this.requestOrDownload.bind(this);
  }
async process(){
    fetch(base+'/searcher/getInfo',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "field": this.props.field,
         "id":this.props.id,
         "jwt":this.props.jwt

        
        })
       }).then(res=>res.json()).then(json=>{
       this.setState({
          results:json.results,
          id:this.props.id
       })
     }
       );
}


async requestOrDownload(jwt,uploaderID,pdfID,pdfName){
  if(this.state.results.status=="Request PDF"){
        socket.emit('pdf_requester',jwt,uploaderID,pdfID,pdfName);
  }

  this.props.toggleInfo(null, null,null,null, false);
}
  render() {
    if((this.props.field=='pdf'||this.props.field=='uploader') && (this.props.id!=this.state.id)){
      this.process();
    }
    
    if (this.props.field == "pdf" && this.state.results.status=="Request PDF") {
      return (
        <Modal
          isOpen={this.props.info}
          toggle={() => {
            this.props.toggleInfo(null,null,null,null, false);
          }}
          className={"modal-info " + this.props.className}
        >
          <ModalHeader
            toggle={() => {
              this.props.toggleInfo(null, null,null,null, false);
            }}
          >
            PDF Information
          </ModalHeader>
          <ModalBody>
            <h3>PDF Name:</h3>
            {this.state.results.pdfName}
            <hr className="my-2" />
            <h3>PDF description:</h3>
            {this.state.results.description}
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>this.requestOrDownload(this.props.jwt,this.props.uploaderID,this.props.pdfID,this.state.results.pdfName)} color="secondary">{this.state.results.status}</Button>
        
          </ModalFooter>
        </Modal>
      );
    } 
    else if (this.props.field == "pdf" && this.state.results.status=="Download PDF") {
      return (
        <Modal
          isOpen={this.props.info}
          toggle={() => {
            this.props.toggleInfo(null,null,null,null, false);
          }}
          className={"modal-info " + this.props.className}
        >
          <ModalHeader
            toggle={() => {
              this.props.toggleInfo(null, null,null,null, false);
            }}
          >
            PDF Information
          </ModalHeader>
          <ModalBody>
            <h3>PDF Name:</h3>
            {this.state.results.pdfName}
            <hr className="my-2" />
            <h3>PDF description:</h3>
            {this.state.results.description}
          </ModalBody>
          <ModalFooter>
            <a href={"https://pdflibtest.s3.amazonaws.com/"+this.props.pdfID+".pdf"} color="secondary">{this.state.results.status}</a>
          
          </ModalFooter>
        </Modal>
      );
    }else {
      return (
        <Modal
          isOpen={this.props.info}
          toggle={() => {
            this.props.toggleInfo(null, null, false);
          }}
          className={"modal-info " + this.props.className}
        >
          <ModalHeader
            toggle={() => {
              this.props.toggleInfo(null, null, false);
            }}
          >
            Uploader Information
          </ModalHeader>
          <ModalBody>
            <h3>Uploader Name:</h3>
            {this.state.results.userName}
            <hr className="my-2" />
            <h3>Uploader Description:</h3>
            {this.state.results.description}
            
          </ModalBody>
          <ModalFooter />
        </Modal>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalsSearch);
