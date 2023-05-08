import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import { validate } from "email-validator";
import { getPasswordErrors } from "../utils";
import { CircularProgress } from "@mui/material";
import { signIn, signUp } from "../services/public_services";
import Cookies from "universal-cookie";
import Message from "../components/Message";
import styles from "./styles/auth.module.sass";

function Auth({ loadUserProfile }) {
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
      cookies.set("access", data.access, {
        path: "/",
        expires: new Date("2200-01-01"),
      });
      cookies.set("refresh", data.refresh, {
        path: "/",
        expires: new Date("2200-01-01"),
      });

      loadUserProfile();
      navigate("/");
      return;
    }
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    const data = await signUp({ email, password, full_name: fullName });
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
    <div className={styles.background}>
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

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.greetings}>Welcome {signingIn && "Back"}</div>
          <div className={styles.hint}>
            {signingIn
              ? "Hey, Enter your details to get sign in to your account."
              : "Hey, Fill the bellow fields to create a new account."}
          </div>
        </div>

        {signInErrors.length > 0 && (
          <div className={styles["error-messages"]}>{signInErrors}</div>
        )}

        <div className={styles.form}>
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
            <ul className={styles["error-messages"]}>
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
            <ul className={styles["error-messages"]}>
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
            <div className={styles["forgot-your-password"]}>
              Forgot your password?
              <Link to="" className={styles.link}>
                Reset Password
              </Link>
            </div>
          )}
        </div>

        <div className={styles["sign-button"]} onClick={(e) => handleSubmit(e)}>
          {loading ? (
            <CircularProgress color="inherit" size={23} />
          ) : (
            "Sign " + (signingIn ? "in" : "up")
          )}
        </div>

        <div className={styles.divider}>
          <div className={styles.bar}></div>
          <div>Or Sign {signingIn ? "in" : "up"} with</div>
          <div className={styles.bar}></div>
        </div>

        <div className={styles["third-party-auth"]}>
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

        <div className={styles.footer}>
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
