const UserModel = require("../Model/UserModel");
const bcrypt = require('bcryptjs');

exports.getUser = (req, res) => {
    let Query = {};
    let Projection = "Name email";
    UserModel.find(Query, Projection, (err, data) => {
        if (err) {
            res.status(400).json({ status: "Fail", data: err });
        } else {
            res.status(201).json({ status: "success", data: data })
        }
    })
}

exports.createUser = async (req, res) => {

    try {
        console.log(req.body);
        const { first_name, last_name, email, password, role } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            role,// sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        res.status(200).send("Done");
    } catch { };
}


exports.login = async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            // user
            res.status(200).json(user);
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};

exports.changePassword = async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password, newPassword } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            // user
            UserModel.findByIdAndUpdate(user.id, { password: newPassword }, (err, data) => {
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
};


exports.updateUser = async (req, res) => {
    let id = req.params.id;
    let Query = { _id: id };
    let reqBody = req.body;

    UserModel.updateOne(Query, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "Ok", data: data });
        };
    })
}


exports.DeleteStudent = (req, res) => {
    let id = req.params.id;
    let Query = { _id: id };

    UserModel.remove(Query, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err });
        } else {
            res.status(200).json({ status: "Ok", data: data });
        };
    })
}
