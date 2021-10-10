import "./Login.css";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import firebaseInitialize from "../Firebase/Firebase.init";
import { useState } from "react";

firebaseInitialize();

const Register = () => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {

    if ((e.target.value.length) < 6) {
      setError('Password Must be at least 6 Characters');
    } else {
      setPassword(e.target.value);
      setError('');
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const { email, displayName, photoURL } = result.user;
        // console.log(user);
        const userInfo = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(userInfo);
        verifyEmail(email);
      })
      .catch((error) => {
        setError(error);
      });
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
      });
  }
  return (
    <div>
      <div className="login-box d-flex align-items-center justify-content-center">
        <div className="login">
          <div className="login-box">
            <h2 className="text-info"><u>PLEASE REGISTER</u></h2>
            <form onSubmit={handleRegister}>
              <p className="text-danger">{error}</p>
              <input
                onBlur={handleEmailChange}
                className="input-felid"
                type="email"
                name="email"
                placeholder="Enter your Email"
                required
              />
              <br />
              <input
                onBlur={handlePasswordChange}
                className="input-felid"
                type="password"
                name="password"
                placeholder="Enter your Password"
                required
              />
              <button
                className="mt-3 w-50 btn btn-info m-auto text-light fw-bold"
                type="submit"
                value="Register"
              >Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
