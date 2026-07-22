// import the company model
const Company = require('../models/company');

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
            return response.status(200).json({ message: "get all companies endpoint" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to get a single company
    getCompanyByID: async (request, response) => {
        try {
            return response.status(200).json({ message: "get company by id endpoint" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to update a company
    updateCompany: async (request, response) => {
        try {
            return response.status(200).json({ message: "update company endpoint" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to delete a company
    deleteCompany: async (request, response) => {
        try {
            return response.status(200).json({ message: "delete company endpoint" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to create a recruiter
    createRecruiter: async (request, response) => {
        try {
            return response.status(200).json({ message: "create recruiter endpoint" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    // to get all recruiters
    getAllRecruiters: async (request, response) => {
        try {
            return response.status(200).json({ message: "get all recruiters endpoint" });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    }
}

module.exports = adminController;