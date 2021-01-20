import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

function PomodoroTimer({ running, tasks }: any) {
  const [sec, setSec] = useState<any>(0);
  const [min, setMin] = useState<any>(0);
  const [time, setTime] = useState<any>(`${min}:${sec}`);

  const taskTitle = tasks.find((task: { _id: any }) => task._id === running);

  useEffect(() => {
    setInterval(function () {
      if (sec === 60) {
        setMin(min + 1);
        setSec(0);
      } else setSec(sec + 1);
    }, 1000);
  }, [min, sec]);

  return (
    <div>
      <header>
        <nav className="padding d-flex flex-row justify-content-between">
          <button className="navs btn btn-light">START</button>
          <button className="navs btn btn-light">STOP</button>
        </nav>
      </header>
      <h2>Task: {taskTitle.title}</h2>
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
