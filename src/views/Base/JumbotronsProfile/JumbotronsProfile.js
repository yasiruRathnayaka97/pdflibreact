import React, { Component } from 'react';
import { Input,Button, Card, CardBody, CardHeader, Col, Container, Jumbotron, Row,Modal,ModalBody, ModalFooter,ModalHeader,} from 'reactstrap';
import { connect } from "react-redux";
const config=require('dotenv').config();
const base=process.env.REACT_APP_REST_API_BASE;
const mapStateToProps = state => {
  return { jwt:state.signReducer.jwt}
}
class JumbotronsProfile extends Component {
 
  constructor(props){
    super(props);
    this.state={
      info: false,
      profileInfo:{},
      description:''
    }
     this.toggleInfo = this.toggleInfo.bind(this);
     this.editProfileInfo =this.editProfileInfo.bind(this);
     this.getProfileInfo =this.getProfileInfo.bind(this);
     this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
  }
 
  async componentDidMount(){
    this.getProfileInfo();

  }
  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
  }
  handleDescriptionChange(event){
    event.preventDefault();
    this.setState({description:event.target.value})
  }
  async getProfileInfo(){
    var jwt=this.props.jwt;
    fetch(base+'/account/getProfileInfo/',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "jwt":this.props.jwt
        })
       }
      ).then(res=>res.json()).then(json=>{
        if(json.profileInfo!=this.state.profileInfo){
          this.setState({
            profileInfo:json.profileInfo
          })
        }
      }
      );
     
  }
  async editProfileInfo(){
  if(this.state.description!=""){
   fetch(base+'/account/setDescription/', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "jwt":this.props.jwt,
         "description":this.state.description
        })
       }).then(res=>res.json()).then(json=>{
        if(json.status==true){
           this.getProfileInfo();
           
        }
        else{
          alert("Something Wrong");
        }
       }
      
   );
     }
       this.toggleInfo();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Profile Information</strong>
                
              </CardHeader>
              <CardBody>
                <Jumbotron>
                  <h1 className="display-3">{this.state.profileInfo.userName}</h1>
                  <hr className="my-2" />
                  <h1 className="lead">{this.state.profileInfo.email}</h1>
                  <hr className="my-2" />
                  <p>{this.state.profileInfo.description}</p>
                  <p className="lead">
                    <Button onClick={this.toggleInfo} color="primary">Edit Profile Description</Button>
                    <Modal isOpen={this.state.info} toggle={this.toggleInfo}
                       className={'modal-info ' + this.props.className}>
                  <ModalHeader toggle={this.toggleInfo}>Profile Description</ModalHeader>
                  <ModalBody>
                     <Input value={this.state.description} onChange={this.handleDescriptionChange} type="textarea" name="textarea-input" id="textarea-input" rows="5"
                             placeholder="Description" />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.editProfileInfo}>Submit</Button>
                  </ModalFooter>
                </Modal>
                  </p>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col> 
        </Row>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null

 )(JumbotronsProfile);

