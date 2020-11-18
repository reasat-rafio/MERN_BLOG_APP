import mongoose from "mongoose";

// Creating the user schema
const BlogSchema = mongoose.Schema(
   {
      title: {
         type: String,
         requried: [true, "Title is required"],
         trim: true,
      },
      body: {
         type: String,
         required: [true, "Body is required"],
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   { timestamps: true }
);

// making the mogoose model
const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
