import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import { connect } from "react-redux";
import { signInAction } from "../../../Actions";
const config=require('dotenv').config();

const base=process.env.REACT_APP_REST_API_BASE;


// const mapDispatchToProps=(dispatch)=> {
//   return {
//     onLogIn: jwt => dispatch(signInAction(email))
//   };
// }
const mapStateToProps = state => {
  return { 
    status:state.signReducer.status }
}
class Register extends Component {

  constructor(props){
   
    super(props);
    this.state={
      userName:"",
      password:"",
      repeatPassword:"",
      email:"",
      success:false,
      alert:""

    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleUserNameChange=this.handleUserNameChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.handlePasswordChange=this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange=this.handleRepeatPasswordChange.bind(this);
  }
  
  async handleSubmit(event) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(this.state.email).toLowerCase())){
      this.setState({
          alert:"Wrong email"
        });
    }
    else if(this.state.password.length<8){
        this.setState({
          alert:"Atleast 8 characters required"
        });
        
    }
    
     else if(this.state.password==this.state.repeatPassword){
      fetch(base+'/account/signup', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "userName": this.state.userName,
         "password": this.state.password,
         "email":this.state.email
        })
       }).then(res=>res.json()).then(json=>{
        if(json.status==true){
           this.setState({
            success:true
           })

        }
        else{
          this.setState({
              alert:"Account already have"
        });
        }
       }
      
   );
       
     }
     else{
      this.setState({
          alert:"password not equal to repeat password"
        });
        return
     }
    
    }
  
  handleUserNameChange(event){
    event.preventDefault();
    this.setState({userName:event.target.value})
  }
  handlePasswordChange(event){
    event.preventDefault();
    this.setState({password:event.target.value})
  }
  handleRepeatPasswordChange(event){
    event.preventDefault();
    this.setState({repeatPassword:event.target.value})
  }
  handleEmailChange(event){
    event.preventDefault();
    this.setState({email:event.target.value})
  }
  render() {
     if(this.state.success){
        return <Redirect to={{pathname: '/'}} />
    }
    return (

      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required='required' value={this.state.userName} onChange={this.handleUserNameChange} type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input required='required' value={this.state.email} onChange={this.handleEmailChange} type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required='required' value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input required='required' value={this.state.repeatPassword} onChange={this.handleRepeatPasswordChange} type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button type='submit' color="success" block>Create Account</Button>
                  </Form>
                   <span class="badge badge-danger">{this.state.alert}</span>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  null
)(Register);

