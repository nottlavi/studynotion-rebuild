import React from "react";

export const AboutPage = () => {
  return (
    <main className="site-shell flex flex-col gap-4 float-in">
      <section className="page-hero">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          About StudyNotion
        </p>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
          We teach outcomes, not just lessons.
        </h1>
        <p className="text-slate-700 mt-3 max-w-3xl">
          StudyNotion is designed for learners who want guided execution,
          real-world portfolio projects, and momentum from a tight learning
          community.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <article className="section-card">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-slate-600 mt-2">
            Help students and professionals bridge the gap from tutorials to
            practical confidence through project-driven curriculum.
          </p>
        </article>
        <article className="section-card">
          <h2 className="text-2xl font-bold">How We Teach</h2>
          <p className="text-slate-600 mt-2">
            Structured content, chapter-wise progression, and peer-reviewed
            outcomes keep learning consistent and measurable.
          </p>
        </article>
      </section>
    </main>
  );
};
