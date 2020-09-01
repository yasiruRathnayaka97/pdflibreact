import React, { Component } from 'react';
import { connect } from "react-redux";
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
const config=require('dotenv').config();
const base=process.env.REACT_APP_REST_API_BASE;
const moment = require('moment');
const mapStateToProps = state => {
  return { jwt: state.signReducer.jwt}
}
class Tables extends Component {

  constructor(props){
    super(props);
    this.getHistory=this.getHistory.bind(this);
    this.state={
      historyList:[]
    }
    this.getHistory=this.getHistory.bind(this)
   }
  async componentDidMount(){
    this.getHistory();

  }
  
  async getHistory(){
    var email=this.props.email;
    fetch(base+'/history/getHistory', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
         "jwt":this.props.jwt,
        })
       }
      ).then(res=>res.json()).then(json=>{
        if(json.historyList!=this.state.historyList){
          this.setState({
            historyList:json.historyList
          })
        }
      }
      );
     
  }

  
  render() {
    let historyList=this.state.historyList;
    return (
      <div className="animated fadeIn">
        <Row>
         
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> History
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Search</th>
                  </tr>
                  </thead>
                  <tbody>
            {historyList.reverse().map((value,index)=>{
                          return ( <tr id={value.dateTime}>
                            <td>{moment(value.dateTime).format('DD-MM-YYYY')}</td>
                            <td>{moment(value.dateTime).format('hh:mm:ss')}</td>
                            <td>{value.search}</td>
                          </tr>)})}   
                 
                  
                  </tbody>
                </Table>
                {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
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

 )(Tables);

