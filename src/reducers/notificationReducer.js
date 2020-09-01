import {ADD,REMOVE} from '../ActionTypes';
const initialState = {
     count:0,
     notifications:[]
  };
  export default function(state = initialState, action) {
    switch (action.type) {
          case ADD: { 
            return Object.assign({}, state,{
              count:action.payload.count,
              notifications:action.payload.notifications
            });
       
      }
      case REMOVE: { 
        return Object.assign({}, state,{
          count:0,
          notifications:[]
        });
    }
      default:
        return state;
    }
  }
  