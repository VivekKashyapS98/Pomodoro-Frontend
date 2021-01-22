import { SET_TASKS, REMOVE_TASK } from "../actionTypes";

const defaultTask = {
  tasks: [],
};

const tasks = (
  state = defaultTask,
  action: { type: any; payload: { tasks: any } }
) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        tasks: action.payload.tasks,
      };
    case REMOVE_TASK:
      return {
        tasks: action.payload.tasks.filter(
          (item: { id: any }) => item.id !== action.payload.tasks.id
        ),
      };
    default:
      return state;
  }
};

export default tasks;
