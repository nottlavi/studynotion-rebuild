import { useEffect, useState } from "react";

//importing redux stuff here
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseTotal } from "../../slices/cartSlice";
import { fetchUserProfile } from "../../slices/userSlice";
import { toaster } from "../../components/ui/toaster";

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
  const [loadingRemoveId, setLoadingRemoveId] = useState(null);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [, setLoadingFetch] = useState(false);

  ///all the functions here
  //function to remove course from the cart
  const handleRemove = async (courseId, price) => {
    try {
      setLoadingRemoveId(courseId);
      const res = await api.put(`/cart/remove-from-cart`, { courseId });

      if (res) {
        setCartCourses((prev) =>
          prev.filter((course) => course._id !== courseId),
        );
        dispatch(removeFromCart());
        dispatch(decreaseTotal(price));
        toaster.add({
          title: "Removed",
          description: "Course removed from cart.",
          type: "success",
          closable: true,
        });
      }
    } catch (err) {
      toaster.add({
        title: "Remove failed",
        description: err?.message || "Could not remove course",
        type: "error",
        closable: true,
      });
    } finally {
      setLoadingRemoveId(null);
    }
  };

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
      setLoadingBuy(true);
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded) {
        toaster.add({
          title: "Payment failed",
          description: "Razorpay SDK failed to load.",
          type: "error",
          closable: true,
        });
        setLoadingBuy(false);
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
            toaster.add({
              title: "Payment",
              description: data.message,
              type: "success",
              closable: true,
            });

            if (data.message === "Payment verified successfully") {
              await verifyAdd(cartCourses);
            }
          } catch (err) {
            toaster.add({
              title: "Payment verification failed",
              description: err?.message || "Verification error",
              type: "error",
              closable: true,
            });
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
      toaster.add({
        title: "Payment failed",
        description: error?.message || "Initialization failed",
        type: "error",
        closable: true,
      });
    } finally {
      setLoadingBuy(false);
    }
  };

  // commenting this for now
  const verifyAdd = async (cartCourses) => {
    try {
      const res = await api.post(`/courses/enroll-course`, {
        courseIds: courseToBeEnrolled,
      });
      if (res) {
        for (let i = 0; i < courseToBeEnrolled.length; i++) {
          try {
            const rem = await api.put(`/cart/remove-from-cart`, {
              courseId: courseToBeEnrolled[i],
            });
            if (rem) {
              setCartCourses((prev) =>
                prev.filter((course) => course._id !== courseToBeEnrolled[i]),
              );
              dispatch(removeFromCart());
              dispatch(decreaseTotal(cartCourses[i].price));
            }
          } catch (err) {
            // ignore per-item failures
          }
        }
        await dispatch(fetchUserProfile());
        toaster.add({
          title: "Enrolled",
          description: "Courses enrolled successfully.",
          type: "success",
          closable: true,
        });
      }
    } catch (err) {
      toaster.add({
        title: "Enroll failed",
        description: err?.message || "Enrollment error",
        type: "error",
        closable: true,
      });
    }
  };

  /// all useEffects here
  // to fetch cart details on profile change

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        setLoadingFetch(true);
        const res = await api.get(`/cart/get-cart-by-user-id`);
        const courses = res.data.cart.courses || [];
        setCartCourses(courses);
        setCourseToBeEnrolled(courses.map((c) => c._id));
      } catch (err) {
        toaster.add({
          title: "Cart load failed",
          description: err?.message || "Could not load cart",
          type: "error",
          closable: true,
        });
      } finally {
        setLoadingFetch(false);
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
                    disabled={loadingRemoveId === ele._id}
                  >
                    {loadingRemoveId === ele._id ? "Removing..." : "Remove"}
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
          <button onClick={() => buyHandler(cartCourses)} disabled={loadingBuy}>
            {loadingBuy ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
};
