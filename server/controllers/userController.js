import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Blog from "../models/blogModel.js";
import cloudinary from "../utils/cloudinary.js";

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

         res.cookie("id", _id, {
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
         res.status(200).json({
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
      res.cookie("id", "", { maxAge: 1 });
      res.status(200).json({
         success: true,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

// @DESC    User liked a blog
// @METHOD  POST
// @ROUTE   /like/:id
export const likeBlog_post = async (req, res) => {
   try {
      // gettning the blog _id from params
      const blogId = req.params.id;

      // getting the user _id
      const { user_id } = req.body;

      // updating the user
      await User.updateOne(
         { _id: user_id },
         {
            $addToSet: {
               likedPost: blogId,
            },
         }
      );

      // getting the blog
      const blog = await Blog.find({ _id: blogId });

      // Uploading the like count
      await Blog.updateOne(
         {
            _id: blogId,
         },
         {
            $inc: {
               likeCount: +1,
            },
         }
      );

      // getiing the user and updated blog
      const user = await User.find({ _id: user_id });
      const allBlogs = await Blog.find({})
         .sort({ createdAt: -1 })
         .populate("user");

      res.status(200).json({
         seccess: true,
         data: { blog: allBlogs, user },
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         seccess: false,
         error: error.message,
      });
   }
};

//    @DESC    unliking a blog post
//    @METHOD  POST
//    @ROUTE   /dislike/:id
export const dislikeBlog_post = async (req, res) => {
   try {
      // gettning the blog _id from params
      const blogId = req.params.id;

      // getting the user _id
      const { user_id } = req.body;

      // updating the user
      const x = await User.updateOne(
         { _id: user_id },
         {
            $pull: {
               likedPost: blogId,
            },
         }
      );

      // getting the blog
      // const blog = await Blog.find({ _id: blogId });

      // Getting the liked blogs
      const likedBlog = await User.find({ _id: user_id }).populate({
         path: "likedPost",
         options: { sort: { createdAt: -1 } },
         populate: { path: "user" },
      });

      // Uploading the like count
      await Blog.updateOne(
         {
            _id: blogId,
         },
         {
            $inc: {
               likeCount: -1,
            },
         }
      );

      // getiing the user and updated blog
      const user = await User.find({ _id: user_id });
      const allBlogs = await Blog.find({})
         .sort({ createdAt: -1 })
         .populate("user");

      res.status(200).json({
         seccess: true,
         data: { blog: allBlogs, user, likedBlog },
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         seccess: false,
         error: error.message,
      });
   }
};

//    @DESC    User Profile Picture Upload
//    @METHOd  POST
//    @ROUTE   /dp-upload/:id
export const profilePictureUpload_post = async (req, res) => {
   try {
      // Getting the base64 image from the request
      const { base64Image } = req.body;

      // getting the user
      const _id = req.params.id;

      // uploading the image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
         upload_preset: "blog_app",
      });

      console.log(uploadResponse);

      // updating the user
      await User.updateOne(
         { _id },
         {
            $set: {
               image: uploadResponse.url,
            },
         }
      );
      // getting the updated user
      const updateUser = await User.find({ _id });

      res.status(200).json({
         success: true,
         data: updateUser,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         error: "Server error",
      });
   }
};
