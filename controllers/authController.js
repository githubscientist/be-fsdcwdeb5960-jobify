// setup authController as object of functions
const authController = {
    // register
    register: async (request, response) => {
        try {
            return response.status(200).json({ message: "register route" });
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