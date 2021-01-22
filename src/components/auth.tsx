import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserAuth } from "../store/actions/actions";

interface Props {
  type: string;
  user: object;
  setUserAuth: any;
}

function Auth({ type, setUserAuth }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "signup") {
      setUserAuth(type, { username: name, email, password })
        .then(() => history.push("/home"))
        .catch((err: React.SetStateAction<string | null>) => setError(err));
    } else {
      setUserAuth(type, { email, password })
        .then(() => history.push("/home"))
        .catch((err: React.SetStateAction<string | null>) => setError(err));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  if (type === "signup") {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Sign Up</h2>
        <form
          className="form d-flex flex-column justify-content-center align-items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="margin input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Name
            </span>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              value={name}
              aria-describedby="addon-wrapping"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="margin input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Email
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              aria-label="email"
              value={email}
              aria-describedby="addon-wrapping"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="margin input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Password
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              aria-label="password"
              value={password}
              aria-describedby="addon-wrapping"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input className="btn btn-primary" type="submit" value="SignUp" />
        </form>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2>Sign In</h2>
          <form
            className="form d-flex flex-column justify-content-center align-items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="margin input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                Email
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                value={email}
                aria-describedby="addon-wrapping"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="margin input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                Password
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                value={password}
                aria-describedby="addon-wrapping"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <input className="btn btn-primary" type="submit" value="SignIn" />
          </form>
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: { user: { user: any } }) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { setUserAuth })(Auth);
