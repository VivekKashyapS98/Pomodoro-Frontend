import { RUN_TASK } from "../actionTypes";

const run = {
  taskID: null,
};

const running = (
  state = run,
  action: { type: any; payload: { taskID: any } }
) => {
  switch (action.type) {
    case RUN_TASK:
      return {
        taskID: action.payload.taskID,
      };
    default:
      return state;
  }
};

export default running;
