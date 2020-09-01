import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from 'socket.io-client';
import { signOutAction,notificationAddAction } from "../../Actions";
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/img/brand/logo_pdf_library.svg";
import sygnet from "../../assets/img/brand/sygnet_pdf_library.svg";
const base=process.env.REACT_APP_REST_API_BASE;
const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};
const mapStateToProps = state => {
  return { count:state.notificationReducer.count,
          notifications:state.notificationReducer.notifications,
           jwt:state.signReducer.jwt,
           email:state.signReducer.email
         }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(signOutAction()),
    notificationAdd:(count,notifications)=>dispatch(notificationAddAction(count,notifications))
  };
};
class DefaultHeader extends Component {


  constructor(props){
        super(props);
        this.logOut=this.logOut.bind(this);
        this.getNotifiactions=this.getNotifiactions.bind(this);
        this.socket = io('http://localhost:8080');
    }


  logOut(e){
      this.props.onLogout(e);

  }
  getNotifiactions(){
    fetch(base+'/searcher/getNotifications',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "jwt":this.props.jwt,
        
        })
       }).then(res=>res.json()).then(json=>{
        var count=json.results.length;
        this.props.notificationAdd(count,json.results);
                

     }
       )
  }
  componentDidMount(){
    this.getNotifiactions();
    this.socket.on('pdf_uploader', (email,uploaderID,pdfID,pdfName)=>{ 
      if(uploaderID==this.props.email){
        var n=[{
          result:{
            sender:email,
            message:pdfID
          },
          pdf:{
              pdfName:pdfName
          }
        }].concat(this.props.notifications);
          this.props.notificationAdd(this.props.count+1,n);
      }
      });   
    }
  

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: "PDF LIBRARY" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "PDF LIBRARY" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        
        <Nav className="ml-auto" navbar>
          
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img
                src={"../../assets/img/avatars/person.png"}
                className="img-avatar"
                alt="profile picture"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-envelope-o" /> Notifications
                <Badge color="success">{this.props.count}</Badge>
              </DropdownItem>
              
              <DropdownItem onClick={e =>this.logOut(e)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultHeader);
