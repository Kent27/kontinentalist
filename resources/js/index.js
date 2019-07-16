import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore()

const Wrapper = () => (
  <Provider store={store}>   
      <App />   
  </Provider>)

ReactDOM.render(
  <Wrapper />,
  document.getElementById("app")
);

