import logo from "./Images/login.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/Login";
import Register from "./Login/Register";
import firebaseInitialize from "./Firebase/Firebase.init";
import { useState } from "react";


firebaseInitialize();

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="App container ">
      <div className="row">
        <div className="login-area col-md-6">
          {toggle ? <Login></Login> : <Register></Register>}

          {toggle ? <button onClick={() => setToggle(false)} className="btn btn-success fw-bold text-light">
            Register Now ?
          </button> :
            <button onClick={() => setToggle(true)} className="btn btn-success fw-bold text-light">
              Already Registered ?
            </button>}
        </div>
        <div className="col-md-6">
          <div className="img">
            <img
              className="image-fluid w-100 img-fluid"
              src={logo}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
