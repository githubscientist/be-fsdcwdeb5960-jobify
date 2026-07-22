// import the user model
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../utils/config');

// setup authController as object of functions
const authController = {
    // register
    register: async (request, response) => {
        try {
            // get name, email, password from request body
            const { name, email, password} = request.body;

            // check if user with the same email already exists in the database
            const existingUser = await User.findOne({ email });

            // if yes, return a 400 response with message "User already exists"
            if (existingUser) {
                return response.status(400).json({ message: "User already exists" });
            }

            // hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));

            // create a new user object using User model
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            // save the user object to the database
            await newUser.save();

            // return a success response
            return response.status(201).json({ message: "User registered successfully" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // login
    login: async (request, response) => {
        try {
            return response.status(200).json({ message: "login route" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // get the profile of the logged in user
    me: async (request, response) => {
        try {
            return response.status(200).json({ message: "me route" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // logout
    logout: async (request, response) => {
        try {
            return response.status(200).json({ message: "logout route" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    }
}

// export the authController
module.exports = authController;