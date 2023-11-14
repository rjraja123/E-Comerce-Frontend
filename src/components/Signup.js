import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  // const [error, setError] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const [misMatchError, setMisMatchError] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
  
  async function signupHandler(event) {
    event.preventDefault();
    // setLoading(true);

    const postData = {};

    if (event.target.password1.value === event.target.password2.value) {
      const password = event.target.password1.value;

      postData.Name = event.target.name.value;
      postData.Email = event.target.email.value;
      postData.Phone = event.target.phone.value;
      postData.Password = password;
    } else setMisMatchError(true);

    console.log(postData);
    const JSONdata = JSON.stringify(postData);
    const token = process.env.REACT_APP_token;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSONdata,
    };
    console.log(JSONdata);

    const url = process.env.REACT_APP_url;
    console.log(`props.url = ${url}`);

    const response = await fetch(url + "/signup", options);
    const result = await response.json();
    console.log(`result : ${result}`);
    event.target.password2.value = "";
    event.target.password1.value = "";
    event.target.name.value = "";
    event.target.email.value = "";
    event.target.phone.value = "";

    if (misMatchError) {
      // createHtml('MissMatched password', 'danger')
      // setIsSignup(false);
      alert("Password Mismatched");
      console.log("MissMatch Password");
    }
    if (!response.ok) {
      // createHtml(result, 'danger')
      setIsSignup(false);
      alert("Failed");
      console.log("Failed");
    } else {
      // createHtml(result, 'success')
      if (result !== "F") {
        // window.localStorage.setItem('id', result.val)
        window.sessionStorage.setItem("id", result.id);
        navigate("/products");

      }
      setIsSignup(true);
      alert("Success");
      console.log("Success");
    }
    setResults(null);
    setMisMatchError(false);
  }

  return (
    <>
      <div className="main_container">
        <div className="wrapperDiv">
          <div className="authBtn">
            <NavLink to="/signup">SIGN UP</NavLink>
          </div>
          <h2>Create Your Account</h2>
          <div className="Smain_container">
            <form
              action="#"
              method="post"
              onSubmit={signupHandler}
              key={formKey}
              className="form"
            >
              <div className="form_container">
                <div className="name">
                  <label htmlFor="name">Name : </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                    min={3}
                  />
                </div>

                <div className="email">
                  <label htmlFor="email">Email : </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@xyz.com"
                    required
                    min={5}
                  />
                </div>
                <div className="number">
                  <label htmlFor="phone">Phone Number : </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    maxLength={10}
                    minLength={10}
                  />
                </div>

                <div className="passwords">
                  <label htmlFor="password" required>
                    Password :{" "}
                  </label>
                  <input
                    type="password"
                    name="password1"
                    id="password1"
                    placeholder="Create Password"
                    required
                  />
                  <br />
                  <label htmlFor="password" required>
                    Password :{" "}
                  </label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    required
                    placeholder="Confirm Password"
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  id="smbtn"
                  className="smbtn "
                />
              </div>
              <div className="authDiv">
                <div>
                  Already have an account?{" "}
                  <NavLink to="/login" className="authLink">
                    {" "}
                    LOGIN
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
