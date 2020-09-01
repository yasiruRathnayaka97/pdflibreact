import { createStore,combineReducers } from "redux";
import searchReducer from "./reducers/searchReducer";
import signReducer from "./reducers/signReducer";
import moreInfoReducer from "./reducers/moreInfoReducer";
import notificationReducer from  "./reducers/notificationReducer";

const rootReducer=combineReducers({searchReducer,signReducer,moreInfoReducer,notificationReducer});
export default createStore(rootReducer);
