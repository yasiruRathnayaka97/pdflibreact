import React, { Component } from 'react';
import Forms from '../Base/FormsUpload/FormsUpload';
import { connect } from "react-redux";
// import { searchAction} from "../../Actions";

const config=require('dotenv').config();
const base=process.env.REACT_APP_REST_API_BASE;

// const mapDispatchToProps=(dispatch)=> {
//   return {
//     search: results => dispatch(searchAction(results))
//   };
// }
// const mapStateToProps = state => {
//   return { results: state.searchResult }
// }
class Upload extends Component {
  constructor(props) {
    super(props);
   
  }
  
    
  render() {
    return (
            <Forms/>  
      
    );
  }
}

export default Upload;

