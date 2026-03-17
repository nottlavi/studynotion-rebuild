import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

export const CourseCategory = () => {
  //managing dependencies here
  const { categoryId } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //managing states here
  const [categoryCourses, setCategoryCourses] = useState([]);

  useEffect(() => {
    const fetchCategoryDetailsById = async (e) => {
      try {
        const res = await axios.get(
          `${BASE_URL}/category/get-category-by-id/${categoryId}`,
        );
        if (res) {
          setCategoryCourses(res.data.category.courses);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategoryDetailsById();
  }, [categoryId]);

  useEffect(() => {
    console.log(categoryCourses);
  }, [categoryCourses]);

  return (
    <div>
      {categoryCourses.map((ele) => {
        return (
          // the individual course
          <Link
            to={`/course/${ele._id}`}
            key={ele._id}
            className="flex flex-col"
          >
            <img src={ele?.thumbnail} width={100} height={100} />
            <div>{ele?.title}</div>
            {/* div for count and average rating */}
            <div className="flex gap-1 ">
              <p>{ele?.rating?.average}</p>
              {/* div for rating stars */}
              <div className="flex justify-center gap-1 pb-4">
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
            <div>Rs. {ele?.price}</div>
          </Link>
        );
      })}
    </div>
  );
};
