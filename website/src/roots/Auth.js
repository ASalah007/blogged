import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/auth.sass";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import { validate } from "email-validator";
import { getPasswordErrors } from "../utils";
import { CircularProgress } from "@mui/material";
import { signIn, signUp } from "../services/public_services";
import Cookies from "universal-cookie";
import Message from "../components/Message";

function Auth() {
  const [signingIn, setSigningIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInErrors, setSignInErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showActivateMessage, setShowActivateMessage] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    if (signingIn) {
      setLoading(true);
      const data = await signIn({ password, email });
      if (!data) {
        setSignInErrors(["wrong credentials"]);
        setLoading(false);
        return;
      }
      const cookies = new Cookies();
      cookies.set("access", data.access);
      cookies.set("refresh", data.refresh);
      navigate("/");
      return;
    }
    console.log("abosalah");
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    const data = await signUp({ email, password, full_name: fullName });
    console.log(data);
    if (data.errors) {
      setSignUpError(
        Object.values({ ...data.errors.email, ...data.errors.password })[0]
      );
    } else setShowActivateMessage(true);

    setLoading(false);
  }

  function validateInputs() {
    if (signingIn) return true;

    let valid = true;

    if (email && !validate(email)) {
      setEmailErrors(["email is not valid."]);
      valid = false;
    } else setEmailErrors([]);

    if (password && getPasswordErrors(password)) {
      setPasswordErrors(getPasswordErrors(password));
      valid = false;
    } else setPasswordErrors([]);

    return valid;
  }

  return (
    <div className="background">
      {showActivateMessage && (
        <Message type="success" onClose={() => setShowActivateMessage(false)}>
          Check your email to activate your account.
        </Message>
      )}

      {signUpError && (
        <Message type="error" onClose={() => setSignUpError("")}>
          {signUpError}
        </Message>
      )}

      <div className="card">
        <div className="header">
          <div className="greetings">Welcome {signingIn && "Back"}</div>
          <div className="hint">
            {signingIn
              ? "Hey, Enter your details to get sign in to your account."
              : "Hey, Fill the bellow fields to create a new account."}
          </div>
        </div>

        {signInErrors.length > 0 && (
          <div className="error-messages">{signInErrors}</div>
        )}

        <div className="form">
          {!signingIn && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={(e) => validateInputs(e)}
            />
          )}

          {emailErrors.length > 0 && (
            <ul className="error-messages">
              {emailErrors.map((e) => (
                <li>{e}</li>
              ))}
            </ul>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateInputs(e)}
          />

          {passwordErrors.length > 0 && (
            <ul className="error-messages">
              {passwordErrors.map((e) => (
                <li>{e}</li>
              ))}
            </ul>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => validateInputs(e)}
          />

          {signingIn && (
            <div className="forgot-your-password">
              Forgot your password?
              <Link to="" className="link">
                Reset Password
              </Link>
            </div>
          )}
        </div>

        <div className="sign-button" onClick={(e) => handleSubmit(e)}>
          {loading ? (
            <CircularProgress color="inherit" size={23} />
          ) : (
            "Sign " + (signingIn ? "in" : "up")
          )}
        </div>

        <div className="divider">
          <div className="bar"></div>
          <div>Or Sign {signingIn ? "in" : "up"} with</div>
          <div className="bar"></div>
        </div>

        <div className="third-party-auth">
          <div>
            <GoogleIcon fontSize="large" /> <span>Google</span>
          </div>
          <div>
            <TwitterIcon fontSize="large" /> <span>Twitter</span>
          </div>
          <div>
            <FacebookRoundedIcon fontSize="large" /> <span>Facebook</span>
          </div>
        </div>

        <div className="footer">
          {signingIn ? (
            <div>
              Don't have an account?
              <span onClick={() => setSigningIn(false)}>Register Now</span>
            </div>
          ) : (
            <div>
              Already have an account
              <span onClick={() => setSigningIn(true)}>Log In</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
