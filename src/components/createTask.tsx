import React, { useState } from "react";
import { createTask } from "../store/actions/actions";

export default function CreateTask({ id, reload }: any) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length > 1 && description.length > 1) {
      createTask(id, { title, description, createdAt: new Date() })
        .then((data) => {
          setTitle("");
          setDescription("");
          console.log(data);
          reload();
        })
        .catch((err) => console.log(err));
    } else setError("Title and Description can't be empty!");
  };

  return (
    <div className="form">
      <p>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={() => setError("")}
        >
          Create Task
        </button>
      </p>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          <form
            className="d-flex flex-column justify-content-center align-items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="margin input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                Title
              </span>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Title of the Task"
                aria-label="title"
                value={title}
                aria-describedby="addon-wrapping"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="margin input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                Description
              </span>
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Description of the Task"
                aria-label="description"
                value={description}
                aria-describedby="addon-wrapping"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              className="btn btn-primary"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
