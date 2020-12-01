import mongoose from "mongoose";
import bycrpt from "bcrypt";

const userSchema = mongoose.Schema(
   {
      username: {
         type: String,
         maxlength: [30, "Max username length is 30"],
         required: [true, "name is required"],
      },
      firstName: {
         type: String,
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
      likedPost: {
         type: [String],
      },
      image: {
         type: String,
      },
   },
   { timestamps: true }
);

// Hasing the password before saving to database
userSchema.pre("save", async function (next) {
   const salt = await bycrpt.genSalt();
   this.password = await bycrpt.hash(this.password, salt);
   next();
});

// Chacking the login process
userSchema.statics.login = async function (email, password) {
   const user = await this.findOne({ email: email });
   if (user) {
      const checkPassword = await bycrpt.compare(password, user.password);
      if (checkPassword) {
         return {
            user,
         };
      } else {
         return {
            error: "password is incorrect",
         };
      }
   } else {
      return {
         error: "User don't exist",
      };
   }
};

const User = mongoose.model("User", userSchema);

export default User;
