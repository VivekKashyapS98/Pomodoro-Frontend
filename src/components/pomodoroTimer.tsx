/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TimerButtons from "./timerButtons";
import { setTask, setComplete } from "../store/actions/actions";

function PomodoroTimer({ user, running, tasks }: any) {
  const [task, setTask] = useState<any>({});
  const [sec, setSec] = useState<number>(1500);
  const [play, setPlay] = useState<boolean>(false);

  let tasksToBeDone = tasks.filter((item: any) =>
    item.completedAt ? false : true
  );

  const formatTime = (timeInSec: number) => {
    let min = Math.floor(timeInSec / 60);
    let sec = timeInSec - 60 * min;
    return `${min}:${sec}`;
  };

  const shuffleArray = () => {
    let array = [...tasksToBeDone];
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    console.log(array);
    tasksToBeDone = array;
    setTask(tasksToBeDone[0]);
    setSec(1500);
    setPlay(true);
  };

  useEffect(() => {
    let timeInterval = setTimeout(() => {
      if (play) {
        if (sec !== 0) {
          setSec(sec - 1);
        } else
          setComplete(user.id, task._id, { completedAt: new Date() })
            .then((data) => {
              console.log(data);
              alert("Time for a break!");
              setTimeout(() => {
                tasksToBeDone = tasks.filter((item: any) =>
                  item.completedAt ? false : true
                );
              }, 300000);
            })
            .catch((err) => console.log(err));
      }
    }, 1000);
    if (running.task.title !== task.title) {
      setTask(running.task);
      setSec(1500);
      setPlay(true);
    }
    return () => {
      clearTimeout(timeInterval);
    };
  }, [play, running.task, sec, task._id, task.title, user.id]);

  const start = () => {
    setTask(tasksToBeDone[0]);
    setSec(1500);
    setPlay(true);
    console.log("Tasks pending: ", tasksToBeDone);
  };

  const stop = () => {
    setSec(1500);
    setPlay(false);
    setTask({});
  };

  return (
    <div
      style={{ width: "100%" }}
      className="d-flex flex-column flex-wrap justify-content-center align-items-center"
    >
      <h2>{task.title}</h2>
      <h1 className="timer">{formatTime(sec)}</h1>
      <TimerButtons
        start={() => start()}
        stop={() => stop()}
        shuffle={() => shuffleArray()}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  tasks: state.tasks.tasks,
  running: state.running,
});

export default connect(mapStateToProps, { setTask, setComplete })(
  PomodoroTimer
);
