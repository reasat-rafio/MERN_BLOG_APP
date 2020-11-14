import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @DESC    register a new user
// @METHOD  POST
// @ROUTE   /register
export const register_post = async (req, res) => {
   const user = req.body;
   try {
      const newUser = await User.create(user);

      res.status(201).json({
         success: true,
         data: newUser,
         error: "",
      });
      console.log(`new User is ${newUser}`.bgGreen);
   } catch (error) {
      res.status(201).json({
         success: false,
         error: error.message,
      });
      console.log(`User register error ${error}`.bgRed);
   }
};

// @DESC    login an existing user
// @METHOD  POST
// @ROUTE   /login
export const login_post = async (req, res) => {
   const { email, password } = req.body;
   try {
      const loginUser = await User.login(email, password);

      //user exist
      if (loginUser.user) {
         const { _id } = loginUser.user;

         // creating the jwt token
         const jwtCookie = jwt.sign({ _id }, process.env.SECRET, {
            expiresIn: 3 * 24 * 60 * 60,
         });

         // setting the jwt token to cookies
         res.cookie("jwt", jwtCookie, {
            httpOnly: true,
            maxAge: 1000 * 3 * 24 * 60 * 60,
         });

         res.status(200).json({
            success: true,
            user: loginUser.user,
         });
      }

      //user dont exit or password is wrong
      if (loginUser.error) {
         res.status(201).json({
            success: false,
            error: loginUser.error,
         });
      }
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

// @DESC    register a new user
// @METHOD  GET
// @ROUTE   /register
export const logout_post = async (req, res) => {
   try {
      res.cookie("jwt", "", { maxAge: 1 });
      res.status(200).json({
         success: true,
      });
      console.log(req.cookies.jwt);
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

// @DESC    register a new user
// @METHOD  GET
// @ROUTE   /register
export const signinCONT = (req, res) => {
   res.send("Yo");
};
