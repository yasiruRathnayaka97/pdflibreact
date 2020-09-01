import React, { Component } from 'react';
import Jumbotrons from '../Base/JumbotronsProfile/JumbotronsProfile';
import Cards from '../Base/CardsAccess/CardsAccess';
import { connect } from "react-redux";
import {
  Col,
  Row,
  Card,
  CardHeader
} from 'reactstrap';

const config=require('dotenv').config();
const base=process.env.REACT_APP_REST_API_BASE;

const mapStateToProps = state => {
   return { jwt:state.signReducer.jwt}

}
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      level_1Uploads:[],
      level_2Uploads:[]
    }
   this.getUploadsAndShares=this.getUploadsAndShares.bind(this);
  }
  
  componentDidMount(){ 
     this.getUploadsAndShares();

  }
  async getUploadsAndShares(){
    var email=this.props.email;
    fetch(base+'/Account/getUploadsAndShares',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "jwt":this.props.jwt,
        })
       }
      ).then(res=>res.json()).then(json=>{
       this.setState({
            level_1Uploads:json.level_1Uploads,
            level_2Uploads:json.level_2Uploads
          })
      }
      );
     
  }

  render() {
    var uploads=this.state.level_1Uploads;
    var shares=this.state.level_2Uploads;
    return (
   <div> 
      <Jumbotrons/> 
        <Card ><CardHeader> <i className="fa fa-align-justify"></i><strong>My Uploads</strong></CardHeader></Card>  
   <Row>
    {uploads.map((value,index)=>{
     return (<Col xs="12" md="6" key ={index}>< Cards pdfName={value.pdfName} description={value.description} pdfID={value.pdfID} /></Col>)})}
    </Row>
    <Card ><CardHeader> <i className="fa fa-align-justify"></i><strong>Shared with me</strong></CardHeader></Card>  
    <Row>
    {shares.map((value,index)=>{
     return (<Col xs="12" md="6" key ={index}><Cards pdfName={value.pdfName} description={value.description}  pdfID={value.pdfID} /></Col>)})}
    </Row>

       </div>   
       
      
    );
  }
}

export default connect(
  mapStateToProps,
  null

 )(Profile);


