import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema ({
username: {
  type: String,
  trim: true,
},
email: {
  type: String,
  trim: true,
  required: true,
  unique: true,
},
password: {
  type: String,
  required: true,
  minLength: 8,
},
avatar: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
},
{timestamps: true,
versionKey: false,}
);
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.pre('save', async function () {
  if (this.isNew || this.isModified('email')) {
    this.username = this.email;
  }

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const User = model('User', userSchema);
