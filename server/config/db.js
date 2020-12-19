import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useUnifiedTopology: true,
      });
      console.log(`Db connected`.bgGreen);
   } catch (error) {
      console.log(`db conn error is ${error}`.bgRed);
      process.exit(1);
   }
};
