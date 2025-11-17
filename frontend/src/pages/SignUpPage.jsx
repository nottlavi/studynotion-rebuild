import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../slices/userSlice";

const SignUpPage = () => {
  //managing all the states here
  const [inputs, setInputs] = useState({
    accountType: "Student",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //managing all the dependencies here
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //for input change(a common function)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  //function to handle sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/users/signup`, inputs, {
        withCredentials: true,
      });
      if (res.error) {
        console.log(res.error);
      }
      console.log(res);
      //setting the email here in the redux, so that it can be used in verify email page
      dispatch(setEmail(inputs.email));
      navigate("/verify-email");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        {/* div for account type */}
        <div>
          <button
            name="accountType"
            value={"Student"}
            onClick={handleInputChange}
            type="button"
          >
            Student
          </button>
          <button
            name="accountType"
            value={"Instructor"}
            onClick={handleInputChange}
            type="button"
          >
            Instructor
          </button>
        </div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          value={inputs.firstName}
          onChange={handleInputChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          value={inputs.lastName}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={inputs.email}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={inputs.password}
          onChange={handleInputChange}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          value={inputs.confirmPassword}
          onChange={handleInputChange}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
