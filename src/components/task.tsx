import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import AddNotes from "./addNotes";

interface Props {
  user: any;
  tasks: any;
}

function Task({ user, tasks }: Props) {
  const [flag, setFlag] = useState(0);

  const { id } = useParams<any>();
  const task = tasks.find((item: any) => item._id === id);
  let notes = "Notes are empty!";

  const reloadComponent = () => {
    setFlag(flag + 1);
  };

  if (task.notes.length > 0) {
    notes = task.notes.map((item: React.ReactNode) => {
      return (
        <li className="alert alert-light" role="alert">
          {item}
        </li>
      );
    });
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <h5>Created At: {new Date(task.createdAt).toLocaleString("en-US")}</h5>
      <h5>Finished At: {new Date(task.createdAt).toLocaleString("en-US")}</h5>
      <br />
      <div className="form">
        <div className="margin padding">
          <h3>Notes:</h3>
          <ul className="alert alert-primary" role="alert">
            {notes}
          </ul>
          <AddNotes
            userID={user.id}
            taskID={task._id}
            reload={() => reloadComponent()}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: {
  user: { user: any };
  tasks: { tasks: any };
}) => ({
  user: state.user.user,
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps)(Task);
