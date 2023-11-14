import React, { useState, useEffect } from "react";
import "../styles/signup.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [results, setResults] = useState(null);
  // const [error, setError] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const navigate = useNavigate();
  
  async function loginpHandler(event) {
    event.preventDefault();
    setLoading(true);

    const postData = {};

    postData.Email = event.target.email.value;
    postData.Password = event.target.password.value;
    console.log(postData);
    const token = process.env.REACT_APP_token;
    const jsonData = JSON.stringify(postData);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: jsonData,
    };
    const url = process.env.REACT_APP_url;
    console.log(`props.url = ${url}`);
    const response = await fetch(url + "/login", options);
    const result = await response.json();

    // console.log(`result : ${result.id}`)
    // console.log(`result : ${result.val}`)

    if (!response.ok) {
      event.target.password.value = "";
      alert("Password Mismatched");
      setIsLoggedIn(false);
      console.log("Failed");
    } else {
      if (result !== "F") {
        // window.localStorage.setItem('id', result.val)
        window.sessionStorage.setItem("id", result.id);
        navigate('/products');
      }
      alert("Success Logged in");
      setIsLoggedIn(true);
      console.log("Success");
    }
    setResults(null);
  }

  return (
    <>
      {/* <Head>
                <title>LOGIN | MSCC</title>
                <link rel='shortcut icon' href='/img/icon.jpeg' />
            </Head> */}
      <div className="main_container">
        <div className="wrapperDiv">
          <div className="authBtn">
            <NavLink to="/login">LOGIN</NavLink>
          </div>

          <h2>Login Your Account</h2>
          <div className="Smain_container">
            <form
              action="#"
              method="post"
              onSubmit={loginpHandler}
              key={formKey}
              className="form"
            >
              <div className="form_container">
                <div className="email">
                  {/* <label htmlFor="email">Email : </label> */}
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    required
                    min={5}
                  />
                </div>
                <div className="password">
                  {/* <label htmlFor="password" required >Password : </label> */}
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="Password"
                  />
                </div>
                <div className="forgot">Forgot Password?</div>
                <div className="lsmbtn">
                  <input
                    type="submit"
                    value="Login"
                    id="smbtn"
                    className="smbtn"
                  />
                </div>
              </div>
              <div>
                <div className="authDiv">
                  <div>
                    Don't have an account?{" "}
                    <NavLink to="/signup" className="authLink">
                      {" "}
                      SIGNUP
                    </NavLink>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
