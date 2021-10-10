import logo from "./Images/login.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login/Login";
import Register from "./Login/Register";
import firebaseInitialize from "./Firebase/Firebase.init";


firebaseInitialize();

function App() {
  return (
    <div className="App container ">
      <div className="row">
        <div className="login-area col-md-6">
          <Login></Login>
          {/* <Register></Register> */}

          <p className="text-primary ">
            are you new please register
          </p>
          <p className="text-primary ">
            already have an account ?
          </p>
        </div>
        <div className="col-md-6">
          <div className="img">
            <img
              className="image-fluid w-100"
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