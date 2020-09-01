import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade,Button } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
const config=require('dotenv').config();
const base=process.env.REACT_APP_REST_API_BASE;
class Cards extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
      
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
     
     
            <Card className="card-accent-info">
              <CardHeader>
               {this.props.pdfName}
              </CardHeader>
              <CardBody>
              <Card className="text-white bg-info text-center">
              <CardBody>
                <blockquote className="card-bodyquote">
                <header> <cite title="Description">Description</cite></header>
                 <p>{this.props.description}</p>
                </blockquote>
              </CardBody>
            </Card>
            <a href={"https://pdflibtest.s3.amazonaws.com/"+this.props.pdfID+".pdf"} color="info" >
                  <i className="fa fa-download "></i>&nbsp;Download PDF
                </a>
              </CardBody>
            </Card>
         
       
          
            
         
    );
  }
}

export default Cards;
