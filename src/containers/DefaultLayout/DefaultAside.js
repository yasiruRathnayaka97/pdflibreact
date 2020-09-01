  import React, { Component } from "react";
import io from 'socket.io-client';
import {
  Nav,
  NavItem,
  NavLink,
  Progress,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppSwitch } from "@coreui/react";
import { connect } from "react-redux";
import { signOutAction,notificationAddAction } from "../../Actions";
const socket = io('ws://localhost:8080');
const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};
const mapStateToProps = state => {
  return { notifications:state.notificationReducer.notifications,
          count:state.notificationReducer.count,
           jwt:state.signReducer.jwt}
}
const mapDispatchToProps = dispatch => {
  return {
    notificationAdd:(count,notifications)=>dispatch(notificationAddAction(count,notifications))
  };
};
class DefaultAside extends Component {
  constructor(props) {
    super(props);

    this.accept=this.accept.bind(this);
    this.reject=this.reject.bind(this);
    this.toggle =this.toggle.bind(this);
    this.state = {
      activeTab: "1",
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


 accept(sender,pdfID,index){
      var n=this.props.notifications;
      n.splice(index,1);
      this.props.notificationAdd( this.props.count-1,n);
      socket.emit("notification_response","accept",this.props.jwt,sender,pdfID);
 }
 reject(sender,pdfID,index){
      var n=this.props.notifications;
      n.splice(index,1);
      this.props.notificationAdd( this.props.count-1,n);
      socket.emit("notification_response","reject",this.props.jwt,sender,pdfID);
 }
 
  render() {
    // eslint-disable-next-line
 
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <i className="icon-bubbles" />
            </NavLink>
          </NavItem>
          
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ListGroup className="list-group-accent" tag={"div"}>
              {/* <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
                
              </ListGroupItem> */}
              {this.props.notifications.map((value, index) => {
                return (
                  <ListGroupItem
                    action
                    className="list-group-item-accent-info list-group-item-divider"
                  >
                    <div className="avatar float-right">
                      <img
                        className="img-avatar"
                        src="assets/img/avatars/person.png"
                        alt="profile_image"
                      />
                    </div>
                    <div>
                     <strong>Requester email: </strong>
                      <small>{value.result.sender}</small>
                    </div>
                    <div>
                      <strong>Requested PDF: </strong>
                      <small>{value.pdf.pdfName}</small>
                    </div>
                    <div>
                      <Row>
                        <Col>
                          <Button block outline color="info" onClick={()=>{this.accept(value.result.sender,value.result.message,index)}}>
                            Accept
                          </Button>
                        </Col>
                        <Col>
                          <Button block outline color="info"  onClick={()=>{this.reject(value.result.sender,value.result.message,index)}}>
                            Reject
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </TabPane>
           
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultAside);
