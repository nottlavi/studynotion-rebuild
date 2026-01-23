import { useEffect, useState } from "react";
//importing redux stuff here
import { useSelector } from "react-redux";

//importing dependencies here
import axios from "axios";

const categoryNameMap = {
  "web-development": "Web Development",
};

export const CartPage = () => {
  ///all the states here
  const [cartCourses, setCartCourses] = useState([]);

  ///all the functions here
  const handleRemove = () => {
    try {
    } catch (err) {}
  };

  ///all the redux stuff here
  const profile = useSelector((state) => state.user.profile);
  const cartTotal = useSelector((state) => state.cart.total);

  ///all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  ///all useEffects here
  //to fetch cart details on profile change
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/cart/get-cart-by-user-id`, {
          withCredentials: true,
        });
        setCartCourses(res.data.cart.courses);
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
                  <button onClick={handleRemove}>Remove</button>
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
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
};
