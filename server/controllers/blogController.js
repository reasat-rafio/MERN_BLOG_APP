import Blog from "../models/blogModel.js";

// @DESC    get all the blogs
// @METHOD  GET
// @ROUTE   /blogs
export const blogs_get = async (req, res) => {
   try {
      // Getting all the blogs from database
      const allBlogs = await Blog.find()
         .populate("user")
         .sort({ createdAt: "desc" });

      // server response at success
      res.status(200).json({
         success: true,
         data: allBlogs,
      });
   } catch (error) {
      // server response if it failed to get the data
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

// @DESC    post a new blog
// @METHOD POST
// ROUTE /post
export const blogs_post = async (req, res) => {
   try {
      // setting the user in database as the logged in user id from the server
      req.body.user = req.cookies.id;

      // Creating a new blog
      const newBlog = await Blog.create(req.body);

      // server response at success
      res.status(201).json({
         success: true,
         data: newBlog,
      });
   } catch (error) {
      // server response if it failed to get the data
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};
