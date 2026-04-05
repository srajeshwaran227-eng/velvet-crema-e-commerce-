const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/checkout", (req, res) => {
  const { items, total } = req.body;

  const order = {
    id: Date.now(),
    shop: "Velvet Crema ☕",
    items,
    total,
    date: new Date().toLocaleString()
  };

  res.json(order);
});

app.listen(5000, () => console.log("Server running"));