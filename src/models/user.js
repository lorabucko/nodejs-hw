import { Schema, model } from "mongoose";
const userSchema = new Schema ({
username: {
  type: String,
  trim: true,

},
email: {
  type: String,
  trim: true,
  required: true,
},
password: {
  type: String,
  required: true,
  minLength: 8,
},
timestamps: true
},
);
