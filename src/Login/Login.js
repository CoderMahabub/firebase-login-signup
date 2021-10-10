import "./Login.css";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import firebaseInitialize from "../Firebase/Firebase.init";
import { useState } from "react";

firebaseInitialize();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const Login = () => {
  const [user, setUser] = useState({});


  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { email, displayName, photoURL } = result.user;
        // console.log(user);
        const userInfo = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(userInfo);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const { email, displayName, photoURL } = result.user;
        // console.log(user);
        const userInfo = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(userInfo);
      })
  }
  return (
    <div>
      <div className="login-box d-flex align-items-center justify-content-center">
        <div className="login">
          <div className="login-box">
            <h2 className="text-info">Pease Login</h2>
            <p>{user.name}</p>
            <p className="text-danger"></p>
            <form>
              <input
                className="input-felid"
                type="email"
                name="email"
                placeholder="Enter your Email"
              />
              <br />
              <input
                className="input-felid"
                type="password"
                name="password"
                placeholder="Enter your Password"
              />
              <input
                className="mt-3 w-50 btn btn-success m-auto"
                type="submit"
                value="Login"
              />
            </form>
          </div>
          <button onClick={handleGoogleSignIn} className="me-2">
            Login with Google
          </button>
          <button onClick={handleGithubSignIn} className="me-2">
            Login with Github
          </button>

          <button className="mt-2">
            Reset Password
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
