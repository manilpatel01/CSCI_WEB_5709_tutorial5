const express = require("express");
const router = express.Router();
let users = [
    {
      email: "abc@email.com",
      firstName: "User1",
      id: "000x123",
    },
    {
      email: "xyz@email.com",
      firstName: "User2",
      id: "000x124",
    },
  ];
  
  function addUser(user) {
    users.push(user);
  }
  
  module.exports = {
    users,
    addUser
  };
  