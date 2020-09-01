import {SIGNIN,SIGNOUT} from '../ActionTypes';
const initialState = {
     status:false,
     jwt:null,
     email:null
  };
  export default function(state = initialState, action) {
    switch (action.type) {
          case SIGNIN: { 
            return Object.assign({}, state,{
              status:true,
              jwt:action.payload.jwt,
              email:action.payload.email
            });
       
      }
      case SIGNOUT: { 
        return Object.assign({}, state,{
          status:false,
          jwt:null,
          email:null
        });
    }
      default:
        return state;
    }
  }
  