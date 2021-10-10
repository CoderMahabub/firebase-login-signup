import "./Login.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import firebaseInitialize from "../Firebase/Firebase.init";
import { useState } from "react";

firebaseInitialize();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const Login = () => {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


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
      .catch((error) => {
        setError(error);
      });
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
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {

    if ((e.target.value.length) < 6) {
      setError('Password Must be at least 6 characters');
    } else {
      setPassword(e.target.value);
      setError('');
    }
  }
  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const { email, displayName, photoURL } = result.user;
        // console.log(user);
        const userInfo = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(userInfo);
        setError('');
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError('Password Reset Email Sent');
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  return (
    <div>
      <div className="login-box d-flex align-items-center justify-content-center">
        <div className="login">
          <div className="login-box">
            <h2 className="text-info"><u>PLEASE LOGIN</u></h2>
            <form onSubmit={handleLogin}>
              <p className="text-danger">{error}</p>
              <input
                onBlur={handleEmailChange}
                className="input-felid"
                type="email"
                name="email"
                placeholder="Enter your Email"
              />
              <br />
              <input
                onBlur={handlePasswordChange}
                className="input-felid"
                type="password"
                name="password"
                placeholder="Enter your Password"
              />
              <input
                className="mt-3 w-50 btn btn-info m-auto text-light fw-bold"
                type="submit"
                value="Login"
              />
            </form>
          </div>
          <button onClick={handleGoogleSignIn} className="me-2 btn btn-sm btn-warning fw-bold text-light bg-dark rounded">
            Login with <i className="fab fa-google text-danger"></i>
          </button>
          <button onClick={handleGithubSignIn} className="me-2 btn btn-sm btn-warning fw-bold text-light bg-dark rounded">
            Login with <i className="fab fa-github-square text-danger"></i>
          </button>
          <button onClick={handleResetPassword} className="btn btn-sm btn-warning fw-bold text-light bg-dark rounded">
            Reset Password <i class="fas fa-unlock-alt text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
