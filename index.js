const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).json({
    Message: "success !",
  });
});
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  console.log(total);
  if (total > 0) {
    // console.log("payment recieved", total);
    // res.send(total);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } else {
    res.sendStatus(404).json({
      Message: "total must be greater than 0",
    });
  }
});

const port=5055
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Amazone server Runing on port:5000,http://localhost:${port}`);
});
