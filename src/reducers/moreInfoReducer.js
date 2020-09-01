import { MOREINFO } from "../ActionTypes";
const initialState = {
  id:null,
  pdfID: null,
  uploaderID:null,
  field: null,
  info: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case MOREINFO: {
      return Object.assign({}, state, {
        id:action.payload.id,
        pdfID: action.payload.pdfID,
        uploaderID:action.payload.uploaderID,
        field: action.payload.field,
        info: action.payload.info
      });
    }
    default:
      return state;
  }
}
