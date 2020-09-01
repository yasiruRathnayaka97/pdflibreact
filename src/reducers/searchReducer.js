import {SEARCH} from '../ActionTypes';
const initialState = {
     search:"",
     status:"",
     loading:false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
          case SEARCH: { 
            return Object.assign({}, state,{
              search:action.payload.search,
              status:action.payload.status,
              loading:action.payload.loading
            });
       
      }
      default:
        return state;
    }
  }
  