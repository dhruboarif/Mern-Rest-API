const express = require('express');
const router = express('router');
const bcrypt = require('bcryptjs');
const UserController = require('../Controllers/MongooseCrud');

// router.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// router.get('/register', (req, res) => {
//     res.send('Hello World!')
// })


const User = require("../Model/UserModel");

// Register
router.post("/register", UserController.createUser);

// Login
router.post("/login", UserController.login);

router.post("/changepassword", UserController.changePassword);

router.get("/getuser", UserController.getUser);

module.exports = router; 