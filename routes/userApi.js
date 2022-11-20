const express = require('express');
const router = express('router');
const bcrypt = require('bcryptjs');

// router.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// router.get('/register', (req, res) => {
//     res.send('Hello World!')
// })


const User = require("../Model/UserModel");

// Register
router.post("/register", async (req, res) => {
    try {

        console.log(req.body);
        const { first_name, last_name, email, password, role } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            role,// sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        res.status(200).send("Done");
    } catch { }
});

// Login
router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});


router.post("/changepassword", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password, newPassword } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            // user
            User.findByIdAndUpdate(user.id, { password: newPassword }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
        res.status(400).send("Password changed successfully");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

module.exports = router; 