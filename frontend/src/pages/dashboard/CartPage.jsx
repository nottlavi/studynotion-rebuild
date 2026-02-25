import { useEffect, useState } from "react";

//importing redux stuff here
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseTotal } from "../../slices/cartSlice";

//importing dependencies here
import axios from "axios";

const categoryNameMap = {
  "web-development": "Web Development",
};

export const CartPage = () => {
  ///all the redux stuff here
  const profile = useSelector((state) => state.user.profile);
  const cartTotal = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  ///all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  ///all the states here
  const [cartCourses, setCartCourses] = useState([]);
  const [courseToBeEnrolled, setCourseToBeEnrolled] = useState([]);

  ///all the functions here
  //function to remove course from the cart
  const handleRemove = async (courseId, price) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/cart/remove-from-cart`,
        { courseId: courseId },
        { withCredentials: true },
      );

      if (res) {
        //updating the ui here after backend deleted the course from the cart
        setCartCourses((prev) =>
          prev.filter((course) => course._id !== courseId),
        );
        //updating redux here
        dispatch(removeFromCart());
        dispatch(decreaseTotal(price));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const buyHandler = async (cartCourses) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/courses/enroll-course`,
        { courseIds: courseToBeEnrolled },
        { withCredentials: true },
      );
      if (res) {
        console.log(res);
        for (let i = 0; i < courseToBeEnrolled.length; i++) {
          try {
            const res = await axios.put(
              `${BASE_URL}/cart/remove-from-cart`,
              {
                courseId: courseToBeEnrolled[i],
              },
              { withCredentials: true },
            );
            if (res) {
              console.log(res);
              setCartCourses((prev) =>
                prev.filter((course) => course._id !== courseToBeEnrolled[i]),
              );
              //updating the redux states here
              dispatch(removeFromCart());
              dispatch(decreaseTotal(cartCourses[i].price));
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///all useEffects here
  //to fetch cart details on profile change
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/cart/get-cart-by-user-id`, {
          withCredentials: true,
        });
        const courses = res.data.cart.courses;
        setCartCourses(courses);
        setCourseToBeEnrolled(courses.map((c) => c._id));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartDetails();
  }, [profile]);

  return (
    <div>
      {/* the cart div */}
      <div>Cart</div>
      {/* no of courses and hr line div */}
      <div>
        {cartCourses.length > 1
          ? `${cartCourses.length} courses in the cart`
          : `${cartCourses.length} course in the cart`}
        <hr />
      </div>
      {/* actual courses and checkout div */}
      <div className="flex gap-3">
        {/* actual courses */}
        <div>
          {cartCourses.map((ele) => {
            return (
              // the individual course
              <div key={ele._id} className="border-b-2 flex justify-between">
                {/* collective div for thumbnail and info */}
                <div className="flex gap-4">
                  {/* div for image thumbnail */}
                  <div>
                    <img src={ele.thumbnail} width={150} height={150} />
                  </div>
                  {/* for titles and info */}
                  <div className="flex flex-col gap-2">
                    <p>{ele.title}</p>
                    <p>{categoryNameMap[ele.category.name]}</p>
                    {/* <p>need to add ratings here</p> */}
                    {/* <p>need to add no of ratings here</p> */}
                  </div>
                </div>
                {/* for remove from cart and price */}
                <div>
                  {/* for remove icon/button */}
                  <button onClick={() => handleRemove(ele._id, ele.price)}>
                    Remove
                  </button>
                  {/* for course price */}
                  <div>{`₹${ele.price}`}</div>
                </div>
              </div>
            );
          })}
        </div>
        {/* checkout div */}
        <div className="flex flex-col justify-between">
          {/* total div */}
          <div>
            <p>Total:</p>
            <p>{`₹ ${cartTotal}`}</p>
          </div>
          {/* Buy Now button */}
          <button onClick={() => buyHandler(cartCourses)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};
