import {SEARCH,SIGNIN,SIGNOUT,MOREINFO,ADD,REMOVE} from './ActionTypes';
export const searchAction=(search,status,loading)=>({
        type:SEARCH,
        payload: {
          search,
          status,
          loading
        }
        
}
);

export const signInAction=(jwt,email)=>({
    
    type:SIGNIN,
    payload: {
      jwt,
      email
    }
    
}
);

export const signOutAction=()=>({

  type:SIGNOUT


});
export const notificationAddAction=(count,notifications)=>({
  type:ADD,
  payload: {
      count,
      notifications
    }
});

export const notificationRemoveAction=()=>({
  type:REMOVE
});


export const moreInfoAction = (field,id,pdfID,uploaderID, info) => ({
  type: MOREINFO,
  payload: {
    field,
    id,
    pdfID,
    uploaderID,
    info
  }
});

