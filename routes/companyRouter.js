const express = require('express');
const { createCompany, getAllCompanies, getCompanyByID, updateCompany, deleteCompany, createRecruiter, getAllRecruiters } = require('../controllers/adminController');
const { isAuthenticated, allowRoles } = require('../middlewares/auth');

const companyRouter = express.Router();

// all the following routes are admin protected routes
companyRouter.use(isAuthenticated);
companyRouter.use(allowRoles(['admin']));

companyRouter.post('/', createCompany);
companyRouter.get('/', getAllCompanies);
companyRouter.get('/:id', getCompanyByID);
companyRouter.put('/:id', updateCompany);
companyRouter.delete('/:id', deleteCompany);
companyRouter.get("/recruiters", getAllRecruiters);
companyRouter.post("/:id/recruiters", createRecruiter);

module.exports = companyRouter;