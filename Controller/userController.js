const express = require('express')
const crypto = require("crypto");
const { users, addUser } = require("../db/users");

exports.getUsers = (req, res) => {
  res.status(200).json({
    message: "Users retrieved",
    success: true,
    users: users,
  });
};

exports.addUser = (req, res) => {
  const userData = req.body;
  const { email, firstName } = userData;

  if (
    userData &&
    typeof email === "string" &&
    typeof firstName === "string"
  ) {
    const id = crypto.randomBytes(16).toString("hex");
    userData.id = id;
    addUser(userData);
    res.status(200).json({
      message: "User added",
      success: true,
    });
  } else {
    res.status(400).json({
      message: "Error: Invalid user data",
      success: false,
    });
  }
};


exports.getUserById = (req, res) => {
  const id = req.params.id;
  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    return res.status(404).json({
      message: "Error: User not found",
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    user: foundUser,
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { email, firstName } = req.body;
  const userToUpdate = users.find((user) => user.id === id);

  if (!userToUpdate) {
    return res.status(404).json({
      message: "Error: User not found",
      success: false,
    });
  }

  if (email) {
    if (typeof email !== "string") {
      return res.status(400).json({
        message: "Error: Invalid email input",
        success: false,
      });
    }
    userToUpdate.email = email;
  }

  if (firstName) {
    if (typeof firstName !== "string") {
      return res.status(400).json({
        message: "Error: Invalid firstName input",
        success: false,
      });
    }
    userToUpdate.firstName = firstName;
  }

  res.status(200).json({
    message: "User updated",
    success: true,
  });
};
