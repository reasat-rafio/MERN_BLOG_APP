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
      if (allBlogs) {
         res.status(200).json({
            success: true,
            data: allBlogs,
         });
      } else {
         res.json({
            success: false,
            error: "eror",
         });
      }
   } catch (error) {
      // server response if it failed to get the data
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

// @DESC    post a new blog
// @METHOD  POST
// ROUTE    /blogs/post
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
      // server response if it fail to get the data
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

// DESC     delete a blog
// METHOD   DELETE
// ROUTE    blogs/delete/:id
export const blogs_delete = async (req, res) => {
   // getting the id from request url
   const id = req.params.id;
   try {
      // finding the blog
      const blog = await Blog.findById(id);

      // if that blog dont exist
      if (!blog) {
         return res.status(404).json({
            success: false,
            error: "Blog dont exist",
         });
      }

      if (blog.user == req.cookies.id) {
         // Deleting the blog from database
         const deletedBlog = await Blog.remove({ _id: id });
         // server response at success
         res.status(200).json({
            success: true,
            data: deletedBlog,
         });
      }
   } catch (error) {
      // server response if it fail to get the data
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

//    @DESC    Update or edit a existing blog
//    @METHOD  PETCH
//    @ROUTE   /blogs/edit/:id
export const blogs_patch = async (req, res) => {
   // getting the id from request url
   const id = req.params.id;
   try {
      // finding the blog
      const blog = await Blog.findById(id);
      // if that blog dont exist
      if (!blog) {
         // server response at success
         return res.status(404).json({
            success: false,
            error: "Blog dont exist",
         });
      }

      // Editing the blog from database
      const updateBlog = await Blog.findByIdAndUpdate(
         id,
         { ...req.body, id },
         { new: true }
      );

      // server response at success
      res.status(201).json({
         success: true,
         data: updateBlog,
      });
   } catch (error) {
      console.log(error);
      // server response if it fail to get the data
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};
