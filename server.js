const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// todo connect to mongodb

mongoose.connect(
  "mongodb+srv://yoonjh517:Zpfhfh12@cluster0.qcnsn.mongodb.net/Cluster0?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// todo data schema

const itemSchema = {
  title: String,
  description: String,
};

// todo data medel

const Item = mongoose.model("Item", itemSchema);

// todo read route

app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("errer: " + err));
});

// todo post(create) route

app.post("/newitem", (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
  });
  newItem
    .save()
    .then((item) => console.log(item))
    .catch((err) => res.status(400).json("Error " + err));
});

// todo delete

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Item.findOneAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      console.log("item deleted");
    } else {
      console.log(err);
    }
  });
});

// todo update

app.put("/put/:id", (req, res) => {
  const updatedItem = {
    title: req.body.title,
    description: req.body.description,
  };

  Item.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedItem },
    (req, res, err) => {
      if (!err) {
        console.log("item updated");
      } else {
        console.log(err);
      }
    }
  );
});

// * port connection
app.listen(port, function () {
  console.log(`Express is running on port ${port}`);
});
