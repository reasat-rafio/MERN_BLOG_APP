import mongoose from "mongoose";

const userSchema = mongoose.Schema(
   {
      username: {
         type: String,
         trim: true,
         maxlength: [30, "Max username length is 30"],
         required: [true, "name is required"],
      },
      email: {
         type: String,
         required: [true, "email is required"],
         unique: 1,
      },
      password: {
         type: String,
         minlength: [3, "Password is too short"],
      },
      token: {
         type: String,
      },
   },
   { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
