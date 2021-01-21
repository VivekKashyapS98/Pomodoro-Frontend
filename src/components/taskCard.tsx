import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeTask } from "../store/actions/actions";
import { setTask } from "../store/actions/actions";

function TaskCard({ task, userID, reload, setTask }: any) {
  const history = useHistory();

  const setRunTask = () => {
    setTask(task);
    console.log("New task has been started!", task);
  };

  const removeTaskHelper = () => {
    removeTask(userID, task._id)
      .then((data) => {
        console.log(data);
        reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="margin padding card"
      style={{ width: "18rem", backgroundColor: "whitesmoke" }}
    >
      <div className="card-body">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="margin position-absolute top-0 end-0 bi bi-file-earmark-x-fill"
          viewBox="0 0 16 16"
          onClick={() => removeTaskHelper()}
        >
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.854 7.146L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 1 1 .708-.708z" />
        </svg>
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p>{new Date(task.createdAt).toLocaleString("en-US")}</p>
      </div>
      <div className="d-flex flex-row flex-nowrap justify-content-around">
        {task.completedAt ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-check-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-play-fill"
            viewBox="0 0 16 16"
            onClick={() => setRunTask()}
          >
            <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        )}
        <button
          className="btn btn-light"
          onClick={() => history.push(`/task/${task._id}`)}
        >
          View
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  tasks: state.tasks.tasks,
  running: state.running.task,
});

export default connect(mapStateToProps, { setTask })(TaskCard);
