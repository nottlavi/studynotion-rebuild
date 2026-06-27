import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { toaster } from "../components/ui/toaster";
import { FaStar } from "react-icons/fa";

export const CourseCategory = () => {
  //managing dependencies here
  const { categoryId } = useParams();

  //managing states here
  const [categoryCourses, setCategoryCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryDetailsById = async (e) => {
      try {
        setLoading(true);
        const res = await api.get(`/category/get-category-by-id/${categoryId}`);
        if (res) {
          setCategoryCourses(res.data.category.courses);
        }
      } catch (err) {
        toaster.add({
          title: "Load failed",
          description: err?.message || "Could not load category",
          type: "error",
          closable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryDetailsById();
  }, [categoryId]);

  return (
    <main className="site-shell category-page float-in">
      <section className="page-hero mb-4">
        <p className="eyebrow text-xs uppercase tracking-[0.16em] text-slate-500">
          Catalog
        </p>
        <h1 className="page-title text-4xl font-extrabold mt-2">
          Explore Courses
        </h1>
        <p className="page-lead text-slate-700 mt-2">
          Handpicked programs focused on applied skills and portfolio growth.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          categoryCourses.map((ele) => (
            <Link
              to={`/course/${ele._id}`}
              key={ele._id}
              className="section-card course-card flex flex-col gap-2 hover:-translate-y-1 transition"
            >
              <img
                src={ele?.thumbnail}
                className="rounded-xl h-44 w-full object-cover"
                alt="thumbnail"
              />
              <div className="text-lg font-bold">{ele?.title}</div>
              {/* div for count and average rating */}
              <div className="flex gap-1 items-center text-slate-700">
                <p className="font-semibold">{ele?.rating?.average}</p>
                {/* div for rating stars */}
                <div className="flex justify-center gap-1">
                  <FaStar
                    className={
                      ele?.rating?.average >= 1
                        ? "text-yellow-500"
                        : "text-white "
                    }
                  />
                  <FaStar
                    className={
                      ele?.rating?.average >= 2
                        ? "text-yellow-500"
                        : "text-white "
                    }
                  />
                  <FaStar
                    className={
                      ele?.rating?.average >= 3
                        ? "text-yellow-500"
                        : "text-white "
                    }
                  />
                  <FaStar
                    className={
                      ele?.rating?.average >= 4
                        ? "text-yellow-500"
                        : "text-white "
                    }
                  />
                  <FaStar
                    className={
                      ele?.rating?.average >= 5
                        ? "text-yellow-500"
                        : "text-white "
                    }
                  />
                </div>
                {/* review count */}
                <p>({ele?.rating?.count} ratings)</p>
              </div>
              <div className="text-xl font-extrabold text-blue-700 price-tag">
                ₹ {ele?.price}
              </div>
            </Link>
          ))
        )}
      </section>
    </main>
  );
};
