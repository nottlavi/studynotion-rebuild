import { useState } from "react";
import axios from "axios";

export const AddCourse = () => {
  //managing states here
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  // this is just for the single tag which is being typed in, in this moment
  const [tag, setTag] = useState("");

  //managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //function to update the tags array
  const addTag = async () => {
    setTags([...tags, tag]);
    setTag("");
  };

  //function to create the course using backend
  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/courses/create-course`,
        { title, tags },
        { withCredentials: true }
      );
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={createCourse}>
        {/* section for the title */}
        <label htmlFor="title">
          Course Title <sup className="text-red-600">*</sup>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {/* section for tags */}
        {tags.map((ele, idx) => {
          return <div key={idx}>{ele}</div>;
        })}
        <label htmlFor="tags">
          tag(s) <sup className="text-red-600">*</sup>
        </label>
        <input
          id="title"
          type="text"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
        />
        <button onClick={addTag} type="button">
          add tag!
        </button>
        <br />
        <button type="submit">next</button>
      </form>
    </div>
  );
};
