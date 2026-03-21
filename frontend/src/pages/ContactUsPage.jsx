import React from "react";

export const ContactUsPage = () => {
  return (
    <main className="site-shell float-in">
      <section className="page-hero">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Contact
        </p>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
          Reach out to the StudyNotion team
        </h1>
        <p className="text-slate-700 mt-3 max-w-2xl">
          For support, partnerships, or instructor applications, we usually
          reply within one business day.
        </p>
      </section>
      <section className="grid md:grid-cols-3 gap-4 mt-4">
        <article className="section-card">
          <p className="text-sm text-slate-500">Email</p>
          <p className="font-semibold">hello@studynotion.dev</p>
        </article>
        <article className="section-card">
          <p className="text-sm text-slate-500">Phone</p>
          <p className="font-semibold">+91 90000 00000</p>
        </article>
        <article className="section-card">
          <p className="text-sm text-slate-500">Office Hours</p>
          <p className="font-semibold">Mon - Fri, 10AM - 7PM IST</p>
        </article>
      </section>
    </main>
  );
};
