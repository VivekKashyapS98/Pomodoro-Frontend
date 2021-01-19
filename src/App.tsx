import React from "react";
import "./App.css";
import configureStore from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
