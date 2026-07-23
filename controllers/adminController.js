// import the company model
const Company = require('../models/company');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../utils/config');

const adminController = {
    // to create a new company
    createCompany: async (request, response) => {
        try {
            // get name, description, industry, location, website, size, foundedYear from the request body
            const {name, description, industry, location, website, size, foundedYear} = request.body;

            // check if the company already exists with the name provided in the request body
            const companyExists = await Company.findOne({ name: name });

            // if yes, return a 400 status code with a message "Company already exists"
            if (companyExists) {
                return response.status(400).json({ message: "Company already exists" });
            }
            // create a new company object with the Company model and the data from the request body
            const newCompany = new Company({
                name,
                description,
                industry,
                location,
                website,
                size,
                foundedYear,
                createdBy: request.user._id
            });

            // save the new company object to the database and store the result in a variable
            const savedCompany = await newCompany.save();

            // delete the __v property from the savedCompany object
            const { __v, ...result } = savedCompany.toObject();

            // return a 201 status code with a message "Company created successfully" and the result 
            return response.status(201).json({ message: "Company created successfully", result });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to get all companies
    getAllCompanies: async (request, response) => {
        try {
            // get all the companies from the database and store the result in a variable
            const companies = await Company.find().populate('createdBy', 'name email');

            // return a 200 status code with a message "Companies retrieved successfully" and the result
            return response.status(200).json({ message: "Companies retrieved successfully", result: companies });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to get a single company
    getCompanyByID: async (request, response) => {
        try {
            // get the company id from the request params
            const { id } = request.params;

            // get the company from the database using the id and store the result in a variable
            const company = await Company.findById(id).populate('createdBy', 'name email');

            // if the company does not exist, return a 404 status code with a message "Company not found"
            if (!company) {
                return response.status(404).json({ message: "Company not found" });
            }

            // return a 200 status code with a message "Company retrieved successfully" and the result
            return response.status(200).json({ message: "Company retrieved successfully", result: company });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to update a company
    updateCompany: async (request, response) => {
        try {
            // get the company id from the request params
            const { id } = request.params;

            // get the company details from the request body
            const { name, description, industry, location, website, size, foundedYear } = request.body;

            // find the company by id and update it with the new details
            const updatedCompany = await Company.findByIdAndUpdate(id, {
                name,
                description,
                industry,
                location,
                website,
                size,
                foundedYear
            }, { new: true });

            // return a 200 status code with a message "Company updated successfully" and the updated company details
            return response.status(200).json({ message: "Company updated successfully", result: updatedCompany });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to delete a company
    deleteCompany: async (request, response) => {
        try {
            // get the company id from the request params
            const { id } = request.params;

            // delete the company from the database using the id and store the result in a variable
            const deletedCompany = await Company.findByIdAndDelete(id);

            // if the company does not exist, return a 404 status code with a message "Company not found"
            if (!deletedCompany) {
                return response.status(404).json({ message: "Company not found" });
            }   

            // return a 200 status code with a message "Company deleted successfully" and the result
            return response.status(200).json({ message: "Company deleted successfully", result: deletedCompany });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to create a recruiter
    createRecruiter: async (request, response) => {
        try {
            // get the company id from the request params
            const { id } = request.params;

            // create a new user with the role recruiter and assign to a company
            // get the details (name, email, password) from the request body
            const { name, email, password } = request.body;

            // check if the user exists with the email provided in the request body
            const user = await User.findOne({ email: email });

            // if yes, return a 400 status code with a message "User already exists"
            if (user) {
                return response.status(400).json({ message: "User already exists" });
            }

            // check if the company exists with the companyId provided in the request body
            const company = await Company.findById(id);

            // if no, return a 404 status code with a message "Company not found"
            if (!company) {
                return response.status(404).json({ message: "Company not found" });
            }

            // hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));

            // create a new user object with the User model and the data from the request body
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role: 'recruiter',
                assignedCompany: company._id
            })

            // save the new user object to the database and store the result in a variable
            const savedUser = await newUser.save();

            // if the user is not created, return a 500 status code with a message "Recruiter creation failed"
            if (!savedUser) {
                return response.status(500).json({ message: "Recruiter creation failed" });
            }

            // delete the password and __v property from the savedUser object
            const { password: _, __v, ...result } = savedUser.toObject();

            // return a 201 status code with a message "Recruiter created successfully" and the result
            return response.status(201).json({ message: "Recruiter created successfully", result });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to get all recruiters
    getAllRecruiters: async (request, response) => {
        try {
            // get the company id from the request params
            const { id } = request.params;

            // check if the company exists with the companyId provided in the request params
            const company = await Company.findById(id);

            // if no, return a 404 status code with a message "Company not found"
            if (!company) {
                return response.status(404).json({ message: "Company not found" });
            }

            // get all the recruiters from the database using the companyId and store the result in a variable
            const recruiters = await User.find({ assignedCompany: id, role: 'recruiter' }).select('-password -__v');

            // return a 200 status code with a message "Recruiters retrieved successfully" and the result
            return response.status(200).json({ message: "Recruiters retrieved successfully", result: recruiters });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    }
}

module.exports = adminController;