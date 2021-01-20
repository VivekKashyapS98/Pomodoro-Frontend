import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

function PomodoroTimer({ running, tasks }: any) {
  const [prev, setPrev] = useState<any>(0);
  const [sec, setSec] = useState<any>(0);
  const [min, setMin] = useState<any>(0);
  const [time, setTime] = useState<any>(`${min}:${sec}`);

  const taskTitle = tasks.find((task: { _id: any }) => task._id === running);

  useEffect(() => {
    if (sec === 60) {
      setMin(min + 1);
      setSec(0);
      setTime(`${min}:${sec}`);
    } else {
      setSec(sec + 1);
      setTime(`${min}:${sec}`);
    }
    setSec(sec + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div>
      <header>
        <nav className="padding d-flex flex-row justify-content-between">
          <button
            className="navs btn btn-light"
            onClick={() => {
              setMin(0);
              setSec(0);
            }}
          >
            START
          </button>
          <button className="navs btn btn-light">STOP</button>
        </nav>
      </header>
      {taskTitle ? <h2>Task: {taskTitle.title}</h2> : null}
      <h2>{time}</h2>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  tasks: state.tasks.tasks,
  running: state.running.taskID,
});

export default connect(mapStateToProps)(PomodoroTimer);
