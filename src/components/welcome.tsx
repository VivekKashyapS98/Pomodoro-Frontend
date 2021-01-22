import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Welcome() {
  const history = useHistory();

  if (localStorage.jwtToken) {
    history.push("/home");
  }
  return (
    <React.Fragment>
      <header className="padding d-flex flex-row justify-content-between">
        <h3>Pomodoro</h3>
        <nav>
          <Link className="navs btn btn-light" to="/signup">
            SIGNUP
          </Link>
          <Link className="navs btn btn-light" to="/signin">
            SIGNIN
          </Link>
        </nav>
      </header>
      <div className="welcome"></div>
    </React.Fragment>
  );
}
