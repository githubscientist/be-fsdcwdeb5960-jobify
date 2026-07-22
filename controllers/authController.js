// import the user model
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, JWT_SECRET, ENV } = require('../utils/config');
const jwt = require('jsonwebtoken');

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
            // get email and password from request body
            const { email, password } = request.body;

            // check if user with the email exists in the database
            const user = await User.findOne({ email });

            // if not, return a 400 response with message "Invalid email or user does not exist"
            if (!user) {
                return response.status(400).json({ message: "Invalid email or user does not exist" });
            }

            // if yes, compare the password with the hashed password in the database using bcrypt
            const passwordMatch = await bcrypt.compare(password, user.password);

            // if not match, return a 400 response with message "Invalid password"
            if (!passwordMatch) {
                return response.status(400).json({ message: "Invalid password" });
            }

            // generate a JWT token for the user
            const token = await jwt.sign({ userId: user._id}, JWT_SECRET, { expiresIn: '1h' });

            // set the cookie with the token
            response.cookie('token', token, {
                httpOnly: true,
                secure: ENV === 'production', // set secure flag only in production
                sameSite: ENV === 'production' ? 'none' : 'lax', // set sameSite flag based on environment
                maxAge: 3600000 // set cookie expiration time to 1 hour
            });

            // return a success response with the token
            return response.status(200).json({ message: "User logged in successfully" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // get the profile of the logged in user
    me: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user in the database using the user id (make sure to exclude the password field from the response)
            const user = await User.findById(userId).select('-password -__v');

            // send the user object as a response
            return response.status(200).json(user);
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // logout
    logout: async (request, response) => {
        try {
            // clear the cookie with the token
            response.clearCookie('token', {
                httpOnly: true,
                secure: ENV === 'production', // set secure flag only in production
                sameSite: ENV === 'production' ? 'none' : 'lax' // set sameSite flag based on environment
            });

            // return a success response
            return response.status(200).json({ message: "User logged out successfully" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    }
}

// export the authController
module.exports = authController;