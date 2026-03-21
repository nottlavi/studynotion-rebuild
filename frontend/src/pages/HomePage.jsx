import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="site-shell flex flex-col gap-5 float-in">
      <section className="page-hero">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Ed-tech platform for practical careers
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-extrabold max-w-2xl text-slate-900">
          Build future-ready skills with creator-led cohorts.
        </h1>
        <p className="mt-3 text-slate-700 max-w-2xl">
          Learn by shipping projects, collecting mentor feedback, and joining a
          focused peer community.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/signup">
            <button type="button">Start Learning</button>
          </Link>
          <Link to="/course-category/6978c3293f8f362f1f92317c">
            <button
              type="button"
              className="!bg-white !text-slate-900 !border !border-slate-300"
            >
              Browse Catalog
            </button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <article className="section-card">
          <h3 className="font-bold text-lg">Project-first curriculum</h3>
          <p className="text-slate-600 mt-1">
            Every course culminates in deployable portfolio work.
          </p>
        </article>
        <article className="section-card">
          <h3 className="font-bold text-lg">Mentor Office Hours</h3>
          <p className="text-slate-600 mt-1">
            Weekly live sessions with real engineering teams.
          </p>
        </article>
        <article className="section-card">
          <h3 className="font-bold text-lg">Job-ready pathways</h3>
          <p className="text-slate-600 mt-1">
            Role-based tracks in web dev, backend, and system design.
          </p>
        </article>
      </section>
    </main>
  );
};

export default HomePage;
