router.post("/create-order", async (req, res) => {
  const Razorpay = require("razorpay");

  exports.createOrder = async () => {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,

      key_secret: process.env.RAZORPAY_SECRET,
    });
  };
});
