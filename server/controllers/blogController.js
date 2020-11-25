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
      // req.body.user = req.cookies.id;

      // Creating a new blog
      const newBlog = await Blog.create(req.body);
      const allBlogs = await Blog.find()
         .sort({ createdAt: -1 })
         .populate("user");

      // server response at success
      res.status(201).json({
         success: true,
         data: allBlogs,
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
   try {
      // getting the id from request url
      const id = req.params.id;

      // finding the blog
      const blog = await Blog.find({ _id: id });

      // if that blog dont exist
      if (!blog) {
         res.status(200).json({
            success: false,
            error: "Blog dont exist",
         });
      }

      if (blog && blog.user == req.cookies.id) {
         // Deleting the blog from database
         const deletedBlog = await Blog.remove({ _id: id });
         // server response at success

         // getting updated blogs
         const all_blogs = await Blog.find()
            .populate("user")
            .sort({ createdAt: "desc" });

         //
         res.status(200).json({
            success: true,
            data: all_blogs,
         });
      }
   } catch (error) {
      // server response if it fail to get the data
      console.log(error);
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
   const { title, body, user } = req.body;
   const id = req.params.id;
   try {
      // finding the blog and updating the title and body
      const updateBlog = await Blog.update(
         { _id: id },
         {
            $set: {
               title,
               body,
            },
         }
      );

      // const x = await Blog.findByIdAndUpdate();

      // getting all blogs All blogs
      const allBlogs = await Blog.find()
         .sort({ createdAt: -1 })
         .populate("user");

      // Getting the users blogs
      const userBlogs = await Blog.find({ user });

      // if that blog dont exist
      if (!updateBlog) {
         // server response at success
         return res.status(404).json({
            success: false,
            error: "Blog dont exist",
         });
      }

      // server response at success
      res.status(201).json({
         success: true,
         data: {
            allBlogs,
            userBlogs,
         },
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

//    @DESC    get all the blogs to show in user profile
//    @METHOD  GET
//    @ROUTE   /blogs/:id
export const profileBlogs_get = async (req, res) => {
   try {
      // Getting the user id from params
      const user = req.params.id;
      // Gettting all the blogs that user post from database
      const userBlogs = await Blog.find({ user });

      // If user havent post anything yet
      if (!userBlogs.length) {
         res.status(200).json({
            success: true,
            message: "NO_BLOGS",
         });
      } else {
         // If user have saved post
         res.status(200).json({
            success: true,
            data: userBlogs,
         });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         error: "Server error",
      });
   }
};

//    @DESC    Findin the exact blog by clicking edit in front end
//    @METHID  GET
//    @ROUTE   /blogs/u/:id
export const userProfileClickedBlog_get = async (req, res) => {
   try {
      const _id = req.params.id;
      const blog = await Blog.find({ _id });
      if (blog) {
         res.status(200).json({
            success: true,
            data: blog,
         });
      } else {
         res.status(200).json({
            success: false,
            data: "No blog found",
         });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};
