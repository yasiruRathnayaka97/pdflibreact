import React, { Component } from 'react';
import Tables from '../Base/TablesHistory/Tables';
import { connect } from "react-redux";
// import { searchAction} from "../../Actions";


// const mapDispatchToProps=(dispatch)=> {
//   return {
//     search: results => dispatch(searchAction(results))
//   };
// }
// const mapStateToProps = state => {
//   return { results: state.searchResult }
// }
class History extends Component {
  constructor(props) {
    super(props);
   
  }
  
  
  render() {
    return (
             
      <Tables/>
    );
  }
}

export default History;

