import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiconnector";
import { contactUsEndpoint } from "../../../services/apis";

export const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      console.log(data);
      const res = await apiConnector(
        "POST",
        contactUsEndpoint.CONTACT_US_API,
        data
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phonenumber: "",
        countrycode: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div>
      <form onSubmit={handleSubmit(submitContactForm)} className="text-black">
        <div className="flex">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && <span>please enter your first name.</span>}
          </div>
          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input
              name="lastName"
              id="lastName"
              placeholder="Enter Your Last Name"
              {...register("lastName")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="enter your email address"
            {...register("email", { required: true })}
          />
          {errors.email && <span>email is mandatory</span>}
        </div>
        <div>
          <label>Phone Number</label>
          <div className="flex gap-4">
            <div>
              <select
                type="text"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((code, idx) => {
                  return (
                    <option key={idx} value={code.code}>
                      {code.code} - {code.country}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <input
                type="tel"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 67890"
                {...register("phonenumber", {
                  required: {
                    value: true,
                    message: "please enter your phone no",
                  },
                  maxLength: {
                    value: 12,
                    message: "invalid phone no",
                  },
                  minLength: {
                    value: 10,
                    message: "invalid phone no. ",
                  },
                })}
              />
              {errors.phonenumber && <span>{errors.phonenumber.message}</span>}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <input
            id="message"
            name="message"
            placeholder="enter your message"
            {...register("message", { required: true })}
          />
          {errors.message && <span>Message can't be empty</span>}
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};
