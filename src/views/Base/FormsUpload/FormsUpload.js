import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
const config=require('dotenv').config();
const base=process.env.REACT_APP_REST_API_BASE;

const mapStateToProps = state => {
  return { jwt:state.signReducer.jwt}
}
class FormsUpload extends Component {
  constructor(props) {
    super(props);
    this.state={
      file:null,
      pdfName:'',
      description:'',
      accessLevel:1,
      alert:""
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handlePDFNameChange=this.handlePDFNameChange.bind(this);
    this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
    this.handleAccessLevelChange=this.handleAccessLevelChange.bind(this);
    this.handlePDFFileChange=this.handlePDFFileChange.bind(this);
   
  }


  async handleSubmit(event) {
      event.preventDefault();
      var formData= new FormData();
      formData.append('pdf',this.state.file);
      formData.append('jwt',this.props.jwt);
      formData.append('pdfName',this.state.pdfName);
      formData.append('accessLevel',this.state.accessLevel);
      formData.append('description',this.state.description);
      fetch(base+'/PDF/upload', {
        method: 'post',
        body:formData
       }).then(res=>res.json()).then(json=>{
        if(json.status==true){  
           this.setState({alert:"uploaded"})
        }
        else{
         this.setState({alert:"Something wrong"})
        }
       }
      
   );
  
   }
   async handlePDFNameChange(event){
    this.setState({
      pdfName:event.target.value
    });

 }
 async handlePDFFileChange(event){
  this.setState({
    file:event.target.files[0]
  });

}
async handleAccessLevelChange(event){
  var accLev=1;
  if(event.target.value=="2"){
     accLev=2
  }
  this.setState({
    accessLevel:accLev
  });

}
 async handleDescriptionChange(event){
  this.setState({
    description:event.target.value
  });

}
  render() {
    return ( 
      
<Col xs="12" sm="12">
<Card>
  <CardHeader>
    <strong>PDF Upload</strong> Form
  </CardHeader>
  <CardBody>
    <Form className="was-validated">
     
      <FormGroup>
        <Label htmlFor="inputWarning2i"><strong>PDF Name</strong></Label>
        <Input type="text" className="form-control-warning" onChange={this.handlePDFNameChange} id="inputWarning2i" required />
        <FormFeedback className="help-block">PDF name not provided</FormFeedback>
        <FormFeedback valid className="help-block">PDF name provided</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="inputWarning2i"><strong>Select the PDF</strong> </Label>
        <Input type="file" className="form-control-warning" id="inputWarning2i" onChange={this.handlePDFFileChange} required  accept=".pdf"/>
        <FormFeedback className="help-block">PDF not selected</FormFeedback>
        <FormFeedback valid className="help-block">PDF selected</FormFeedback>
      </FormGroup>
      <FormGroup>
      <Label htmlFor="inputWarning2i"><strong>Select the PDF access level</strong> </Label>
      <Input type="select" className="form-control-warning" name="select" id="select" onChange={this.handleAccessLevelChange} required >
                        <option value="1">Private</option>
                        <option value="2">public</option>
                      
       </Input>
       <FormFeedback valid className="help-block">Private by default</FormFeedback>
                        
       </FormGroup>
       <FormGroup>
        <Label htmlFor="inputSuccess2i"><strong>Description</strong></Label>
        <Input type="textarea"  rows="1" className="form-control-success" onChange={this.handleDescriptionChange} id="inputSuccess2i" />
        <FormFeedback valid>Optional</FormFeedback>
      </FormGroup>

    </Form>
  </CardBody>
  <CardFooter>
    <Row>
    <Col className="mb-4">
    <Button aria-pressed="true" type="submit"  onClick={this.handleSubmit}  className="btn-pill btn btn-dark btn-block active"> Submit</Button>     
     </Col>
     </Row> 
     <Row>
     <Col className="mb-4">
    <span class="badge badge-info">{this.state.alert}</span>
     </Col>
     </Row>           
</CardFooter>
</Card>
</Col>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(FormsUpload);




