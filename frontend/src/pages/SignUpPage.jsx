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
    <main className="site-shell auth-page signup-page">
      <section className="max-w-2xl mx-auto glass-panel auth-card p-6 md:p-8 float-in">
        <p className="eyebrow text-xs uppercase tracking-[0.16em] text-slate-500">
          Create account
        </p>
        <h1 className="text-3xl font-extrabold mt-1 page-title">
          Join StudyNotion
        </h1>
        <p className="text-slate-600 mt-2 page-lead">
          Pick your role and start learning with practical guided tracks.
        </p>

        <form
          onSubmit={handleSignUp}
          className="flex flex-col gap-3 mt-5 auth-form"
        >
          <div className="section-card !p-2 flex gap-2 w-fit">
            <button
              name="accountType"
              value="Student"
              onClick={handleInputChange}
              type="button"
              className={
                inputs.accountType === "Student" ? "" : "btn-secondary"
              }
            >
              Student
            </button>
            <button
              name="accountType"
              value="Instructor"
              onClick={handleInputChange}
              type="button"
              className={
                inputs.accountType === "Instructor" ? "" : "btn-secondary"
              }
            >
              Instructor
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="font-medium text-slate-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={inputs.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="font-medium text-slate-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={inputs.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <label htmlFor="email" className="font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={inputs.email}
            onChange={handleInputChange}
          />

          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={inputs.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="font-medium text-slate-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={inputs.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit">Create Account</button>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;
