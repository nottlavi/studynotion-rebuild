import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

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
          `${BASE_URL}/category/get-category-by-id/${categoryId}`
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

  return (
    <div>
      {categoryCourses.map((ele) => {
        return (
          <Link to={`/course/${ele._id}`} key={ele._id}>
            <div>{ele.title}</div>
          </Link>
        );
      })}
    </div>
  );
};
