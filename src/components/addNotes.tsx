import React, { useState } from "react";
import { addNotes } from "../store/actions/actions";

export default function AddNotes({ userID, taskID, reload }: any) {
  const [notes, setNote] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (notes.length > 1) {
      addNotes(userID, taskID, { note: notes })
        .then((data) => {
          setNote("");
          console.log(data);
          reload();
        })
        .catch((err) => console.log(err));
    } else setError("A Note be empty!");
  };

  return (
    <div>
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
          Add Notes
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
                Note
              </span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={notes}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <button
              className="btn btn-primary"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
              type="submit"
            >
              Add Note
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
