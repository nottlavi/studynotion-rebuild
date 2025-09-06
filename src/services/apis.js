const BASE_URL = "http://localhost:4000/api/v1";

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const users = {
  LOGIN_API: BASE_URL + "/user/login",
  SIGNUP_API: BASE_URL + "/user/signup",
  CHECKOTP_API: BASE_URL + "/user/checkOtp",
  RESETPASSTOKEN_API: BASE_URL + "",
};

export const contactUsEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};
