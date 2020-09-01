import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader, Col, Row ,Button} from 'reactstrap';
import { connect } from "react-redux";
import { moreInfoAction } from "../../../Actions";

const mapDispatchToProps = dispatch => {
  return {
    moreInfo: (field,id, pdfID,uploaderID, info) => dispatch(moreInfoAction(field,id,pdfID,uploaderID, info))
  };
};

class AlertsSearch extends Component {
  constructor(props) {
    super(props);

   
  }

  render() {
  if (this.props.status == "primary") {
      return <Alert color="info">{this.props.content}</Alert>;
    } else {
      return (
        <Alert color="info">
          <h4 className="alert-heading">Match Heading</h4>
          <p>{this.props.heading}</p>
          <hr />
          <h4 className="alert-heading">Match Content</h4>
          <p>
            {this.props.content}
          </p>
          <hr />
          <h4 className="alert-heading">More</h4>
          <Row className="align-items-center">
            <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <Button
                onClick={() => {
                  this.props.moreInfo("pdf", this.props.pdfID,this.props.pdfID,this.props.email.email, true);
                }}
                block
                outline
                color="info"
              >
                PDF Information
              </Button>
            </Col>
            <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <Button
                onClick={() => {
                  this.props.moreInfo("uploader",this.props.email.email,this.props.pdfID,this.props.email.email, true);
               }}
                block
                outline
                color="info"
              >
                Uploader Information
              </Button>
            </Col>
          </Row>
        </Alert>
      );
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AlertsSearch);

