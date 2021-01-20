import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CreateTask from "./createTask";
import PomodoroTimer from "./pomodoroTimer";
import TaskCard from "./taskCard";
import { fetchTasks } from "../store/actions/actions";

function Home({ fetchTasks, user }: any) {
  const [flag, setFlag] = useState(0);
  const [tasks, setTasks] = useState<any>([]);

  let listTasks = (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  useEffect(() => {
    fetchTasks(user.id)
      .then((data: React.SetStateAction<never[]>) => setTasks(data))
      .catch((err: any) => console.log(err));
  }, [fetchTasks, flag, user.id]);

  const reloadComponent = () => {
    setFlag(flag + 1);
  };

  if (tasks.length > 1) {
    listTasks = tasks.map((item: any, index: number) => {
      return (
        <TaskCard
          key={index}
          task={item}
          userID={user.id}
          reload={() => reloadComponent()}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <header className="padding d-flex flex-row justify-content-between">
        <h3>Pomodoro</h3>
      </header>
      <PomodoroTimer />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <CreateTask id={user.id} reload={() => reloadComponent()} />
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {listTasks}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: {
  user: { user: any };
  tasks: { tasks: any };
}) => ({
  user: state.user.user,
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps, { fetchTasks })(Home);
