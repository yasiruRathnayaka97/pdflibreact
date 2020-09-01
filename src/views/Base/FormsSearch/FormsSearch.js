import React, { Component } from 'react';
import { connect } from "react-redux";
import { searchAction } from "../../../Actions";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
const config=require('dotenv').config();
const base=process.env.REACT_APP_REST_API_BASE;

const mapDispatchToProps=(dispatch)=> {
  return {
    search: (search,status,loading) => dispatch(searchAction(search,status,loading))
  };
}
const mapStateToProps = state => {
  return { s: state.searchReducer.search ,
      status:state.searchReducer.status ,
      loading:state.searchReducer.loading,
      jwt:state.signReducer.jwt}
}
class FormsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:""
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleSearchChange=this.handleSearchChange.bind(this);
    
   
  }

  async handleSubmit(event) {
    event.preventDefault();
     // this.setState({
     //    search:event.target.value
     //  });
    this.props.search(this.state.search,"advance",true);
   }
   


   async handleSearchChange(event){
     event.preventDefault();
      this.setState({
        search:event.target.value
      });
      if(this.props.loading==false){
        this.props.search(event.target.value,"primary",true);
     }
   
   }
 
  render() {
    return ( 
      <Card>
      <CardHeader>
        <strong>Search</strong> 
      </CardHeader>
      <CardBody>
        <Form className="form-horizontal" >
          <FormGroup row>
            <Col md="12">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button onClick={this.handleSubmit} type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                </InputGroupAddon>
                <Input onChange={this.handleSearchChange} type="text" id="input1-group2" name="input1-group2" placeholder="What you want to search?" />
              </InputGroup>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
    
      
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormsSearch);

