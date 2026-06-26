import { useEffect, useState } from "react";

//importing redux stuff here
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseTotal } from "../../slices/cartSlice";
import { fetchUserProfile } from "../../slices/userSlice";

//importing dependencies here
import api from "../../utils/api";

const categoryNameMap = {
  "web-development": "Web Development",
};

export const CartPage = () => {
  ///all the redux stuff here
  const profile = useSelector((state) => state.user.profile);
  const cartTotal = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  ///all the dependencies here

  ///all the states here
  const [cartCourses, setCartCourses] = useState([]);
  const [courseToBeEnrolled, setCourseToBeEnrolled] = useState([]);

  ///all the functions here
  //function to remove course from the cart
  const handleRemove = async (courseId, price) => {
    try {
      const res = await api.put(`/cart/remove-from-cart`, {
        courseId: courseId,
      });

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

  console.log(process.env);
  console.log(process.env.REACT_APP_RAZORPAY_KEY_ID);

  const buyHandler = async () => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    try {
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded) {
        alert("Razorpay SDK failed to load. Are you offline?");
        return;
      }

      const res = await api.post("/razorpay/create-order", {
        amount: cartTotal,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        currency: res?.data?.currency,
        name: "StudyNotion Rebuild",
        description: "Test Transactions",
        order_id: res?.data?.id,
        handler: async function (response) {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data } = await api.post(
              "/razorpay/verify-payment",
              verifyPayload,
            );
            alert(data.message);
          } catch (err) {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initialization failed", error);
    }
  };

  // commenting this for now
  // const buyHandler = async (cartCourses) => {
  //   try {
  //     const res = await api.post(`/courses/enroll-course`, {
  //       courseIds: courseToBeEnrolled,
  //     });
  //     if (res) {
  //       console.log(res);
  //       for (let i = 0; i < courseToBeEnrolled.length; i++) {
  //         try {
  //           const res = await api.put(`/cart/remove-from-cart`, {
  //             courseId: courseToBeEnrolled[i],
  //           });
  //           if (res) {
  //             console.log(res);
  //             setCartCourses((prev) =>
  //               prev.filter((course) => course._id !== courseToBeEnrolled[i]),
  //             );
  //             //updating the redux states here
  //             dispatch(removeFromCart());
  //             dispatch(decreaseTotal(cartCourses[i].price));
  //           }
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       }
  //       await dispatch(fetchUserProfile());
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  ///all useEffects here
  //to fetch cart details on profile change

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const res = await api.get(`/cart/get-cart-by-user-id`);
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
    <div className="cart-page">
      {/* the cart div */}
      <div className="text-2xl font-extrabold page-title">Cart</div>
      {/* no of courses and hr line div */}
      <div className="text-slate-600 mt-1">
        {cartCourses.length > 1
          ? `${cartCourses.length} courses in the cart`
          : `${cartCourses.length} course in the cart`}
        <hr />
      </div>
      {/* actual courses and checkout div */}
      <div className="grid lg:grid-cols-[1fr_260px] gap-3 mt-3">
        {/* actual courses */}
        <div className="flex flex-col gap-2">
          {cartCourses.map((ele) => {
            return (
              // the individual course
              <div
                key={ele._id}
                className="section-card list-row flex justify-between"
              >
                {/* collective div for thumbnail and info */}
                <div className="flex gap-4">
                  {/* div for image thumbnail */}
                  <div>
                    <img
                      src={ele.thumbnail}
                      width={150}
                      height={150}
                      className="rounded-xl object-cover list-row-media"
                      alt="thumbnail"
                    />
                  </div>
                  {/* for titles and info */}
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">{ele.title}</p>
                    <p className="text-slate-600">
                      {categoryNameMap[ele.category.name]}
                    </p>
                    {/* <p>need to add ratings here</p> */}
                    {/* <p>need to add no of ratings here</p> */}
                  </div>
                </div>
                {/* for remove from cart and price */}
                <div className="flex flex-col items-end gap-2">
                  {/* for remove icon/button */}
                  <button
                    className="btn-secondary"
                    onClick={() => handleRemove(ele._id, ele.price)}
                  >
                    Remove
                  </button>
                  {/* for course price */}
                  <div className="font-bold text-blue-700">{`₹${ele.price}`}</div>
                </div>
              </div>
            );
          })}
        </div>
        {/* checkout div */}
        <div className="section-card checkout-card flex flex-col justify-between h-fit gap-3">
          {/* total div */}
          <div>
            <p>Total:</p>
            <p className="text-2xl font-extrabold text-blue-700">{`₹ ${cartTotal}`}</p>
          </div>
          {/* Buy Now button */}
          <button onClick={() => buyHandler(cartCourses)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};
