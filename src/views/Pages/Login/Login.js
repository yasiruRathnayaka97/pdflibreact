import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { signInAction } from "../../../Actions";
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import io from 'socket.io-client';
const socket = io('ws://localhost:8080');
const config=require('dotenv').config();
const base=process.env.REACT_APP_REST_API_BASE;


const mapDispatchToProps=(dispatch)=> {
  return {
    onLogIn: (jwt,email) => dispatch(signInAction(jwt,email))
  };
}
const mapStateToProps = state => {
  return { jwt:state.signReducer.jwt,
    email:state.signReducer.email,
    status:state.signReducer.status  }
}
class Login extends Component {
  constructor(props){
   
    super(props);
    this.state={
      password:"",
      email:"",
      alert:""
    }
    
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
    this.handlePasswordChange=this.handlePasswordChange.bind(this);
    
  }
  
 
  async handleSubmit(event) {
    event.preventDefault();
     var res=await fetch(base+'/account/signin', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "password": this.state.password,
         "email":this.state.email
        })
       }).then(res=>res.json()).then(json=>{
        if(json.message=="Wrong Credentials"){
           this.setState({alert:"Wrong Credentials"})
              
        }
        else{
        socket.send(this.state.email);
        this.props.onLogIn(json.message,this.state.email);
        }
       }
      
   );
       
    }
  

  handlePasswordChange(event){
    this.setState({password:event.target.value})
  }
  
  handleEmailChange(event){
    event.preventDefault();
    this.setState({email:event.target.value})
  }
  render() {
    if(this.props.status){
        return <Redirect to={{pathname: '/'}} />
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
              
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input  required='required' value={this.state.email} onChange={this.handleEmailChange} type="text" placeholder="Email" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input  required='required' value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                      <span class="badge badge-danger">{this.state.alert}</span>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Join us with today to explore the world largest PDF-Library.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
