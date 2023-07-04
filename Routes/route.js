const express = require("express");
const router = express.Router();
const usersController = require("../Controller/userController");

router.get("/users", usersController.getUsers);
router.post("/add", usersController.addUser);
router.get("/user/:id", usersController.getUserById);
router.put("/update/:id", usersController.updateUser);

module.exports = router;