import "./Login.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseInitialize from "../Firebase/Firebase.init";
import { useState } from "react";

firebaseInitialize();

const Register = () => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {

    if ((e.target.value.length) < 6) {
      console.error('Hobe Na Bhai');
    } else {
      setPassword(e.target.value);
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div>
      <h1>{user.email}</h1>
      <div className="login-box d-flex align-items-center justify-content-center">
        <div className="login">
          <div className="login-box">
            <h2 className="text-info">Please Register</h2>
            <form onSubmit={handleRegister}>
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
                className="mt-3 w-50 btn btn-success m-auto"
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
