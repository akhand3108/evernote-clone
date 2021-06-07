import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import Home from "./components/Home"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("evernote-container")
)
