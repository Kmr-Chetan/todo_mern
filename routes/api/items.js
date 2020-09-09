const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
// Item Modal
const Item = require("../../models/Item");

router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  Item.find({ user_id: user_id })
    .sort({ date: -1 })
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ err : err , success: false }));;
});

router.post("/", auth, (req, res) => {
  const { item, user_id } = req.body;
  Item.updateOne(
    { user_id: user_id },
    { $push: { item: item } },
    { safe: true, upsert: true },
    function (err) {
      if (err) {
        res.status(404).json({ success: false });
      } else {
        res.json({ success: true });
      }
    }
  );
});

router.delete("/:user_id/:id", auth, (req, res) => {
  Item.update(
    { user_id: req.params.user_id },
    { $pull: { item: { _id: req.params.id } } },
    function (err) {
      if (err) {
        res.status(404).json({ success: false });
      } else {
        res.json({ success: true });
      }
    }
  ).then(data=> console.log(data));
});

module.exports = router;
