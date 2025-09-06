import React from "react";
import { ContactDetails } from "../components/core/ContactPage/ContactDetails";
import { ContactUsForm } from "../components/core/ContactPage/ContactUsForm";
import { Footer } from "../components/common/Footer";
import { Navbar } from "../components/common/Navbar";

export const Contact = () => {
  return (
    <div className="text-red-500">
      <Navbar active={true} />
      <div>
        <ContactDetails />
        <ContactUsForm />
      </div>
      <div>
        <p>Review From Other Learners</p>
      </div>
      <Footer />
    </div>
  );
};
