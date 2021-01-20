import { combineReducers } from "redux";
import user from "./user";
import tasks from "./tasks";

const rootReducer = combineReducers({
  user,
  tasks,
});

export default rootReducer;
