import { combineReducers } from "redux";
import user from "./user";
import tasks from "./tasks";
import running from "./running";

const rootReducer = combineReducers({
  user,
  tasks,
  running,
});

export default rootReducer;
