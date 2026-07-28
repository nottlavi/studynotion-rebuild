# StudyNotion Rebuild

Hey there! Welcome to the complete repository for my StudyNotion rebuild project. I built this full-stack Ed-Tech platform to create a seamless, professional-grade marketplace where instructors can build and sell their expertise, and students can easily discover, purchase, and consume educational content.

This repository contains both the **Frontend** (client-side interface) and the **Backend** (server-side API).

## The Tech Stack I Used

I chose the MERN stack to ensure the application is fast, highly scalable, and easy to maintain.

### Frontend

* **Framework:** React.js for building a dynamic, single-page application.
* **State Management:** Redux Toolkit to handle global states like user authentication, shopping cart data, and enrolled courses.
* **Styling:** Tailwind CSS for a highly responsive, modern, and fluid user interface across all devices.

### Backend

* **Environment:** Node.js runtime.


* **Framework:** Express.js for handling API routing and requests.


* **Database:** MongoDB paired with Mongoose for structured data modeling.


* **Security & Auth:** JSON Web Tokens (JWT) for session management and `bcrypt` for secure password hashing.


* **Media Handling:** Cloudinary integration for robust video and image hosting.



## Key Features

I designed distinct journeys for two primary types of users:

**For Students:**

* **Course Discovery:** Browse through various categories to find courses.


* **Secure Purchasing:** A fully functional shopping cart and simulated payment controller for smooth checkouts.


* **Learning Dashboard:** Access enrolled courses, watch video lectures, and track progress.
* **Feedback System:** Leave ratings and reviews on completed courses.



**For Instructors:**

* **Course Builder:** Deeply nested curriculum creation allowing instructors to organize content into sections and sub-sections.


* **Media Uploads:** Seamlessly upload course thumbnails and lecture videos via Cloudinary.



**Core System Features:**

* **Secure Registration:** OTP (One-Time Password) generation and verification for secure account creation and password resets.


* **Role-Based Access:** Protected routes and customized dashboards depending on whether the user is a student or an instructor.



## 📂 Project Structure

Here is how I organized the codebase to keep the logic clean and maintainable:

### Backend Structure

The backend handles all the heavy lifting, database interactions, and secure API endpoints.

* `backend/config/`: Contains connection setups for the MongoDB database and the Cloudinary media server.


* `backend/controllers/`: The brains of the API. This directory holds the logic for the cart, categories, courses, payments, ratings/reviews, sections, sub-sections, and user management.


* `backend/middlewares/`: Custom functions that run between the request and the controller, such as validating user authentication and roles.


* `backend/models/`: Mongoose schemas defining the structure of the data, including `OTPModel`, `cartModel`, `categoryModel`, `courseModel`, `profileModel`, `reviewModel`, `sectionModel`, `subSectionModel`, and `userModel`.



### Frontend Structure

The frontend manages the visual interface and user interactions.

* `src/components/`: Reusable UI elements (buttons, navbars, modals).
* `src/pages/`: Main view components (Home, Dashboard, Course Details).
* `src/slices/`: Redux slices managing global state for authentication, profiles, and the cart.
* `src/services/`: API configuration and functions to communicate with the Express backend.
