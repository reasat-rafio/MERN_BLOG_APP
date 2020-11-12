import UserModel from "../models/userModel.js";

// @DESC    register a new user
// @METHOD  POST
// @ROUTE   /register
export const register_post = async (req, res) => {
   const user = req.body;
   try {
      const newUser = await UserModel.create(user);

      res.status(201).json({
         success: true,
         data: newUser,
         error: "",
      });
   } catch (error) {
      console.log(`User register error ${error}`.bgRed);
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

// @DESC    login a user
// @METHOD  Post
// @ROUTE   /register
export const loginCONT = (req, res) => {
   res.send("Yo");
};

// @DESC    register a new user
// @METHOD  GET
// @ROUTE   /register
export const logoutCONT = (req, res) => {
   res.send("Yo");
};

// @DESC    register a new user
// @METHOD  GET
// @ROUTE   /register
export const signinCONT = (req, res) => {
   res.send("Yo");
};
