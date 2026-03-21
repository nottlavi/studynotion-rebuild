import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className="site-shell">
      <section className="glass-panel p-8 text-center float-in">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
          404
        </p>
        <h1 className="text-5xl font-extrabold mt-2">Page Not Found</h1>
        <p className="text-slate-600 mt-3">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="inline-block mt-5">
          <button type="button">Go To Home</button>
        </Link>
      </section>
    </main>
  );
};
