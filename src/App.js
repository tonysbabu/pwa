import React from "React";
import ReactDOM from "react-dom";
import Home from "./containers/Home/Home";

ReactDOM.render(<Home />, document.querySelector("#root"));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
