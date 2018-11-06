import { Router } from "express";
import moment from "moment";

const api = db => {
  const router = Router();
  const boards = db.collection("boards");
  const users = db.collection("users");

  // Replace the entire board every time the users modifies it in any way.
  // This solution sends more data than necessary, but cuts down on code and
  // effectively prevents the db and client from ever getting out of sync
  router.put("/board", (req, res) => {
    const board = req.body;
    boards
      .replaceOne({ _id: board._id, users: req.user._id }, board, {
        upsert: true
      })
      .then(result => {
        res.send(result);
      });
  });

  router.delete("/board", (req, res) => {
    const { boardId } = req.body;
    boards.deleteOne({ _id: boardId }).then(result => {
      res.send(result);
    });
  });

  router.put("/user", (req, res) => {
    const user = req.body;

    users
      .updateOne(
        { _id: user._id },
        {
          $set: {
            accessToken: user.accessToken,
            expiryDate: user.expiryDate
          }
        }
      )
      .then(result => {
        res.send(result);
      });
  });

  return router;
};

export default api;
