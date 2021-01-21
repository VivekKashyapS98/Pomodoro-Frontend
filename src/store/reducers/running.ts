import { RUN_TASK } from "../actionTypes";

const run = {
  task: {},
};

const running = (
  state = run,
  action: { type: any; payload: { task: any } }
) => {
  switch (action.type) {
    case RUN_TASK:
      return {
        task: action.payload.task,
      };
    default:
      return state;
  }
};

export default running;
